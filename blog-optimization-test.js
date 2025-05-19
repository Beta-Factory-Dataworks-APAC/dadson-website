/**
 * Blog Optimization Test Script
 * 
 * This script tests the optimized blog functionality:
 * 1. Tests the ES module conversion in check-cms-environment.js
 * 2. Verifies the blog link in the navigation
 * 3. Tests the enhanced API error handling
 * 4. Verifies the blog preview on the homepage
 * 
 * Run with: node blog-optimization-test.js
 */

const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const fetch = require('node-fetch');

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
const NEXT_PORT = process.env.NEXT_PORT || 3003;
const PAYLOAD_PORT = process.env.PAYLOAD_PORT || 3004;
const NEXT_URL = `http://localhost:${NEXT_PORT}`;
const PAYLOAD_URL = `http://localhost:${PAYLOAD_PORT}`;

console.log(`\n${colors.magenta}=== Dadson Blog Optimization Test ====${colors.reset}\n`);

/**
 * Test 1: Test the ES Module conversion in check-cms-environment.js
 */
async function testESModuleConversion() {
  console.log(`\n${colors.blue}Testing ES Module Conversion...${colors.reset}`);
  
  try {
    // Run the check-cms-environment.js script
    const result = execSync('node payload/dadson-blog/check-cms-environment.js', { encoding: 'utf8' });
    
    if (result.includes('Error') || result.includes('require is not defined')) {
      console.log(`${colors.red}✗ ES Module conversion failed. Script still has errors.${colors.reset}`);
      return false;
    } else {
      console.log(`${colors.green}✓ ES Module conversion succeeded. Script runs without errors.${colors.reset}`);
      return true;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error running check-cms-environment.js: ${error.message}${colors.reset}`);
    return false;
  }
}

/**
 * Test 2: Verify blog link in navigation
 */
async function testBlogNavigation() {
  console.log(`\n${colors.blue}Testing Blog Navigation...${colors.reset}`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    await page.goto(NEXT_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Check if the blog link exists in navigation
    const blogLinkExists = await page.evaluate(() => {
      const navLinks = Array.from(document.querySelectorAll('nav a'));
      return navLinks.some(link => link.textContent.trim() === 'BLOG');
    });
    
    if (blogLinkExists) {
      console.log(`${colors.green}✓ Blog link exists in navigation${colors.reset}`);
      
      // Click on the blog link
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.evaluate(() => {
          const navLinks = Array.from(document.querySelectorAll('nav a'));
          const blogLink = navLinks.find(link => link.textContent.trim() === 'BLOG');
          if (blogLink) blogLink.click();
        })
      ]);
      
      // Check if we're on the blog page
      const currentUrl = page.url();
      if (currentUrl.includes('/blog')) {
        console.log(`${colors.green}✓ Blog link navigates to blog page${colors.reset}`);
        
        // Check if blog posts are displayed
        const blogPostsExist = await page.evaluate(() => {
          return document.querySelectorAll('article, .blog-post, .article-card').length > 0;
        });
        
        if (blogPostsExist) {
          console.log(`${colors.green}✓ Blog posts are displayed${colors.reset}`);
          return true;
        } else {
          console.log(`${colors.yellow}⚠ Blog page loaded but no posts are displayed${colors.reset}`);
          return false;
        }
      } else {
        console.log(`${colors.red}✗ Blog link does not navigate to blog page${colors.reset}`);
        return false;
      }
    } else {
      console.log(`${colors.red}✗ Blog link does not exist in navigation${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error testing blog navigation: ${error.message}${colors.reset}`);
    return false;
  } finally {
    await browser.close();
  }
}

/**
 * Test 3: Test enhanced API error handling
 */
async function testAPIErrorHandling() {
  console.log(`\n${colors.blue}Testing Enhanced API Error Handling...${colors.reset}`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    // Forcefully enable the usingMockData flag by using a non-existent API URL
    await page.goto(`${NEXT_URL}/blog`, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });
    
    // Check if the mock data notification is displayed
    const mockDataNotificationExists = await page.evaluate(() => {
      return document.querySelector('.bg-yellow-50') !== null;
    });
    
    if (mockDataNotificationExists) {
      console.log(`${colors.green}✓ Enhanced error handling works - Mock data notification is displayed${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.yellow}⚠ Mock data notification not found - API might be working or notification not implemented${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error testing API error handling: ${error.message}${colors.reset}`);
    return false;
  } finally {
    await browser.close();
  }
}

/**
 * Test 4: Verify blog preview on homepage
 */
async function testBlogPreview() {
  console.log(`\n${colors.blue}Testing Blog Preview on Homepage...${colors.reset}`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    await page.goto(NEXT_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Check if the blog preview section exists
    const blogPreviewExists = await page.evaluate(() => {
      return document.querySelector('#blog-preview') !== null;
    });
    
    if (blogPreviewExists) {
      console.log(`${colors.green}✓ Blog preview section exists on homepage${colors.reset}`);
      
      // Check if there are blog preview cards
      const blogCardsExist = await page.evaluate(() => {
        const blogPreviewSection = document.querySelector('#blog-preview');
        if (!blogPreviewSection) return false;
        
        return blogPreviewSection.querySelectorAll('article, .blog-post, .article-card, .bg-white.rounded-lg').length > 0;
      });
      
      if (blogCardsExist) {
        console.log(`${colors.green}✓ Blog preview cards are displayed${colors.reset}`);
        
        // Check if "View All Posts" button exists
        const viewAllButtonExists = await page.evaluate(() => {
          const blogPreviewSection = document.querySelector('#blog-preview');
          if (!blogPreviewSection) return false;
          
          const links = Array.from(blogPreviewSection.querySelectorAll('a'));
          return links.some(link => link.textContent.includes('View All Posts'));
        });
        
        if (viewAllButtonExists) {
          console.log(`${colors.green}✓ "View All Posts" button exists${colors.reset}`);
          return true;
        } else {
          console.log(`${colors.yellow}⚠ "View All Posts" button not found${colors.reset}`);
          return false;
        }
      } else {
        console.log(`${colors.yellow}⚠ Blog preview section exists but no cards are displayed${colors.reset}`);
        return false;
      }
    } else {
      console.log(`${colors.red}✗ Blog preview section does not exist on homepage${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error testing blog preview: ${error.message}${colors.reset}`);
    return false;
  } finally {
    await browser.close();
  }
}

/**
 * Run all tests and generate a report
 */
async function runTests() {
  const results = {};
  
  console.log(`\n${colors.magenta}Running optimization tests...${colors.reset}`);
  
  results.esModuleConversion = await testESModuleConversion();
  results.blogNavigation = await testBlogNavigation();
  results.apiErrorHandling = await testAPIErrorHandling();
  results.blogPreview = await testBlogPreview();
  
  // Generate report
  console.log(`\n${colors.magenta}=== Blog Optimization Test Results ====${colors.reset}\n`);
  console.log(`${results.esModuleConversion ? colors.green : colors.red}ES Module Conversion: ${results.esModuleConversion ? 'PASSED' : 'FAILED'}${colors.reset}`);
  console.log(`${results.blogNavigation ? colors.green : colors.red}Blog Navigation: ${results.blogNavigation ? 'PASSED' : 'FAILED'}${colors.reset}`);
  console.log(`${results.apiErrorHandling ? colors.green : colors.red}API Error Handling: ${results.apiErrorHandling ? 'PASSED' : 'FAILED'}${colors.reset}`);
  console.log(`${results.blogPreview ? colors.green : colors.red}Blog Preview: ${results.blogPreview ? 'PASSED' : 'FAILED'}${colors.reset}`);
  
  const passedCount = Object.values(results).filter(result => result).length;
  const totalCount = Object.values(results).length;
  
  console.log(`\n${colors.magenta}Summary: ${passedCount}/${totalCount} tests passed${colors.reset}`);
  
  if (passedCount === totalCount) {
    console.log(`\n${colors.green}All tests passed! The blog optimization was successful.${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}Some tests failed. Review the results above and fix any remaining issues.${colors.reset}`);
  }
}

// Run the tests
runTests(); 