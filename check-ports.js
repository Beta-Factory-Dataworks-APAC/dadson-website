#!/usr/bin/env node

/**
 * Check Ports Script
 * 
 * This script checks if ports 3003 and 3004 are available for Next.js and PayloadCMS
 * It will prompt the user to close any applications using these ports.
 */

const net = require('net');
const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const NEXTJS_PORT = process.env.NEXTJS_PORT || 3000;
const PAYLOAD_PORT = process.env.PAYLOAD_PORT || 3001;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

console.log(`\n${colors.blue}Checking ports for Dadson website...${colors.reset}\n`);

/**
 * Check if a port is in use
 * @param {number} port - The port to check
 * @returns {Promise<boolean>} - True if port is in use, false otherwise
 */
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
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

/**
 * Get the process ID using a port
 * @param {number} port - The port to check
 * @returns {string|null} - Process ID or null if not found
 */
function getProcessUsingPort(port) {
  try {
    const command = process.platform === 'win32' 
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port} -P -n -t`;
    
    const result = execSync(command).toString().trim();
    return result || null;
  } catch (error) {
    return null;
  }
}

/**
 * Kill process using a port
 * @param {number} port - The port to check
 * @returns {boolean} - True if process was killed, false otherwise
 */
function killProcessUsingPort(port) {
  const pid = getProcessUsingPort(port);
  
  if (!pid) return false;
  
  try {
    const command = process.platform === 'win32' 
      ? `taskkill /PID ${pid} /F`
      : `kill -9 ${pid}`;
    
    execSync(command);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check a specific port and provide feedback
 * @param {number} port - The port to check
 * @param {string} service - The service name using this port
 */
async function checkPort(port, service) {
  console.log(`${colors.yellow}Checking port ${port} for ${service}...${colors.reset}`);
  
  const inUse = await isPortInUse(port);
  
  if (inUse) {
    console.log(`${colors.red}Port ${port} is already in use!${colors.reset}`);
    
    // Try to identify the process
    const pid = getProcessUsingPort(port);
    if (pid) {
      console.log(`${colors.yellow}Process ID using port ${port}: ${pid}${colors.reset}`);
      
      // Ask to kill the process
      console.log(`${colors.yellow}To free up port ${port}, run:${colors.reset}`);
      console.log(`${colors.blue}${process.platform === 'win32' ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`}${colors.reset}`);
    }
  } else {
    console.log(`${colors.green}Port ${port} is available for ${service}${colors.reset}`);
  }
}

// Check each port
async function checkPorts() {
  await checkPort(3003, 'Next.js');
  await checkPort(3004, 'PayloadCMS');
  
  console.log(`\n${colors.blue}Port check complete!${colors.reset}`);
}

checkPorts(); 