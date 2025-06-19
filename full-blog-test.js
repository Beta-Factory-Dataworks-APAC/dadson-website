const puppeteer = require('puppeteer');
// Fix fetch import issue by using global fetch from Node 18+
// If running on older Node, uncomment:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Configuration
const NEXT_PORT = process.env.NEXT_PORT || 3007; // Use port 3007 as seen in running instance
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
  magenta: '\x1b[35m'
};

// Helper function for delays
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if APIs are working
 */
async function testAPIs() {
  console.log(`\n${colors.magenta}Testing Blog APIs...${colors.reset}`);
  
  try {
    // Test Next.js API endpoints
    console.log(`\n${colors.blue}Testing /api/blog endpoint...${colors.reset}`);
    // Using try/catch to handle any fetch errors
    try {
      const articlesResponse = await fetch(`${NEXT_URL}/api/blog`);
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();
        console.log(`${colors.green}✓ Blog API is working${colors.reset}`);
        console.log(`${colors.green}✓ Found ${articlesData.docs?.length || 0} articles${colors.reset}`);
        return articlesData.docs || [];
      } else {
        console.log(`${colors.red}✗ Blog API returned status ${articlesResponse.status}${colors.reset}`);
      }
    } catch (apiError) {
      console.log(`${colors.yellow}Could not connect to API: ${apiError.message}${colors.reset}`);
      console.log(`${colors.yellow}Will continue with visual testing${colors.reset}`);
    }
    return [];
  } catch (error) {
    console.log(`${colors.red}✗ Error testing API: ${error.message}${colors.reset}`);
    return [];
  }
}

/**
 * Main function to test the blog workflow
 */
async function testBlogWorkflow() {
  // First test the APIs
  const articles = await testAPIs();
  
  console.log(`\n${colors.magenta}=== Starting Visual Blog Workflow Test ====${colors.reset}\n`);
  
  // Launch browser with larger viewport
  const browser = await puppeteer.launch({ 
    headless: false,
    args: [
      '--window-size=1920,1080',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });
  
  let page;

  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Disable timeout for navigation
    page.setDefaultTimeout(30000);
    
    // 1. Navigate to home page
    console.log(`${colors.blue}Navigating to home page...${colors.reset}`);
    await page.goto(NEXT_URL, { waitUntil: 'networkidle2' });
    console.log(`${colors.green}✓ Successfully loaded home page${colors.reset}`);
    await page.screenshot({ path: 'home-page.png' });
    
    // 2. Look for navigation to blog
    console.log(`${colors.blue}Looking for navigation to blog...${colors.reset}`);
    const navLinks = await page.$$('nav a');
    let blogNavLink = null;
    
    for (let i = 0; i < navLinks.length; i++) {
      const href = await page.evaluate(el => el.getAttribute('href'), navLinks[i]);
      const text = await page.evaluate(el => el.textContent, navLinks[i]);
      console.log(`Nav Link #${i+1}: ${text.trim()} (${href})`);
      
      if (href === '/blog' || text.toLowerCase().includes('blog')) {
        blogNavLink = navLinks[i];
        console.log(`${colors.green}✓ Found blog navigation link${colors.reset}`);
        break;
      }
    }
    
    // 3. Navigate to blog page - using evaluate for safer navigation
    console.log(`${colors.blue}Navigating to blog page...${colors.reset}`);
    try {
      if (blogNavLink) {
        console.log(`${colors.blue}Clicking blog navigation link...${colors.reset}`);
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {}),
          blogNavLink.click()
        ]);
      } else {
        console.log(`${colors.yellow}No blog navigation link found, trying direct navigation...${colors.reset}`);
        
        // Use evaluate to navigate to avoid navigation timeouts
        await page.evaluate(() => {
          window.location.href = '/blog';
        });
        
        // Wait a bit for the navigation to happen
        await delay(5000);
      }
      
      // Take screenshot of current page (whatever it is)
      await page.screenshot({ path: 'blog-or-error-page.png', fullPage: true });
      
      // 4. Verify we're on the blog page or at least what page we ended up on
      const currentUrl = page.url();
      console.log(`${colors.blue}Current URL: ${currentUrl}${colors.reset}`);
      
      const pageTitle = await page.title();
      console.log(`${colors.blue}Page title: ${pageTitle}${colors.reset}`);
      
      // Check if we're on a 404 page or error page
      const is404 = await page.evaluate(() => {
        return document.body.textContent.includes('404') || 
               document.body.textContent.toLowerCase().includes('not found') ||
               document.body.textContent.toLowerCase().includes('error');
      });
      
      if (is404) {
        console.log(`${colors.yellow}Detected 404 or error page - blog page may not exist${colors.reset}`);
        // Try to check if there are any example blog URLs in the codebase
        console.log(`${colors.blue}Checking for blog in site footer or alternatives...${colors.reset}`);
        
        // Look in footer for blog links
        const footerLinks = await page.$$('footer a');
        for (let i = 0; i < footerLinks.length; i++) {
          const href = await page.evaluate(el => el.getAttribute('href'), footerLinks[i]);
          const text = await page.evaluate(el => el.textContent, footerLinks[i]);
          console.log(`Footer Link #${i+1}: ${text.trim()} (${href})`);
          
          if (href && (href.includes('blog') || text.toLowerCase().includes('blog'))) {
            console.log(`${colors.green}✓ Found blog link in footer: ${href}${colors.reset}`);
            await page.goto(`${NEXT_URL}${href.startsWith('/') ? href : '/' + href}`, { 
              waitUntil: 'networkidle2',
              timeout: 15000
            }).catch(() => {});
            break;
          }
        }
      } else {
        console.log(`${colors.green}✓ Navigation to blog page successful${colors.reset}`);
      }
      
      // 5. Look for blog articles
      console.log(`${colors.blue}Looking for blog articles...${colors.reset}`);
      const articleCards = await page.$$('article, .card, .blog-card, div[class*="article"], a[href*="/blog/"]');
      console.log(`${colors.green}✓ Found ${articleCards.length} potential blog articles${colors.reset}`);
      
      // 6. Click on the first article if available
      if (articleCards.length > 0) {
        console.log(`${colors.blue}Clicking on first article...${colors.reset}`);
        
        // Get the article's URL before clicking
        const articleUrl = await page.evaluate(el => {
          // If it's a link, get its href, otherwise find closest link
          if (el.tagName === 'A') return el.getAttribute('href');
          const link = el.querySelector('a') || el.closest('a');
          return link ? link.getAttribute('href') : null;
        }, articleCards[0]);
        
        if (articleUrl) {
          console.log(`${colors.blue}Article URL: ${articleUrl}${colors.reset}`);
          await page.goto(`${NEXT_URL}${articleUrl.startsWith('/') ? articleUrl : '/' + articleUrl}`, { 
            waitUntil: 'networkidle2',
            timeout: 15000
          }).catch(() => {});
        } else {
          // Try to click the element or a link inside it
          try {
            await Promise.all([
              page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {}),
              articleCards[0].click()
            ]);
          } catch (error) {
            console.log(`${colors.yellow}Could not click article directly, looking for links inside...${colors.reset}`);
            const innerLink = await articleCards[0].$('a');
            if (innerLink) {
              await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {}),
                innerLink.click()
              ]);
            }
          }
        }
        
        // 7. Verify we're on an article page
        const articlePageUrl = page.url();
        console.log(`${colors.blue}Article page URL: ${articlePageUrl}${colors.reset}`);
        
        // Take screenshot of article page
        await page.screenshot({ path: 'article-page.png', fullPage: true });
        
        // 8. Check for article content
        const articleTitle = await page.$('h1');
        if (articleTitle) {
          const titleText = await page.evaluate(el => el.textContent, articleTitle);
          console.log(`${colors.green}✓ Found article title: ${titleText}${colors.reset}`);
        }
        
        const articleContent = await page.$('article, main, div[class*="content"]');
        if (articleContent) {
          console.log(`${colors.green}✓ Found article content${colors.reset}`);
        }
      } else {
        console.log(`${colors.yellow}No blog articles found to click${colors.reset}`);
      }
    } catch (navError) {
      console.log(`${colors.red}Error during navigation: ${navError.message}${colors.reset}`);
      await page.screenshot({ path: 'error-state.png', fullPage: true });
    }
    
    console.log(`\n${colors.magenta}=== Blog Workflow Test Completed ====${colors.reset}`);
    console.log(`${colors.green}✓ Screenshots saved to current directory${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}Error during testing:${colors.reset}`, error);
  } finally {
    // Wait a bit before closing browser
    await delay(5000);
    await browser.close();
  }
}

// Run the test
testBlogWorkflow(); 