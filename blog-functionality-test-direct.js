const puppeteer = require('puppeteer');

async function testBlogApiDirectly() {
  console.log('Testing blog API endpoints directly...');
  
  // Test the main blog API endpoint
  console.log('Testing /api/blog endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/blog');
    if (response.ok) {
      const data = await response.json();
      console.log('Successfully retrieved blog data:');
      console.log(`Total articles: ${data.docs ? data.docs.length : 'unknown'}`);
      
      if (data.docs && data.docs.length > 0) {
        // Log the first article
        console.log('First article:');
        console.log(`- Title: ${data.docs[0].title}`);
        console.log(`- Slug: ${data.docs[0].slug}`);
        console.log(`- Date: ${data.docs[0].publishedDate}`);
      }
    } else {
      console.log(`Error accessing /api/blog: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching from /api/blog:', error);
  }
  
  // Test the PayloadCMS API directly
  console.log('\nTesting PayloadCMS API endpoint...');
  try {
    const response = await fetch('http://localhost:3001/api/articles');
    if (response.ok) {
      const data = await response.json();
      console.log('Successfully retrieved PayloadCMS articles:');
      console.log(`Total articles: ${data.docs ? data.docs.length : 'unknown'}`);
      
      if (data.docs && data.docs.length > 0) {
        // Log the first article
        console.log('First article:');
        console.log(`- Title: ${data.docs[0].title}`);
        console.log(`- Slug: ${data.docs[0].slug}`);
        console.log(`- Status: ${data.docs[0].status}`);
      }
    } else {
      console.log(`Error accessing PayloadCMS API: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching from PayloadCMS API:', error);
  }
  
  // Now use Puppeteer to just take screenshots without complex navigation
  console.log('\nUsing Puppeteer to take screenshots of blog pages...');
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  let page;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    page.setDefaultTimeout(10000);
    
    // Direct access to blog page
    console.log('Direct access to blog index page with no-redirect option...');
    // Set a cookie to prevent redirects (just in case there's a redirect loop)
    await page.setCookie({
      name: 'no_redirect',
      value: 'true',
      url: 'http://localhost:3000'
    });
    
    // Disable JS for this test to prevent redirects
    await page.setJavaScriptEnabled(false);
    
    // Try to access the blog page directly
    try {
      await page.goto('http://localhost:3000/blog', { 
        waitUntil: 'domcontentloaded'
      });
      await page.screenshot({ path: 'blog-direct-access.png', fullPage: true });
      console.log(`Current URL: ${page.url()}`);
    } catch (error) {
      console.log('Error accessing blog page:', error);
    }
    
    // Re-enable JavaScript
    await page.setJavaScriptEnabled(true);
    
    // Try to access the API endpoint directly via browser
    try {
      console.log('Accessing blog API endpoint in browser...');
      await page.goto('http://localhost:3000/api/blog', { 
        waitUntil: 'domcontentloaded'
      });
      await page.screenshot({ path: 'blog-api-endpoint.png' });
      
      // Attempt to read the API response content
      const apiContent = await page.evaluate(() => document.body.innerText);
      console.log('API response content summary:');
      console.log(apiContent.substring(0, 200) + '...');
    } catch (error) {
      console.log('Error accessing blog API endpoint in browser:', error);
    }
    
    console.log('Direct blog functionality testing complete!');
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    if (page) {
      await delay(3000);
    }
    await browser.close();
  }
}

// Run the test
testBlogApiDirectly(); 