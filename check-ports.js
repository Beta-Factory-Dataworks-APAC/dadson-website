#!/usr/bin/env node

/**
 * Script to check for port conflicts before starting the development environment
 * This helps prevent common port conflicts between Next.js (3000) and PayloadCMS (3001)
 */
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

console.log('\n📋 Dadson Website Development Environment\n');

// Check if ports are in use
function checkPort(port) {
  try {
    const result = execSync(`lsof -i :${port} -P -n -t`).toString().trim();
    if (result) {
      return { inUse: true, pid: result };
    }
    return { inUse: false };
  } catch (error) {
    return { inUse: false };
  }
}

// Function to suggest alternative ports
function suggestPorts() {
  const suggestions = [];
  for (let port = 3002; port < 3010; port++) {
    const portCheck = checkPort(port);
    if (!portCheck.inUse) {
      suggestions.push(port);
      if (suggestions.length >= 2) break;
    }
  }
  return suggestions;
}

// Main check function
async function checkPorts() {
  const nextJsPort = checkPort(NEXTJS_PORT);
  const payloadPort = checkPort(PAYLOAD_PORT);
  
  if (!nextJsPort.inUse && !payloadPort.inUse) {
    console.log('✅ Ports check passed! Both required ports are available:');
    console.log(`  - Next.js:    Port ${NEXTJS_PORT}`);
    console.log(`  - PayloadCMS: Port ${PAYLOAD_PORT}`);
    process.exit(0);
  }
  
  console.log('⚠️ Port conflict detected:');
  
  if (nextJsPort.inUse) {
    console.log(`  - Port ${NEXTJS_PORT} (Next.js) is already in use by process ${nextJsPort.pid}`);
  }
  
  if (payloadPort.inUse) {
    console.log(`  - Port ${PAYLOAD_PORT} (PayloadCMS) is already in use by process ${payloadPort.pid}`);
  }
  
  const availablePorts = suggestPorts();
  console.log('\nSuggested available ports:');
  availablePorts.forEach(port => console.log(`  - ${port}`));
  
  console.log('\nOptions:');
  console.log('  1. Kill the processes using these ports');
  console.log('  2. Use alternative ports (requires updating .env files)');
  
  rl.question('\nWhat would you like to do? (Enter 1 or 2): ', (answer) => {
    if (answer === '1') {
      if (nextJsPort.inUse) {
        try {
          execSync(`kill -9 ${nextJsPort.pid}`);
          console.log(`✅ Process using port ${NEXTJS_PORT} has been terminated.`);
        } catch (error) {
          console.log(`❌ Failed to terminate process. You may need admin privileges.`);
        }
      }
      
      if (payloadPort.inUse) {
        try {
          execSync(`kill -9 ${payloadPort.pid}`);
          console.log(`✅ Process using port ${PAYLOAD_PORT} has been terminated.`);
        } catch (error) {
          console.log(`❌ Failed to terminate process. You may need admin privileges.`);
        }
      }
      
      console.log('\n✅ Port check complete. Restart your development environment.');
    } else if (answer === '2') {
      const [nextJsAlt, payloadAlt] = availablePorts;
      console.log('\nTo use alternative ports:');
      console.log('\n1. For Next.js, start with:');
      console.log(`   npm run dev -- -p ${nextJsAlt}`);
      
      console.log('\n2. For PayloadCMS, update the .env file in payload/dadson-blog:');
      console.log(`   PAYLOAD_PORT=${payloadAlt}`);
      console.log(`   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:${payloadAlt}`);
      console.log(`   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:${payloadAlt}`);
      
      console.log('\n3. Update .env.local in the project root:');
      console.log(`   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:${payloadAlt}`);
      
      console.log('\n✅ Once you\'ve made these changes, you can start your development environment.');
    } else {
      console.log('Invalid option. Please try again.');
    }
    
    rl.close();
  });
}

// Run the check
checkPorts(); 