# Dadson Blog Functionality Test Report

**Timestamp:** 2025-05-20T09:37:02.498Z

## Server Status

- **Servers started:** ✅ Yes
- **PayloadCMS running:** ❌ No
- **Next.js running:** ✅ Yes
- **Next.js accessible:** ✅ Yes
- **PayloadCMS accessible:** ❌ No

## CMS Admin

- **Login successful:** ❌ No

## Blog Functionality

- **Blog page accessible:** ✅ Yes
- **Article creation:** ❌ Failed
- **Article visible on blog:** ❌ No

## Error Details

- PayloadCMS server is not running

## Screenshots

### nextjs-home

![01-nextjs-home.png](/Users/kashishkumar/Documents/G_drive/BF/dev/projects/BF_company_projects/client-dadson/landingWebsite/dadson-website/test-screenshots/01-nextjs-home.png)

### blog-page

![02-blog-page.png](/Users/kashishkumar/Documents/G_drive/BF/dev/projects/BF_company_projects/client-dadson/landingWebsite/dadson-website/test-screenshots/02-blog-page.png)

## Conclusion

❌ **Issues detected with blog functionality. Please check the details above.**

## How to Start the Blog Servers

To start the blog servers, follow these steps:

1. Start MongoDB if it's not running:
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

2. Start PayloadCMS:
   ```bash
   cd payload/dadson-blog
   npm run dev:simple -- --port 3004
   ```

3. In a separate terminal, start the Next.js app:
   ```bash
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3004 npm run dev -- -p 3003
   ```

Alternatively, use the provided script to start both servers:
```bash
./start-blog-stack.sh
```
