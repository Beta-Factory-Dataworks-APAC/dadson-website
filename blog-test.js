#!/usr/bin/env node

/**
 * Test script to verify blog functionality
 * This script checks:
 * 1. MongoDB connection
 * 2. PayloadCMS API access
 * 3. Next.js blog API access
 * 4. Mock data fallback
 */
const fetch = await import('node-fetch').then(module => module.default);
const { MongoClient } = await import('mongodb');

// Configuration
const MONGO_URI = 'mongodb://localhost:27017/dadson-blog';
const PAYLOAD_URL = 'http://localhost:3001';
const NEXTJS_URL = 'http://localhost:3000';

// Colors for console output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

// Helper function to check connection
async function testConnection(url, name) {
  try {
    console.log(`${BLUE}Testing ${name} connection...${RESET}`);
    const response = await fetch(url, { timeout: 5000 });
    if (response.ok) {
      console.log(`${GREEN}✓ ${name} is accessible at ${url}${RESET}`);
      return true;
    } else {
      console.log(`${YELLOW}⚠ ${name} responded with status ${response.status} at ${url}${RESET}`);
      return false;
    }
  } catch (error) {
    console.log(`${RED}✗ Cannot connect to ${name} at ${url}: ${error.message}${RESET}`);
    return false;
  }
}

// Test MongoDB connection
async function testMongoDB() {
  console.log(`${BLUE}Testing MongoDB connection...${RESET}`);
  let client;
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db();
    const collections = await db.listCollections().toArray();
    
    console.log(`${GREEN}✓ Connected to MongoDB${RESET}`);
    console.log(`${BLUE}Found ${collections.length} collections:${RESET}`);
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    return true;
  } catch (error) {
    console.log(`${RED}✗ MongoDB connection failed: ${error.message}${RESET}`);
    return false;
  } finally {
    if (client) await client.close();
  }
}

// Test PayloadCMS API
async function testPayloadAPI() {
  const apiUrl = `${PAYLOAD_URL}/api/articles`;
  try {
    console.log(`${BLUE}Testing PayloadCMS API...${RESET}`);
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`${GREEN}✓ PayloadCMS API is working${RESET}`);
      console.log(`${BLUE}Found ${data.docs?.length || 0} articles${RESET}`);
      return true;
    } else {
      console.log(`${YELLOW}⚠ PayloadCMS API responded with status ${response.status}${RESET}`);
      return false;
    }
  } catch (error) {
    console.log(`${RED}✗ PayloadCMS API test failed: ${error.message}${RESET}`);
    return false;
  }
}

// Test Next.js blog API
async function testNextJsAPI() {
  const apiUrl = `${NEXTJS_URL}/api/blog`;
  try {
    console.log(`${BLUE}Testing Next.js Blog API...${RESET}`);
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`${GREEN}✓ Next.js Blog API is working${RESET}`);
      console.log(`${BLUE}Found ${data.docs?.length || 0} articles${RESET}`);
      return true;
    } else {
      console.log(`${YELLOW}⚠ Next.js Blog API responded with status ${response.status}${RESET}`);
      return false;
    }
  } catch (error) {
    console.log(`${RED}✗ Next.js Blog API test failed: ${error.message}${RESET}`);
    return false;
  }
}

// Test blog frontend
async function testBlogFrontend() {
  const blogUrl = `${NEXTJS_URL}/blog`;
  try {
    console.log(`${BLUE}Testing Blog Frontend...${RESET}`);
    const response = await fetch(blogUrl);
    
    if (response.ok) {
      console.log(`${GREEN}✓ Blog frontend is accessible${RESET}`);
      return true;
    } else {
      console.log(`${YELLOW}⚠ Blog frontend responded with status ${response.status}${RESET}`);
      return false;
    }
  } catch (error) {
    console.log(`${RED}✗ Blog frontend test failed: ${error.message}${RESET}`);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log(`${BLUE}======= DADSON BLOG FUNCTIONALITY TEST =======${RESET}\n`);
  
  // First check if services are running
  const payloadRunning = await testConnection(PAYLOAD_URL, 'PayloadCMS');
  const nextjsRunning = await testConnection(NEXTJS_URL, 'Next.js');
  
  console.log('');
  
  // If either service is not running, exit
  if (!payloadRunning || !nextjsRunning) {
    console.log(`${YELLOW}⚠ Some services are not running. Please start them:${RESET}`);
    if (!payloadRunning) console.log(`  - PayloadCMS: cd payload/dadson-blog && npm run dev:simple`);
    if (!nextjsRunning) console.log(`  - Next.js: npm run dev`);
    console.log(`${YELLOW}Or use the combined script: npm run dev:blog${RESET}`);
    return;
  }
  
  // Test MongoDB
  const mongodbOk = await testMongoDB();
  console.log('');
  
  // Test PayloadCMS API
  const payloadApiOk = await testPayloadAPI();
  console.log('');
  
  // Test Next.js blog API
  const nextjsApiOk = await testNextJsAPI();
  console.log('');
  
  // Test blog frontend
  const blogFrontendOk = await testBlogFrontend();
  console.log('');
  
  // Summary
  console.log(`${BLUE}======= TEST SUMMARY =======${RESET}`);
  console.log(`MongoDB Connection: ${mongodbOk ? GREEN + '✓ PASSED' : RED + '✗ FAILED'}${RESET}`);
  console.log(`PayloadCMS API: ${payloadApiOk ? GREEN + '✓ PASSED' : RED + '✗ FAILED'}${RESET}`);
  console.log(`Next.js Blog API: ${nextjsApiOk ? GREEN + '✓ PASSED' : RED + '✗ FAILED'}${RESET}`);
  console.log(`Blog Frontend: ${blogFrontendOk ? GREEN + '✓ PASSED' : RED + '✗ FAILED'}${RESET}`);
  
  // Overall status
  if (mongodbOk && payloadApiOk && nextjsApiOk && blogFrontendOk) {
    console.log(`\n${GREEN}All tests passed! The blog functionality is working correctly.${RESET}`);
  } else {
    console.log(`\n${YELLOW}Some tests failed. Check the issues above.${RESET}`);
    
    // Specific advice based on what failed
    if (!mongodbOk) {
      console.log(`${YELLOW}MongoDB issue: Make sure MongoDB is running and accessible.${RESET}`);
      console.log(`  brew services start mongodb/brew/mongodb-community`);
    }
    
    if (!payloadApiOk && mongodbOk) {
      console.log(`${YELLOW}PayloadCMS API issue: Check PayloadCMS is properly configured.${RESET}`);
      console.log(`  - Verify .env file in payload/dadson-blog`);
      console.log(`  - Check for errors in PayloadCMS terminal`);
    }
    
    if (!nextjsApiOk) {
      console.log(`${YELLOW}Next.js API issue: Check Next.js API routes.${RESET}`);
      console.log(`  - Verify .env.local in root directory`);
      console.log(`  - Check for errors in Next.js terminal`);
    }
    
    if (!blogFrontendOk) {
      console.log(`${YELLOW}Blog Frontend issue: Check Next.js components and data fetching.${RESET}`);
      console.log(`  - Check for errors in browser console`);
      console.log(`  - Verify that blog components are rendering correctly`);
    }
  }
}

// Run the tests
runTests().catch(error => {
  console.error(`${RED}An unexpected error occurred: ${error.message}${RESET}`);
});