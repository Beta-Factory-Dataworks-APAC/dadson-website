#!/usr/bin/env node

/**
 * Simple script to start PayloadCMS directly with minimal configuration
 * ESM version to work with ES modules
 */
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

console.log('Starting PayloadCMS...');

// Get current file directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
let port = 3004; // Default port

const portArgIndex = args.findIndex(arg => arg === '--port');
if (portArgIndex >= 0 && args[portArgIndex + 1]) {
  port = parseInt(args[portArgIndex + 1], 10);
}

console.log(`PayloadCMS will start on port ${port}`);

// Ensure MongoDB is running
const mongoProcess = spawn('brew', ['services', 'start', 'mongodb/brew/mongodb-community'], { 
  stdio: 'inherit' 
});

mongoProcess.on('close', (code) => {
  if (code !== 0) {
    console.warn('Warning: MongoDB service command exited with code', code);
    console.log('Continuing anyway - MongoDB might already be running...');
  }
  
  console.log('MongoDB status checked. Starting PayloadCMS...');
  
  // Create media directory if it doesn't exist
  const mediaDir = path.join(__dirname, 'media');
  if (!fs.existsSync(mediaDir)) {
    console.log('Creating media directory...');
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  // Check if .env file exists
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.log('Creating default .env file...');
    // Create basic .env file
    const envContent = 
`MONGODB_URI=mongodb://localhost:27017/dadson-blog
PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:${port}
PAYLOAD_PORT=${port}`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('Created default .env file');
  }
  
  // Start PayloadCMS with nodemon
  const payload = spawn('npx', [
    'nodemon', 
    '--exec', 
    'node --loader ts-node/esm', 
    'src/server.ts'
  ], {
    env: {
      ...process.env,
      PAYLOAD_CONFIG_PATH: 'src/payload.config.ts',
      NODE_ENV: 'development',
      PAYLOAD_PORT: port.toString()
    },
    stdio: 'inherit'
  });
  
  payload.on('error', (error) => {
    console.error('Failed to start PayloadCMS:', error);
    process.exit(1);
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Shutting down PayloadCMS...');
    payload.kill('SIGINT');
    process.exit(0);
  });
}); 