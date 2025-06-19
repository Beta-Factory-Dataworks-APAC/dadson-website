const puppeteer = require('puppeteer');

async function testCategoryFiltering() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing Category Filtering...\n');
    
    await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle2' });
    
    // Take initial screenshot
    await page.screenshot({ path: 'category-test-1-initial.png', fullPage: true });
    console.log('📸 Initial page screenshot taken');
    
    // Count articles initially
    const initialArticles = await page.$$eval('[data-testid="article-card"], article', 
      cards => cards.length
    );
    console.log(`Initial articles count: ${initialArticles}`);
    
    // Test clicking on "Operations" category
    console.log('\n🖱️  Clicking on Operations category...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const operationsButton = buttons.find(btn => btn.textContent.trim() === 'Operations');
      if (operationsButton) operationsButton.click();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot after operations filter
    await page.screenshot({ path: 'category-test-2-operations.png', fullPage: true });
    console.log('📸 Operations filter screenshot taken');
    
    // Count articles after filtering
    const operationsArticles = await page.$$eval('[data-testid="article-card"], article', 
      cards => cards.length
    );
    console.log(`Articles after Operations filter: ${operationsArticles}`);
    
    // Test clicking on "Strategy" category
    console.log('\n🖱️  Clicking on Strategy category...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const strategyButton = buttons.find(btn => btn.textContent.trim() === 'Strategy');
      if (strategyButton) strategyButton.click();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot after strategy filter
    await page.screenshot({ path: 'category-test-3-strategy.png', fullPage: true });
    console.log('📸 Strategy filter screenshot taken');
    
    // Count articles after strategy filtering
    const strategyArticles = await page.$$eval('[data-testid="article-card"], article', 
      cards => cards.length
    );
    console.log(`Articles after Strategy filter: ${strategyArticles}`);
    
    // Test clicking back to "All"
    console.log('\n🖱️  Clicking on All category...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const allButton = buttons.find(btn => btn.textContent.trim() === 'All');
      if (allButton) allButton.click();
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take final screenshot
    await page.screenshot({ path: 'category-test-4-all.png', fullPage: true });
    console.log('📸 All filter screenshot taken');
    
    // Count articles after returning to all
    const allArticles = await page.$$eval('[data-testid="article-card"], article', 
      cards => cards.length
    );
    console.log(`Articles after returning to All: ${allArticles}`);
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`Initial: ${initialArticles} articles`);
    console.log(`Operations: ${operationsArticles} articles`);
    console.log(`Strategy: ${strategyArticles} articles`);
    console.log(`All (final): ${allArticles} articles`);
    
    if (operationsArticles > 0 && strategyArticles > 0) {
      console.log('✅ Category filtering is working!');
    } else {
      console.log('❌ Category filtering may have issues');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCategoryFiltering();