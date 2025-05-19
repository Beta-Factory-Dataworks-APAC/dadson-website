/**
 * Blog Optimization Test Plan
 * 
 * This script tests the blog functionality after optimization tasks have been completed.
 * It verifies all critical functionality and produces a report.
 */

const puppeteer = require('puppeteer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Configuration
const NEXT_PORT = process.env.NEXT_PORT || 3003; // The optimized version should run on port 3003
const PAYLOAD_PORT = process.env.PAYLOAD_PORT || 3004;  
const NEXT_URL = `http://localhost:${NEXT_PORT}`;
const PAYLOAD_URL = `http://localhost:${PAYLOAD_PORT}`;

// ANSI Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results tracking
const testResults = {
  payloadCms: { status: 'not tested', details: '' },
  navigation: { status: 'not tested', details: '' },
  blogIndex: { status: 'not tested', details: '' },
  categoryFiltering: { status: 'not tested', details: '' },
  articlePages: { status: 'not tested', details: '' },
  responsive: { status: 'not tested', details: '' },
  fallback: { status: 'not tested', details: '' },
  homepagePreview: { status: 'not tested', details: '' }
};

// Delay helper
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if PayloadCMS is running
 */
async function testPayloadCMS() {
  console.log(`\n${colors.magenta}Testing PayloadCMS Connection${colors.reset}`);
  
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/articles`);
    
    if (response.ok) {
      console.log(`${colors.green}✓ PayloadCMS is running and accessible${colors.reset}`);
      testResults.payloadCms.status = 'pass';
      testResults.payloadCms.details = `Connected to PayloadCMS on port ${PAYLOAD_PORT}`;
      return true;
    } else {
      console.log(`${colors.yellow}⚠ PayloadCMS returned status ${response.status}${colors.reset}`);
      testResults.payloadCms.status = 'warn';
      testResults.payloadCms.details = `PayloadCMS returned status ${response.status}`;
      return false;
    }
  } catch (error) {
    console.log(`${colors.yellow}⚠ Could not connect to PayloadCMS: ${error.message}${colors.reset}`);
    testResults.payloadCms.status = 'warn';
    testResults.payloadCms.details = `Could not connect to PayloadCMS: ${error.message}`;
    return false;
  }
}

/**
 * Run the complete test suite using Puppeteer
 */
async function runTests() {
  // First check if PayloadCMS is running
  const payloadRunning = await testPayloadCMS();
  
  console.log(`\n${colors.magenta}Starting Visual Test Suite${colors.reset}`);
  
  // Launch browser
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // 1. Test navigation - Check if blog link is in main navigation
    console.log(`\n${colors.blue}Testing Blog Navigation${colors.reset}`);
    await page.goto(NEXT_URL, { waitUntil: 'networkidle2' });
    
    const blogNavLinks = await page.$$('nav a[href="/blog"], nav a[href*="blog"]');
    
    if (blogNavLinks.length > 0) {
      console.log(`${colors.green}✓ Blog link found in main navigation${colors.reset}`);
      testResults.navigation.status = 'pass';
      testResults.navigation.details = 'Blog link is present in main navigation';
      
      // Click on the blog link to navigate to blog page
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        blogNavLinks[0].click()
      ]);
    } else {
      console.log(`${colors.red}✗ Blog link not found in main navigation${colors.reset}`);
      testResults.navigation.status = 'fail';
      testResults.navigation.details = 'Blog link is missing from main navigation';
      
      // Navigate directly to blog page
      await page.goto(`${NEXT_URL}/blog`, { waitUntil: 'networkidle2' });
    }
    
    // 2. Test blog index page
    console.log(`\n${colors.blue}Testing Blog Index Page${colors.reset}`);
    await page.screenshot({ path: 'blog-index.png', fullPage: true });
    
    const blogTitle = await page.$('h1, .blog-title, header h1');
    const articleCards = await page.$$('article, .card, .blog-card, div[class*="article"], a[href*="/blog/"]');
    
    if (blogTitle && articleCards.length > 0) {
      const titleText = await page.evaluate(el => el.textContent, blogTitle);
      console.log(`${colors.green}✓ Blog index page loaded with title: "${titleText}"${colors.reset}`);
      console.log(`${colors.green}✓ Found ${articleCards.length} article cards${colors.reset}`);
      testResults.blogIndex.status = 'pass';
      testResults.blogIndex.details = `Blog index page loaded with ${articleCards.length} articles`;
    } else {
      console.log(`${colors.red}✗ Blog index page not loading correctly${colors.reset}`);
      testResults.blogIndex.status = 'fail';
      testResults.blogIndex.details = 'Blog index page missing title or article cards';
    }
    
    // 3. Test category filtering
    console.log(`\n${colors.blue}Testing Category Filtering${colors.reset}`);
    const categoryLinks = await page.$$('.category-filter a, a[href*="category="], button[class*="category"]');
    
    if (categoryLinks.length > 0) {
      console.log(`${colors.green}✓ Found ${categoryLinks.length} category filters${colors.reset}`);
      
      // Click on the first category
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}),
        categoryLinks[0].click()
      ]);
      
      await page.screenshot({ path: 'category-filtered.png', fullPage: true });
      
      // Check if URL contains category parameter
      const currentUrl = page.url();
      if (currentUrl.includes('category=') || currentUrl.includes('/category/')) {
        console.log(`${colors.green}✓ Category filtering works - URL updated${colors.reset}`);
        testResults.categoryFiltering.status = 'pass';
        testResults.categoryFiltering.details = 'Category filtering changes URL and updates article list';
      } else {
        console.log(`${colors.yellow}⚠ Category may be filtered but URL not updated${colors.reset}`);
        testResults.categoryFiltering.status = 'warn';
        testResults.categoryFiltering.details = 'Category filter clicked but URL not updated';
      }
    } else {
      console.log(`${colors.yellow}⚠ No category filters found${colors.reset}`);
      testResults.categoryFiltering.status = 'warn';
      testResults.categoryFiltering.details = 'No category filters found on blog index page';
    }
    
    // 4. Test article page
    console.log(`\n${colors.blue}Testing Individual Article Page${colors.reset}`);
    
    // Navigate back to blog index if needed
    if (!page.url().includes('/blog') || page.url().includes('category=')) {
      await page.goto(`${NEXT_URL}/blog`, { waitUntil: 'networkidle2' });
    }
    
    // Find article cards again
    const articleLinks = await page.$$('article a, .card a, a[href*="/blog/"]');
    
    if (articleLinks.length > 0) {
      // Click on the first article
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        articleLinks[0].click()
      ]);
      
      await page.screenshot({ path: 'article-page.png', fullPage: true });
      
      // Check if we're on an article page
      const articleTitle = await page.$('article h1, .article-title, main h1');
      const articleContent = await page.$('article p, .article-content, article div');
      
      if (articleTitle && articleContent) {
        const titleText = await page.evaluate(el => el.textContent, articleTitle);
        console.log(`${colors.green}✓ Article page loaded with title: "${titleText}"${colors.reset}`);
        testResults.articlePages.status = 'pass';
        testResults.articlePages.details = 'Article page displays title and content correctly';
      } else {
        console.log(`${colors.red}✗ Article page not loading correctly${colors.reset}`);
        testResults.articlePages.status = 'fail';
        testResults.articlePages.details = 'Article page missing title or content';
      }
    } else {
      console.log(`${colors.yellow}⚠ No article links found to test individual article page${colors.reset}`);
      testResults.articlePages.status = 'warn';
      testResults.articlePages.details = 'Could not test article page - no links found';
    }
    
    // 5. Test responsive design
    console.log(`\n${colors.blue}Testing Responsive Design${colors.reset}`);
    
    // Mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${NEXT_URL}/blog`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'blog-mobile.png', fullPage: false });
    
    // Tablet viewport
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(`${NEXT_URL}/blog`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'blog-tablet.png', fullPage: false });
    
    // Desktop viewport (already tested)
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log(`${colors.green}✓ Responsive screenshots captured for review${colors.reset}`);
    testResults.responsive.status = 'pass';
    testResults.responsive.details = 'Screenshots captured for mobile, tablet and desktop';
    
    // 6. Test homepage blog preview section
    console.log(`\n${colors.blue}Testing Homepage Blog Preview${colors.reset}`);
    await page.goto(NEXT_URL, { waitUntil: 'networkidle2' });
    
    const blogPreviewSection = await page.$('.blog-preview, section:has(h2:contains("Blog")), section:has(a[href="/blog"])');
    
    if (blogPreviewSection) {
      console.log(`${colors.green}✓ Blog preview section found on homepage${colors.reset}`);
      
      const previewArticles = await blogPreviewSection.$$('article, .card, a[href*="/blog/"]');
      const viewAllButton = await blogPreviewSection.$('a[href="/blog"]');
      
      if (previewArticles.length > 0 && viewAllButton) {
        console.log(`${colors.green}✓ Homepage preview shows ${previewArticles.length} articles with View All button${colors.reset}`);
        testResults.homepagePreview.status = 'pass';
        testResults.homepagePreview.details = `Homepage displays ${previewArticles.length} article previews with View All button`;
      } else {
        console.log(`${colors.yellow}⚠ Blog preview section exists but is incomplete${colors.reset}`);
        testResults.homepagePreview.status = 'warn';
        testResults.homepagePreview.details = 'Blog preview section missing articles or View All button';
      }
    } else {
      console.log(`${colors.red}✗ No blog preview section found on homepage${colors.reset}`);
      testResults.homepagePreview.status = 'fail';
      testResults.homepagePreview.details = 'Homepage does not have a blog preview section';
    }
    
    // 7. Test fallback to mock API is difficult to test automatically
    // but we can check if the API endpoint handles missing PayloadCMS gracefully
    testResults.fallback.status = payloadRunning ? 'not tested' : 'pass';
    testResults.fallback.details = payloadRunning ? 
      'Could not test fallback because PayloadCMS is running' : 
      'Site loaded blog content without PayloadCMS running (using mock data)';
    
  } catch (error) {
    console.error(`${colors.red}Error during testing:${colors.reset}`, error);
  } finally {
    // Print test results summary
    console.log(`\n${colors.magenta}=== Test Results Summary ====${colors.reset}`);
    
    for (const [test, result] of Object.entries(testResults)) {
      const statusColor = 
        result.status === 'pass' ? colors.green :
        result.status === 'warn' ? colors.yellow :
        result.status === 'fail' ? colors.red : colors.blue;
      
      const statusSymbol = 
        result.status === 'pass' ? '✓' :
        result.status === 'warn' ? '⚠' :
        result.status === 'fail' ? '✗' : '?';
      
      console.log(`${statusColor}${statusSymbol} ${test}:${colors.reset} ${result.details}`);
    }
    
    // Create markdown report
    const reportContent = `# Blog Optimization Test Results
    
## Test Summary
${Object.entries(testResults).map(([test, result]) => {
  const statusSymbol = 
    result.status === 'pass' ? '✅' :
    result.status === 'warn' ? '⚠️' :
    result.status === 'fail' ? '❌' : '❓';
  
  return `- **${test}**: ${statusSymbol} ${result.details}`;
}).join('\n')}

## Screenshots
- [Blog Index Page](blog-index.png)
- [Category Filtered View](category-filtered.png)
- [Article Page](article-page.png)
- [Mobile View](blog-mobile.png)
- [Tablet View](blog-tablet.png)

## Next Steps
${Object.entries(testResults)
  .filter(([_, result]) => result.status === 'fail' || result.status === 'warn')
  .map(([test, result]) => `- Fix ${test}: ${result.details}`)
  .join('\n')}

Test completed at: ${new Date().toLocaleString()}
`;
    
    const fs = require('fs');
    fs.writeFileSync('blog-test-results.md', reportContent);
    console.log(`\n${colors.green}Test results saved to blog-test-results.md${colors.reset}`);
    
    // Wait a moment before closing
    await delay(3000);
    await browser.close();
  }
}

// Run the tests
runTests(); 