const puppeteer = require('puppeteer');

async function testTruckAnimation() {
  // Launch browser with larger viewport to see more content
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to a local instance or a deployed version
    // Adjust URL as needed based on your development environment
    console.log('Navigating to website...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    
    // Wait for the page to load completely
    console.log('Waiting for page to load...');
    await page.waitForTimeout(2000);
    
    console.log('Taking screenshot of initial state...');
    await page.screenshot({ path: 'initial-view.png', fullPage: true });
    
    // Scroll down to where the truck animation should be
    console.log('Scrolling to the NoBots section...');
    
    // Find scrolling banner text which is right above the truck
    await page.evaluate(() => {
      // Scroll down based on viewport height to approximately where the NoBotsBanner is
      window.scrollTo({
        top: window.innerHeight * 1.5,
        behavior: 'smooth'
      });
    });
    
    // Wait for animation to start
    console.log('Waiting for animation to start...');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'truck-animation-start.png', fullPage: false });
    
    // Wait for animation to finish
    console.log('Waiting for animation to complete...');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'truck-animation-end.png', fullPage: false });
    
    // Test responsiveness on smaller viewports
    console.log('Testing on mobile viewport...');
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Refresh to reset animations
    await page.reload({ waitUntil: 'networkidle2' });
    
    // Scroll to mobile truck
    await page.evaluate(() => {
      window.scrollTo({
        top: window.innerHeight * 2,
        behavior: 'smooth'
      });
    });
    
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'truck-animation-mobile.png', fullPage: false });
    
    console.log('Animation testing complete! Screenshots saved.');
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    // Wait a bit before closing browser so you can see the result
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

// Run the test
testTruckAnimation(); 