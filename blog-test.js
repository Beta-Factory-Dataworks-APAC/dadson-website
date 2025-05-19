/**
 * Blog Functionality Test Script
 * 
 * This script tests the blog functionality by checking the API endpoints:
 * 1. Test the mock API endpoints (/api/blog, /api/blog/categories)
 * 2. Test the PayloadCMS API if available
 * 
 * Run with: node blog-test.js
 */

const fetch = require('node-fetch');
const { execSync } = require('child_process');

// ANSI Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

// Configuration
const NEXT_PORT = process.env.NEXT_PORT || 3005;
const PAYLOAD_PORT = process.env.PAYLOAD_PORT || 3004;
const NEXT_URL = `http://localhost:${NEXT_PORT}`;
const PAYLOAD_URL = `http://localhost:${PAYLOAD_PORT}`;

// Start test
console.log(`\n${colors.magenta}=== Dadson Website Blog Functionality Test ====${colors.reset}\n`);

/**
 * Check if a server is running on given port
 * @param {string} url - The URL to check
 * @param {string} name - The name of the service
 * @returns {Promise<boolean>} - True if server is running
 */
async function isServerRunning(url, name) {
  try {
    console.log(`${colors.blue}Checking if ${name} is running at ${url}...${colors.reset}`);
    const response = await fetch(url, { timeout: 3000 });
    console.log(`${colors.green}✓ ${name} is running (Status: ${response.status})${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ ${name} is not running or not accessible${colors.reset}`);
    console.log(`${colors.yellow}Error: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Test the Next.js mock API endpoints
 * @returns {Promise<boolean>} - Test results
 */
async function testMockApi() {
  console.log(`\n${colors.magenta}Testing Mock Blog API...${colors.reset}`);
  let success = true;
  
  try {
    // Test blog articles endpoint
    console.log(`\n${colors.blue}Testing /api/blog endpoint...${colors.reset}`);
    const articlesResponse = await fetch(`${NEXT_URL}/api/blog`);
    const articlesData = await articlesResponse.json();
    
    if (articlesResponse.ok && articlesData.docs && Array.isArray(articlesData.docs)) {
      console.log(`${colors.green}✓ Mock API articles endpoint is working${colors.reset}`);
      console.log(`${colors.green}✓ Found ${articlesData.docs.length} mock articles${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Mock API articles endpoint returned invalid data${colors.reset}`);
      success = false;
    }
    
    // Test blog categories endpoint
    console.log(`\n${colors.blue}Testing /api/blog/categories endpoint...${colors.reset}`);
    const categoriesResponse = await fetch(`${NEXT_URL}/api/blog/categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesResponse.ok && categoriesData.docs && Array.isArray(categoriesData.docs)) {
      console.log(`${colors.green}✓ Mock API categories endpoint is working${colors.reset}`);
      console.log(`${colors.green}✓ Found ${categoriesData.docs.length} mock categories${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Mock API categories endpoint returned invalid data${colors.reset}`);
      success = false;
    }
    
    // Test single article by slug
    if (articlesData.docs && articlesData.docs.length > 0) {
      const testSlug = articlesData.docs[0].slug;
      console.log(`\n${colors.blue}Testing single article endpoint with slug: ${testSlug}...${colors.reset}`);
      const articleResponse = await fetch(`${NEXT_URL}/api/blog?slug=${testSlug}`);
      const articleData = await articleResponse.json();
      
      if (articleResponse.ok && articleData.docs && articleData.docs.length === 1) {
        console.log(`${colors.green}✓ Mock API single article endpoint is working${colors.reset}`);
      } else {
        console.log(`${colors.red}✗ Mock API single article endpoint returned invalid data${colors.reset}`);
        success = false;
      }
    }
    
    return success;
  } catch (error) {
    console.log(`${colors.red}✗ Error testing mock API: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Test the PayloadCMS API endpoints
 * @returns {Promise<boolean>} - Test results
 */
async function testPayloadApi() {
  console.log(`\n${colors.magenta}Testing PayloadCMS API...${colors.reset}`);
  let success = true;
  
  try {
    // Test articles endpoint
    console.log(`\n${colors.blue}Testing PayloadCMS articles endpoint...${colors.reset}`);
    const articlesResponse = await fetch(`${PAYLOAD_URL}/api/articles`);
    
    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      console.log(`${colors.green}✓ PayloadCMS articles endpoint is working${colors.reset}`);
      console.log(`${colors.green}✓ Found ${articlesData.docs?.length || 0} articles${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ PayloadCMS articles endpoint returned status ${articlesResponse.status}${colors.reset}`);
      success = false;
    }
    
    // Test categories endpoint
    console.log(`\n${colors.blue}Testing PayloadCMS categories endpoint...${colors.reset}`);
    const categoriesResponse = await fetch(`${PAYLOAD_URL}/api/categories`);
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      console.log(`${colors.green}✓ PayloadCMS categories endpoint is working${colors.reset}`);
      console.log(`${colors.green}✓ Found ${categoriesData.docs?.length || 0} categories${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ PayloadCMS categories endpoint returned status ${categoriesResponse.status}${colors.reset}`);
      success = false;
    }
    
    return success;
  } catch (error) {
    console.log(`${colors.red}✗ Error testing PayloadCMS API: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Test the blog frontend pages
 * @returns {Promise<boolean>} - Test results
 */
async function testBlogFrontend() {
  console.log(`\n${colors.magenta}Testing Blog Frontend...${colors.reset}`);
  let success = true;
  
  try {
    // Test blog index page
    console.log(`\n${colors.blue}Testing blog index page...${colors.reset}`);
    const blogResponse = await fetch(`${NEXT_URL}/blog`);
    
    if (blogResponse.ok) {
      console.log(`${colors.green}✓ Blog index page is working (Status: ${blogResponse.status})${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Blog index page returned status ${blogResponse.status}${colors.reset}`);
      success = false;
    }
    
    return success;
  } catch (error) {
    console.log(`${colors.red}✗ Error testing blog frontend: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Run all tests and report results
 */
async function runTests() {
  // Check if servers are running
  const nextRunning = await isServerRunning(NEXT_URL, 'Next.js');
  const payloadRunning = await isServerRunning(PAYLOAD_URL, 'PayloadCMS');
  
  // If Next.js is not running, try to start it
  if (!nextRunning) {
    console.log(`\n${colors.yellow}Next.js is not running. Attempting to start...${colors.reset}`);
    try {
      // This will start Next.js but won't wait for it
      const command = `NEXT_PUBLIC_PAYLOAD_URL=${PAYLOAD_URL} npm run dev -- -p ${NEXT_PORT}`;
      console.log(`${colors.blue}Running: ${command}${colors.reset}`);
      
      // Run in a new terminal window
      if (process.platform === 'darwin') {
        execSync(`osascript -e 'tell app "Terminal" to do script "cd ${process.cwd()} && ${command}"'`);
        console.log(`${colors.yellow}Next.js is starting in a new terminal window.${colors.reset}`);
        console.log(`${colors.yellow}Please wait a moment for it to start, then run this test again.${colors.reset}`);
        return;
      } else {
        // On other platforms, just tell user to start manually
        console.log(`${colors.yellow}Please start Next.js manually with:${colors.reset}`);
        console.log(`${colors.blue}${command}${colors.reset}`);
        return;
      }
    } catch (error) {
      console.log(`${colors.red}Failed to start Next.js: ${error.message}${colors.reset}`);
      return;
    }
  }
  
  // Run tests
  const mockApiResults = await testMockApi();
  let payloadApiResults = false;
  
  if (payloadRunning) {
    payloadApiResults = await testPayloadApi();
  } else {
    console.log(`\n${colors.yellow}PayloadCMS is not running. Skipping PayloadCMS API tests.${colors.reset}`);
    console.log(`${colors.yellow}To test PayloadCMS, start it with: npm run dev:cms${colors.reset}`);
  }
  
  const frontendResults = await testBlogFrontend();
  
  // Print final results
  console.log(`\n${colors.magenta}=== Test Results ===${colors.reset}`);
  console.log(`${colors.blue}Mock API: ${mockApiResults ? colors.green + '✓ PASS' : colors.red + '✗ FAIL'}${colors.reset}`);
  
  if (payloadRunning) {
    console.log(`${colors.blue}PayloadCMS API: ${payloadApiResults ? colors.green + '✓ PASS' : colors.red + '✗ FAIL'}${colors.reset}`);
  } else {
    console.log(`${colors.blue}PayloadCMS API: ${colors.yellow}SKIPPED${colors.reset}`);
  }
  
  console.log(`${colors.blue}Blog Frontend: ${frontendResults ? colors.green + '✓ PASS' : colors.red + '✗ FAIL'}${colors.reset}`);
  
  // Overall status
  const overallStatus = mockApiResults && frontendResults && (payloadRunning ? payloadApiResults : true);
  console.log(`\n${colors.magenta}Overall Status: ${overallStatus ? colors.green + 'PASS' : colors.red + 'FAIL'}${colors.reset}`);
  
  if (!overallStatus) {
    console.log(`\n${colors.yellow}Some tests failed. Check the output above for details.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}All tests passed!${colors.reset}`);
    process.exit(0);
  }
}

// Run the tests
runTests().catch(error => {
  console.log(`\n${colors.red}Unhandled error in test script: ${error.message}${colors.reset}`);
  process.exit(1);
});