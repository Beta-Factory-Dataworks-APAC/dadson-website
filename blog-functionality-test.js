const puppeteer = require('puppeteer');

async function testBlogFunctionality() {
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
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Disable timeout for navigation
    page.setDefaultTimeout(0);
    
    // Check if Payload CMS is running for blog backend
    console.log('Checking if Payload CMS is running...');
    try {
      await page.goto('http://localhost:3001/admin', { 
        waitUntil: 'domcontentloaded',
        timeout: 10000
      });
      console.log('Successfully connected to Payload CMS admin');
      await page.screenshot({ path: 'payload-cms.png' });
      
      // Check if we see the login form
      const loginForm = await page.$('form');
      if (loginForm) {
        console.log('Found Payload CMS login form');
      } else {
        console.log('Payload CMS login form not found');
      }
    } catch (error) {
      console.log('Could not connect to Payload CMS admin. This may be expected if using mock data.');
    }
    
    // First try to navigate to the home page
    console.log('Navigating to home page...');
    try {
      await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 10000
      });
      console.log('Successfully connected to home page');
      await page.screenshot({ path: 'home-page.png' });
    } catch (error) {
      console.error('Error connecting to home page:', error);
      console.log('Make sure the development server is running with "npm run dev"');
      return;
    }
    
    // Try to find a navigation link to the blog
    console.log('Looking for navigation to blog...');
    const navLinks = await page.$$('nav a');
    let blogNavLink = null;
    
    for (let i = 0; i < navLinks.length; i++) {
      const href = await page.evaluate(el => el.getAttribute('href'), navLinks[i]);
      const text = await page.evaluate(el => el.textContent, navLinks[i]);
      console.log(`Nav Link #${i+1}: ${text} (${href})`);
      
      if (href === '/blog' || text.toLowerCase().includes('blog')) {
        blogNavLink = navLinks[i];
        break;
      }
    }
    
    // Navigate to blog page
    if (blogNavLink) {
      console.log('Found blog navigation link, clicking it...');
      await blogNavLink.click();
      await delay(5000);
    } else {
      console.log('No blog navigation link found, trying direct navigation...');
      // Try direct navigation with a more permissive approach
      await page.evaluate(() => {
        window.location.href = '/blog';
      });
      await delay(5000);
    }
    
    // Take screenshot of current page
    console.log('Taking screenshot of current page...');
    await page.screenshot({ path: 'current-page.png', fullPage: true });
    
    // Check URL to verify we're on the blog page
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    // Analyze page content
    console.log('Looking for blog content...');
    
    // Check the title to confirm we're on the blog page
    const pageTitle = await page.title();
    console.log(`Page title: ${pageTitle}`);
    
    // Look for any elements that might be part of the blog
    const articleElements = await page.$$('article, .card, .bg-white.rounded-lg, div[class*="article"]');
    console.log(`Found ${articleElements.length} potential article elements`);
    
    // Look for headings that might indicate blog page
    const h1Elements = await page.$$('h1');
    for (let i = 0; i < h1Elements.length; i++) {
      const h1Text = await page.evaluate(el => el.textContent, h1Elements[i]);
      console.log(`H1 #${i+1}: ${h1Text}`);
      
      // If heading contains "blog", we're likely on the right page
      if (h1Text.toLowerCase().includes('blog')) {
        console.log('Found blog heading, confirming we are on the blog page');
      }
    }
    
    // Test clicking on blog posts if available
    if (articleElements.length > 0) {
      console.log('Attempting to click on first article element...');
      await articleElements[0].click().catch(e => console.log('Could not click article element:', e));
      await delay(3000);
      await page.screenshot({ path: 'article-page.png', fullPage: true });
    } else {
      // Look for any links that might be blog posts
      console.log('Looking for link elements that might be blog posts...');
      const allLinks = await page.$$('a');
      let blogPostLinks = [];
      
      for (let i = 0; i < Math.min(allLinks.length, 20); i++) {
        try {
          const href = await page.evaluate(el => el.getAttribute('href'), allLinks[i]);
          if (href && href.includes('/blog/') && !href.includes('/blog/category')) {
            blogPostLinks.push(allLinks[i]);
            console.log(`Found potential blog post link: ${href}`);
          }
        } catch (error) {
          // Skip any links that can't be evaluated
        }
      }
      
      if (blogPostLinks.length > 0) {
        console.log(`Found ${blogPostLinks.length} potential blog post links, clicking first one...`);
        await blogPostLinks[0].click().catch(e => console.log('Could not click blog post link:', e));
        await delay(3000);
        await page.screenshot({ path: 'article-page.png', fullPage: true });
      }
    }
    
    console.log('Blog functionality testing complete! Screenshots saved.');
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    // Wait a bit before closing browser
    if (page) {
      await delay(5000);
    }
    await browser.close();
  }
}

// Run the test
testBlogFunctionality(); 