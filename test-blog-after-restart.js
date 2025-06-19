const puppeteer = require('puppeteer');

async function testBlogAfterRestart() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing blog after server restart...\n');
    
    // Navigate to blog page
    await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle2' });
    
    // Take screenshot
    await page.screenshot({ path: 'blog-after-restart.png', fullPage: true });
    console.log('📸 Blog page after restart screenshot taken');
    
    // Count total articles
    const totalArticles = await page.$$eval('article', cards => cards.length);
    console.log(`Total articles found: ${totalArticles}`);
    
    // Get all article titles
    const articleTitles = await page.$$eval('h3', headings => 
      headings.map(h => h.textContent.trim())
    );
    console.log('Article titles found:');
    articleTitles.forEach((title, index) => {
      console.log(`  ${index + 1}. ${title}`);
    });
    
    // Check if our new post appears
    const newPostExists = articleTitles.some(title => 
      title.includes('Advanced Fleet Management Solutions')
    );
    
    console.log(`\\nNew post "Advanced Fleet Management Solutions" found: ${newPostExists ? '✅' : '❌'}`);
    
    // Test Operations filter
    console.log('\\n🔍 Testing Operations filter...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const operationsButton = buttons.find(btn => btn.textContent.trim() === 'Operations');
      if (operationsButton) operationsButton.click();
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of filtered results
    await page.screenshot({ path: 'blog-operations-after-restart.png', fullPage: true });
    console.log('📸 Operations filter screenshot taken');
    
    // Count Operations articles
    const operationsArticles = await page.$$eval('article', cards => cards.length);
    console.log(`Operations articles found: ${operationsArticles}`);
    
    // Get Operations article titles
    const operationsTitles = await page.$$eval('h3', headings => 
      headings.map(h => h.textContent.trim())
    );
    console.log('Operations articles:');
    operationsTitles.forEach((title, index) => {
      console.log(`  ${index + 1}. ${title}`);
    });
    
    // Summary
    console.log('\\n📊 Test Summary:');
    console.log(`Total articles: ${totalArticles}`);
    console.log(`New post visible: ${newPostExists ? 'YES' : 'NO'}`);
    console.log(`Operations articles: ${operationsArticles}`);
    
    return {
      totalArticles,
      newPostExists,
      operationsArticles,
      articleTitles
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return null;
  } finally {
    await browser.close();
  }
}

testBlogAfterRestart();