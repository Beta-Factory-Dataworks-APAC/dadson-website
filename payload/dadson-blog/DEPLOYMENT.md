# Blog Module Deployment Guide

This guide outlines the steps for deploying the Dadson Logistics blog module to production.

## Prerequisites

- Production MongoDB instance
- Production server with Node.js 16+
- SSL certificates
- Domain names configured
- Git repository access

## Environment Setup

### 1. Production Environment Variables

Create `.env` in the PayloadCMS directory:
```bash
# MongoDB
MONGODB_URI=mongodb://username:password@your-mongodb-host:27017/dadson-blog
MONGODB_URI_OPTIONS=?authSource=admin&ssl=true

# PayloadCMS
PAYLOAD_SECRET=your-secure-random-string
PAYLOAD_PUBLIC_SERVER_URL=https://cms.dadson.com
PAYLOAD_PUBLIC_SERVER_URL_OPTIONS=?ssl=true

# Security
CORS_ORIGIN=https://dadson.com
```

Create `.env.local` in the Next.js root directory:
```bash
NEXT_PUBLIC_PAYLOAD_URL=https://cms.dadson.com
```

### 2. MongoDB Production Setup

1. Create a MongoDB Atlas account or set up a self-hosted MongoDB instance
2. Create a production database
3. Set up authentication
4. Configure network access
5. Enable SSL/TLS

### 3. SSL/TLS Setup

1. Obtain SSL certificates for both domains:
   - cms.dadson.com
   - dadson.com

2. Configure SSL in your web server (Nginx/Apache)

## Deployment Process

### 1. Server Setup

1. Install Node.js 16+:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install MongoDB:
```bash
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Application Deployment

1. Clone the repository:
```bash
git clone https://github.com/dadson/logistics-website.git
cd logistics-website
```

2. Install dependencies:
```bash
# Install Next.js dependencies
npm install

# Install PayloadCMS dependencies
cd payload/dadson-blog
npm install
```

3. Build the applications:
```bash
# Build PayloadCMS
cd payload/dadson-blog
npm run build

# Build Next.js
cd /path/to/project/root
npm run build
```

4. Set up process management (PM2):
```bash
# Install PM2
npm install -g pm2

# Start PayloadCMS
cd payload/dadson-blog
pm2 start npm --name "dadson-cms" -- start

# Start Next.js
cd /path/to/project/root
pm2 start npm --name "dadson-website" -- start

# Save PM2 configuration
pm2 save
```

### 3. Nginx Configuration

1. Install Nginx:
```bash
sudo apt-get install nginx
```

2. Configure PayloadCMS (cms.dadson.com):
```nginx
server {
    listen 443 ssl;
    server_name cms.dadson.com;

    ssl_certificate /path/to/cms.dadson.com.crt;
    ssl_certificate_key /path/to/cms.dadson.com.key;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Configure Next.js (dadson.com):
```nginx
server {
    listen 443 ssl;
    server_name dadson.com;

    ssl_certificate /path/to/dadson.com.crt;
    ssl_certificate_key /path/to/dadson.com.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. Enable HTTPS redirect:
```nginx
server {
    listen 80;
    server_name cms.dadson.com dadson.com;
    return 301 https://$host$request_uri;
}
```

5. Restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Post-Deployment

### 1. Initial Setup

1. Create admin user:
```bash
cd payload/dadson-blog
node create-admin.js
```

2. Access PayloadCMS admin:
   - Visit https://cms.dadson.com/admin
   - Log in with admin credentials
   - Create initial categories
   - Upload media files
   - Create first blog post

### 2. Monitoring Setup

1. Set up PM2 monitoring:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

2. Configure server monitoring:
```bash
# Install monitoring tools
sudo apt-get install -y htop iotop

# Set up log rotation
sudo nano /etc/logrotate.d/dadson
```

### 3. Backup Strategy

1. Set up MongoDB backups:
```bash
# Create backup script
cat > /usr/local/bin/backup-mongodb.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
mkdir -p $BACKUP_DIR
mongodump --uri="mongodb://username:password@localhost:27017/dadson-blog" --out="$BACKUP_DIR/$TIMESTAMP"
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
EOF

# Make script executable
chmod +x /usr/local/bin/backup-mongodb.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-mongodb.sh") | crontab -
```

2. Set up media backups:
```bash
# Create backup script
cat > /usr/local/bin/backup-media.sh << 'EOF'
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/media"
mkdir -p $BACKUP_DIR
tar -czf "$BACKUP_DIR/media_$TIMESTAMP.tar.gz" /path/to/payload/dadson-blog/media
find $BACKUP_DIR -type f -mtime +7 -delete
EOF

# Make script executable
chmod +x /usr/local/bin/backup-media.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 3 * * * /usr/local/bin/backup-media.sh") | crontab -
```

## Maintenance

### 1. Regular Tasks

1. Monitor logs:
```bash
pm2 logs
tail -f /var/log/nginx/error.log
```

2. Check disk space:
```bash
df -h
du -sh /var/backups/*
```

3. Update dependencies:
```bash
# Update PayloadCMS
cd payload/dadson-blog
npm update
npm run build
pm2 restart dadson-cms

# Update Next.js
cd /path/to/project/root
npm update
npm run build
pm2 restart dadson-website
```

### 2. Troubleshooting

1. Check service status:
```bash
pm2 status
sudo systemctl status nginx
sudo systemctl status mongod
```

2. View logs:
```bash
pm2 logs dadson-cms
pm2 logs dadson-website
sudo tail -f /var/log/nginx/error.log
```

3. Restart services:
```bash
pm2 restart all
sudo systemctl restart nginx
sudo systemctl restart mongod
```

## Security Considerations

1. Keep Node.js and dependencies updated
2. Regularly rotate MongoDB passwords
3. Monitor server logs for suspicious activity
4. Keep SSL certificates up to date
5. Implement rate limiting in Nginx
6. Set up firewall rules
7. Regular security audits

## Rollback Procedure

1. Stop services:
```bash
pm2 stop all
```

2. Restore from backup:
```bash
# Restore MongoDB
mongorestore --uri="mongodb://username:password@localhost:27017/dadson-blog" /path/to/backup

# Restore media files
tar -xzf /path/to/backup/media_backup.tar.gz -C /path/to/payload/dadson-blog
```

3. Restart services:
```bash
pm2 start all
```

## Support

For deployment support, contact:
- DevOps Team: devops@dadson.com
- Development Team: dev@dadson.com
- Emergency Support: oncall@dadson.com 