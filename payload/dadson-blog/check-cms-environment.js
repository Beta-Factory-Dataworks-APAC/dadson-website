#!/usr/bin/env node

/**
 * Script to check the environment for PayloadCMS
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n📋 PayloadCMS Environment Check\n');

// Check if MongoDB is running
function checkMongoDB() {
  console.log('⌛ Checking MongoDB status...');
  
  try {
    const result = execSync('brew services list | grep mongodb').toString();
    if (result.includes('started')) {
      console.log('✅ MongoDB is running');
      return true;
    } else {
      console.log('❌ MongoDB is NOT running');
      return false;
    }
  } catch (error) {
    console.log('❌ MongoDB status check failed:', error.message);
    return false;
  }
}

// Check if ports are available
function checkPort(port) {
  try {
    execSync(`lsof -i :${port} -P -n -t`);
    console.log(`❌ Port ${port} is already in use`);
    return false;
  } catch (error) {
    console.log(`✅ Port ${port} is available`);
    return true;
  }
}

// Check environment files
function checkEnvFiles() {
  console.log('\n⌛ Checking environment files...');
  
  const rootEnvPath = path.join(__dirname, '../../.env.local');
  const cmsEnvPath = path.join(__dirname, '.env');
  
  if (fs.existsSync(rootEnvPath)) {
    console.log(`✅ Root .env.local file exists: ${rootEnvPath}`);
    const rootEnv = fs.readFileSync(rootEnvPath, 'utf8');
    console.log('   Contents:');
    rootEnv.split('\n').forEach(line => {
      if (line.trim() !== '') {
        console.log(`   ${line}`);
      }
    });
  } else {
    console.log(`❌ Root .env.local file missing: ${rootEnvPath}`);
  }
  
  if (fs.existsSync(cmsEnvPath)) {
    console.log(`✅ PayloadCMS .env file exists: ${cmsEnvPath}`);
    const cmsEnv = fs.readFileSync(cmsEnvPath, 'utf8');
    console.log('   Contents:');
    cmsEnv.split('\n').forEach(line => {
      if (line.trim() !== '') {
        console.log(`   ${line}`);
      }
    });
  } else {
    console.log(`❌ PayloadCMS .env file missing: ${cmsEnvPath}`);
  }
}

// Check required directories
function checkDirectories() {
  console.log('\n⌛ Checking required directories...');
  
  const mediaDir = path.join(__dirname, 'media');
  if (fs.existsSync(mediaDir)) {
    console.log(`✅ Media directory exists: ${mediaDir}`);
  } else {
    console.log(`❌ Media directory missing: ${mediaDir}`);
    console.log('   Creating it now...');
    fs.mkdirSync(mediaDir, { recursive: true });
    console.log(`✅ Media directory created: ${mediaDir}`);
  }
}

// Run checks
function runChecks() {
  const mongoRunning = checkMongoDB();
  const port3001Available = checkPort(3001);
  
  checkEnvFiles();
  checkDirectories();
  
  console.log('\n📋 Summary:');
  if (mongoRunning) {
    console.log('✅ MongoDB is running');
  } else {
    console.log('❌ MongoDB is NOT running. Start it with: brew services start mongodb/brew/mongodb-community');
  }
  
  if (port3001Available) {
    console.log('✅ Port 3001 is available for PayloadCMS');
  } else {
    console.log('❌ Port 3001 is already in use. You may need to kill the process using it.');
  }
  
  console.log('\n🔍 Next Steps:');
  if (!mongoRunning) {
    console.log('1. Start MongoDB: brew services start mongodb/brew/mongodb-community');
  }
  
  if (!port3001Available) {
    console.log('1. Free up port 3001 by stopping the service using it');
  }
  
  if (mongoRunning && port3001Available) {
    console.log('All checks passed! You can now start PayloadCMS:');
    console.log('- cd payload/dadson-blog');
    console.log('- npm run dev:simple');
  }
}

runChecks();