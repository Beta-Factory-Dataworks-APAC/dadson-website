const puppeteer = require('puppeteer');

async function finalBlogTest() {
  console.log('Running final test of blog functionality...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  let page;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    page = await browser.newPage();
    
    // Set a custom header to prevent redirect loops
    await page.setExtraHTTPHeaders({
      'x-redirect-count': '0',
    });
    
    // Test all three API endpoints to ensure they're working
    console.log('\n1. Testing blog API endpoints...');
    
    // Test main blog endpoint
    try {
      await page.goto('http://localhost:3000/api/blog', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      const mainApiContent = await page.content();
      console.log(`Main API endpoint working: ${mainApiContent.includes('docs')}`);
      await page.screenshot({ path: 'final-blog-api.png' });
    } catch (error) {
      console.error('Error testing main API:', error);
    }
    
    // Test blog categories endpoint
    try {
      await page.goto('http://localhost:3000/api/blog/categories', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      const categoriesApiContent = await page.content();
      console.log(`Categories API endpoint working: ${categoriesApiContent.includes('docs')}`);
      await page.screenshot({ path: 'final-categories-api.png' });
    } catch (error) {
      console.error('Error testing categories API:', error);
    }
    
    // Test blog article endpoint
    try {
      await page.goto('http://localhost:3000/api/blog?slug=introduction-to-logistics-management', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      const articleApiContent = await page.content();
      console.log(`Article API endpoint working: ${articleApiContent.includes('docs')}`);
      await page.screenshot({ path: 'final-article-api.png' });
    } catch (error) {
      console.error('Error testing article API:', error);
    }
    
    // Now test the blog index page
    console.log('\n2. Testing blog index page...');
    try {
      await page.goto('http://localhost:3000/blog', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      await delay(3000);
      const url = page.url();
      console.log(`Current URL: ${url}`);
      
      // Check if we stayed on the blog page (no redirect)
      console.log(`Successfully stayed on blog page: ${url.includes('/blog')}`);
      
      await page.screenshot({ path: 'final-blog-index.png', fullPage: true });
      
      // Check for blog content
      const pageContent = await page.content();
      
      // Inspect the HTML to see what content is rendered
      console.log(`Page content length: ${pageContent.length} characters`);
      console.log(`Contains "article" elements: ${pageContent.includes('<article')}`);
      console.log(`Contains "Introduction to Logistics Management": ${pageContent.includes('Introduction to Logistics Management')}`);
      
      // Try to find any links to blog articles
      const blogArticleLinks = await page.$$('a[href^="/blog/"]:not([href="/blog/categories"])');
      console.log(`Found ${blogArticleLinks.length} blog article links`);
      
      if (blogArticleLinks.length > 0) {
        console.log('\n3. Testing article page navigation...');
        await blogArticleLinks[0].click();
        await delay(3000);
        
        const articleUrl = page.url();
        console.log(`Article URL: ${articleUrl}`);
        console.log(`Successfully navigated to article: ${articleUrl.includes('/blog/') && !articleUrl.includes('/blog?')}`);
        
        await page.screenshot({ path: 'final-article-page.png', fullPage: true });
        
        // Check if article content is shown
        const articlePageContent = await page.content();
        console.log(`Article page contains content: ${articlePageContent.length > 1000}`);
      }
    } catch (error) {
      console.error('Error testing blog pages:', error);
    }
    
    console.log('\nTest completed. Check the screenshots to verify results.');
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
finalBlogTest(); 