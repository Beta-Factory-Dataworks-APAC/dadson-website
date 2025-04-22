const puppeteer = require('puppeteer');

async function testBlogCMSFunctionality() {
  // Launch browser with larger viewport
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  let page;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to Payload CMS admin
    console.log('Navigating to Payload CMS admin...');
    await page.goto('http://localhost:3001/admin', { 
      waitUntil: 'domcontentloaded',
      timeout: 20000
    });
    
    // Take screenshot of login page
    console.log('Taking screenshot of Payload CMS admin login page...');
    await page.screenshot({ path: 'payload-login.png', fullPage: true });
    
    // Check if we need to log in
    const emailInput = await page.$('input[type="email"]');
    const passwordInput = await page.$('input[type="password"]');
    
    if (emailInput && passwordInput) {
      console.log('Login form found, attempting to log in...');
      
      // Enter login credentials - you may need to update these
      await emailInput.type('admin@example.com');
      await passwordInput.type('Password123!');
      
      // Find and click login button
      const loginButton = await page.$('button[type="submit"]');
      if (loginButton) {
        await loginButton.click();
        await delay(3000);
        console.log('Login button clicked, waiting for dashboard...');
      } else {
        console.log('Login button not found');
      }
    } else {
      console.log('No login form found, may already be logged in');
    }
    
    // Take screenshot of dashboard or current page
    await page.screenshot({ path: 'payload-dashboard.png', fullPage: true });
    
    // Check for articles collection in the sidebar
    console.log('Looking for Articles collection in sidebar...');
    const sidebarLinks = await page.$$('nav a');
    let articlesLink = null;
    
    for (let i = 0; i < sidebarLinks.length; i++) {
      const text = await page.evaluate(el => el.textContent, sidebarLinks[i]);
      console.log(`Sidebar link: ${text}`);
      
      if (text.includes('Articles') || text.includes('Blog')) {
        articlesLink = sidebarLinks[i];
        console.log('Found Articles collection link');
        break;
      }
    }
    
    // Navigate to articles collection if found
    if (articlesLink) {
      console.log('Clicking on Articles collection link...');
      await articlesLink.click();
      await delay(3000);
      
      // Take screenshot of articles list
      await page.screenshot({ path: 'payload-articles.png', fullPage: true });
      
      // Check for article entries
      const articleRows = await page.$$('tbody tr');
      console.log(`Found ${articleRows.length} article entries`);
      
      // If articles exist, click on the first one
      if (articleRows.length > 0) {
        console.log('Clicking on first article to view details...');
        await articleRows[0].click();
        await delay(3000);
        
        // Take screenshot of article details
        await page.screenshot({ path: 'payload-article-details.png', fullPage: true });
        
        // Check for common blog article fields
        const titleField = await page.$('input[name="title"]');
        const contentField = await page.$('div[contenteditable="true"]');
        
        if (titleField) {
          const titleValue = await page.evaluate(el => el.value, titleField);
          console.log(`Article title: ${titleValue}`);
        }
        
        if (contentField) {
          console.log('Content field found');
        } else {
          console.log('No content field found');
        }
      }
    } else {
      console.log('Articles collection not found in sidebar');
    }
    
    // Check for categories collection
    console.log('Looking for Categories collection...');
    const categoriesLink = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('nav a'));
      return links.find(link => link.textContent.includes('Categories'));
    });
    
    if (categoriesLink) {
      console.log('Found Categories collection, clicking to view...');
      await categoriesLink.click();
      await delay(2000);
      
      // Take screenshot of categories list
      await page.screenshot({ path: 'payload-categories.png', fullPage: true });
    }
    
    console.log('Blog CMS functionality testing complete! Screenshots saved.');
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
testBlogCMSFunctionality(); 