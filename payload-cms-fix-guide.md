# PayloadCMS Fix Guide for Dadson Blog

This guide provides step-by-step instructions for fixing the PayloadCMS server issues in the Dadson Logistics blog system.

## Identified Issues

1. **Module System Conflict**: PayloadCMS is configured as an ESM module but startup scripts use CommonJS
2. **TypeScript with ESM Configuration**: Issues with TypeScript files in an ESM context
3. **Environment Setup**: Missing or incorrect environment variables

## Solution 1: Update the Startup Script to ESM

We've already created a new ESM-compatible script at `start-payload.mjs`. To use it:

1. Make it executable:
   ```bash
   chmod +x payload/dadson-blog/start-payload.mjs
   ```

2. Update the package.json script to use it:
   ```json
   "dev:simple": "node ./start-payload.mjs"
   ```

## Solution 2: Fix TypeScript Configuration for ESM

1. Update `payload/dadson-blog/tsconfig.json` with these settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "lib": ["dom", "dom.iterable", "ES2020"],
    "skipLibCheck": true,
    "sourceMap": true,
    "declaration": true,
    "jsx": "react"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

2. Create a `nodemon.json` file in the payload/dadson-blog directory:

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "node --loader ts-node/esm src/server.ts"
}
```

## Solution 3: Direct Server Execution

If the above solutions don't work, try running the server directly with ts-node:

1. Create a new script in `payload/dadson-blog/package.json`:

```json
"scripts": {
  "dev:direct": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts node --loader ts-node/esm src/server.ts"
}
```

2. Run with:
```bash
cd payload/dadson-blog
npm run dev:direct
```

## Solution 4: Build and Use Production Mode

As a last resort, build and run the production version:

1. Build the project:
```bash
cd payload/dadson-blog
npm run build
```

2. Create a `.env` file in the payload/dadson-blog directory if it doesn't exist:
```
MONGODB_URI=mongodb://localhost:27017/dadson-blog
PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3004
PAYLOAD_PORT=3004
```

3. Run the production server:
```bash
cd payload/dadson-blog
npm run serve
```

## Verifying the Fix

After implementing one of the solutions:

1. Check if PayloadCMS is running by accessing: http://localhost:3004/admin
2. Login with credentials:
   - Email: admin@dadson.com
   - Password: admin123

3. Start the Next.js frontend:
```bash
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3004 npm run dev -- -p 3003
```

4. Visit http://localhost:3003/blog to verify that real data is being displayed

## Update Documentation

After fixing the issues:

1. Update the main README.md with correct startup instructions
2. Update the start-blog-stack.sh script to use the working solution
3. Document the solution in a "Troubleshooting" section for future reference 