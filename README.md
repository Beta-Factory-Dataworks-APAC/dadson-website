# Dadson Logistics Website

The official website for Dadson Logistics, featuring company information, services, and a blog functionality powered by PayloadCMS.

## 📋 Project Structure

- **Frontend**: Next.js 15 application with React 19
- **Blog CMS**: PayloadCMS running as a separate service
- **Database**: MongoDB for storing blog content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- MongoDB (Community Edition)
- Git

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd dadson-website
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env.local` file in the project root with:

```
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3004
```

4. **Set up MongoDB**

Ensure MongoDB is installed and running:

```bash
# macOS (with Homebrew)
brew services start mongodb/brew/mongodb-community

# Check status
brew services list | grep mongodb
```

5. **Set up PayloadCMS**

The PayloadCMS installation is in the `/payload/dadson-blog` directory:

```bash
cd payload/dadson-blog
npm install
```

Create a `.env` file in the `/payload/dadson-blog` directory:

```
MONGODB_URI=mongodb://localhost/dadson-blog
PAYLOAD_SECRET=yoursecretrandomkey
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3004
```

## 🏃‍♂️ Development

### Quick Start

Run the full stack (Next.js + PayloadCMS) with:

```bash
npm run dev:blog
```

This will:
- Start MongoDB if not running (macOS only)
- Launch PayloadCMS on port 3004
- Start the Next.js app on port 3003

### Individual Components

**Start Next.js Only**
```bash
npm run dev
# or with specific port
npm run dev -- -p 3003
```

**Start PayloadCMS Only**
```bash
npm run dev:cms
```

**Check CMS Environment**
```bash
npm run dev:cms-check
```

### Accessing the Applications

- **Website**: http://localhost:3003
- **Blog**: http://localhost:3003/blog
- **PayloadCMS Admin**: http://localhost:3004/admin

## 🧪 Testing

Basic blog functionality tests:

```bash
npm run test:blog
```

## 📦 Deployment

### Building for Production

```bash
npm run build
```

### Production Deployment

The project should be deployed with both:

1. The Next.js frontend
2. The PayloadCMS backend

For proper functionality, ensure:

- MongoDB is accessible to PayloadCMS
- PayloadCMS is running and accessible to the Next.js frontend
- Environment variables are correctly set

## 🗄️ Git Workflow

1. Create a feature branch from `main`
2. Implement changes and commit regularly
3. Push to remote and create a pull request
4. After review, merge to `main`

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [Project Wiki](https://link-to-project-wiki)
- [PayloadCMS Fix Documentation](./docs/payload-cms-fix.md)

## 🧩 Blog Features

The blog functionality includes:

- Article listing with pagination
- Category filtering
- Individual article pages
- Related articles
- Admin interface for content management

## 🤝 Contributing

1. Follow the Git workflow described above
2. Ensure code passes linting (`npm run lint`)
3. Document any API changes or new components
4. Test thoroughly before submitting pull requests
