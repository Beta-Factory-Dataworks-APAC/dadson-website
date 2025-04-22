const puppeteer = require('puppeteer');

async function testBlogFix() {
  console.log('Testing blog functionality after fix...');
  
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
    
    // First test direct API access without UI
    console.log('1. Testing blog API endpoint...');
    try {
      await page.goto('http://localhost:3001/api/blog', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      const content = await page.content();
      const apiWorks = content.includes('article') || content.includes('docs');
      console.log(`API endpoint working: ${apiWorks}`);
      
      await page.screenshot({ path: 'blog-api-test.png' });
    } catch (error) {
      console.error('Error testing API:', error);
    }
    
    // Now test the blog index page
    console.log('\n2. Testing blog index page...');
    try {
      await page.goto('http://localhost:3001/blog', {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      });
      
      await delay(3000);
      const url = page.url();
      console.log(`Current URL: ${url}`);
      
      await page.screenshot({ path: 'blog-index-test.png', fullPage: true });
      
      // Check for blog content
      const pageContent = await page.content();
      const blogContentExists = pageContent.includes('article') || 
                               pageContent.includes('blog') || 
                               pageContent.includes('Article');
      
      console.log(`Blog content detected: ${blogContentExists}`);
      
      // Try clicking on an article if any exists
      const links = await page.$$('a');
      let blogLinks = [];
      
      for (const link of links) {
        try {
          const href = await page.evaluate(el => el.getAttribute('href'), link);
          const text = await page.evaluate(el => el.textContent, link);
          
          if (href && href.includes('/blog/') && !href.includes('/blog/category')) {
            console.log(`Found blog post link: ${href} (${text})`);
            blogLinks.push(link);
          }
        } catch (e) {
          // Skip if can't evaluate
        }
      }
      
      if (blogLinks.length > 0) {
        console.log(`\n3. Clicking on blog article: ${blogLinks.length} links found`);
        await blogLinks[0].click();
        await delay(3000);
        
        const articleUrl = page.url();
        console.log(`Article URL: ${articleUrl}`);
        
        await page.screenshot({ path: 'blog-article-test.png', fullPage: true });
      } else {
        console.log('No blog article links found to click');
      }
    } catch (error) {
      console.error('Error testing blog page:', error);
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
testBlogFix(); 