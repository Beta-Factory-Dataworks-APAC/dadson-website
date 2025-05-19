/**
 * CMS Environment Check Script
 * This script checks if the PayloadCMS environment is properly configured:
 * - Checks if MongoDB is running
 * - Checks if required environment variables are set
 * - Verifies the port availability
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Get current file directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}Running PayloadCMS Environment Check...${colors.reset}\n`);

// Check if MongoDB is running
function checkMongoDB() {
  return new Promise((resolve) => {
    console.log(`${colors.yellow}Checking MongoDB connection...${colors.reset}`);
    
    exec('mongo --eval "db.version()" --quiet', (error) => {
      if (error) {
        console.log(`${colors.red}MongoDB is not running. Please start MongoDB.${colors.reset}`);
        console.log(`${colors.yellow}Run: brew services start mongodb/brew/mongodb-community${colors.reset}`);
        resolve(false);
      } else {
        console.log(`${colors.green}MongoDB is running.${colors.reset}`);
        resolve(true);
      }
    });
  });
}

// Check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    
    server.listen(port);
  });
}

// Check env file exists
function checkEnvFile() {
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log(`${colors.red}.env file not found in PayloadCMS directory.${colors.reset}`);
    
    // Create a basic .env file
    const envContent = 
`MONGODB_URI=mongodb://localhost/dadson-blog
PAYLOAD_SECRET=yoursecretrandomkey
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3004`;
    
    fs.writeFileSync(envPath, envContent);
    console.log(`${colors.green}Created a basic .env file. Please check and update if needed.${colors.reset}`);
    return false;
  } else {
    console.log(`${colors.green}.env file exists.${colors.reset}`);
    return true;
  }
}

// Check dependencies installation
function checkDependencies() {
  const packageLockPath = path.join(__dirname, 'package-lock.json');
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath) || !fs.existsSync(packageLockPath)) {
    console.log(`${colors.red}Dependencies not installed. Installing now...${colors.reset}`);
    
    return new Promise((resolve) => {
      exec('npm install', { cwd: __dirname }, (error) => {
        if (error) {
          console.log(`${colors.red}Error installing dependencies: ${error.message}${colors.reset}`);
          resolve(false);
        } else {
          console.log(`${colors.green}Dependencies successfully installed.${colors.reset}`);
          resolve(true);
        }
      });
    });
  } else {
    console.log(`${colors.green}Dependencies already installed.${colors.reset}`);
    return Promise.resolve(true);
  }
}

// Run all checks
async function runChecks() {
  let allPassed = true;
  
  // Check MongoDB
  const mongoRunning = await checkMongoDB();
  if (!mongoRunning) allPassed = false;
  
  // Check .env file
  const envExists = checkEnvFile();
  if (!envExists) allPassed = false;
  
  // Check port 3004 (default for CMS)
  const port = 3004;
  console.log(`${colors.yellow}Checking if port ${port} is available...${colors.reset}`);
  const portInUse = await isPortInUse(port);
  
  if (portInUse) {
    console.log(`${colors.red}Port ${port} is already in use. CMS may not start correctly.${colors.reset}`);
    allPassed = false;
  } else {
    console.log(`${colors.green}Port ${port} is available.${colors.reset}`);
  }
  
  // Check dependencies
  const depsInstalled = await checkDependencies();
  if (!depsInstalled) allPassed = false;
  
  console.log('\n');
  if (allPassed) {
    console.log(`${colors.green}All checks passed! PayloadCMS is ready to run.${colors.reset}`);
    console.log(`${colors.blue}Run 'npm run dev:cms' to start PayloadCMS.${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Some checks failed. Please fix the issues above before running PayloadCMS.${colors.reset}`);
  }
}

runChecks();