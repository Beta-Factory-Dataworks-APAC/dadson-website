#!/usr/bin/env node

/**
 * Simple script to start PayloadCMS directly with minimal configuration
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting PayloadCMS...');

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
  
  // Start PayloadCMS with nodemon
  const payload = spawn('npx', [
    'nodemon', 
    '--exec', 
    'ts-node', 
    'src/server.ts'
  ], {
    env: {
      ...process.env,
      PAYLOAD_CONFIG_PATH: 'src/payload.config.ts',
      NODE_ENV: 'development'
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