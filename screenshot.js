const puppeteer = require('puppeteer');

async function takeScreenshots() {
  console.log('Starting screenshot capture...');
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Define viewport sizes to test
  const viewports = [
    { width: 1366, height: 768, name: 'laptop' },      // Laptop
    { width: 1920, height: 1080, name: 'desktop' },    // Desktop
    { width: 2560, height: 1440, name: '2k' },         // 2K monitor
    { width: 3840, height: 2160, name: '4k' }          // 4K monitor
  ];
  
  // URL of your local development server
  const url = 'http://localhost:3006';
  
  for (const viewport of viewports) {
    console.log(`Capturing screenshot for ${viewport.name} (${viewport.width}x${viewport.height})...`);
    
    // Set viewport size
    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    });
    
    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    await page.screenshot({
      path: `screenshot-${viewport.name}.png`,
      fullPage: true
    });
    
    console.log(`Screenshot saved as screenshot-${viewport.name}.png`);
  }
  
  await browser.close();
  console.log('Screenshot capture completed.');
}

takeScreenshots().catch(error => {
  console.error('Error taking screenshots:', error);
  process.exit(1);
}); 