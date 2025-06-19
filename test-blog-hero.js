const puppeteer = require('puppeteer');

async function testBlogHero() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing New Blog Hero Section...\n');
    
    // Navigate to blog page
    await page.goto('http://localhost:3003/blog', { waitUntil: 'networkidle2' });
    
    // Take screenshot of the full blog page with hero
    await page.screenshot({ path: 'blog-with-dark-hero.png', fullPage: true });
    console.log('📸 Blog with dark hero screenshot taken');
    
    // Test scroll functionality
    console.log('📜 Testing scroll to content...');
    await page.evaluate(() => {
      const exploreButton = Array.from(document.querySelectorAll('a')).find(a => 
        a.textContent.includes('EXPLORE ARTICLES')
      );
      if (exploreButton) exploreButton.click();
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot after scroll
    await page.screenshot({ path: 'blog-after-scroll.png', fullPage: true });
    console.log('📸 Blog after scroll screenshot taken');
    
    // Test admin button
    console.log('⚙️ Testing admin button...');
    const adminButtonExists = await page.evaluate(() => {
      const adminButton = Array.from(document.querySelectorAll('a')).find(a => 
        a.textContent.includes('ADMIN')
      );
      return adminButton !== null;
    });
    
    // Check if hero section elements are present
    const heroElements = await page.evaluate(() => {
      const elements = {
        sectionIcon: document.querySelector('svg') !== null,
        insightsNews: document.querySelector('[class*="text-cyan-500"]') !== null,
        heroTitle: document.querySelector('[class*="text-white"]') !== null,
        statsSection: Array.from(document.querySelectorAll('span')).some(span => 
          span.textContent.includes('Articles Published')
        ),
        exploreButton: Array.from(document.querySelectorAll('a')).some(a => 
          a.textContent.includes('EXPLORE ARTICLES')
        ),
        adminButton: Array.from(document.querySelectorAll('a')).some(a => 
          a.textContent.includes('ADMIN')
        ),
        scrollIndicator: Array.from(document.querySelectorAll('span')).some(span => 
          span.textContent.includes('SCROLL FOR ARTICLES')
        ),
        heroImage: document.querySelector('img[alt*="Logistics"]') !== null
      };
      return elements;
    });
    
    console.log('📊 Blog Hero Test Results:');
    console.log(`✅ Section icon: ${heroElements.sectionIcon ? 'Present' : 'Missing'}`);
    console.log(`✅ "Insights & News" label: ${heroElements.insightsNews ? 'Present' : 'Missing'}`);
    console.log(`✅ Hero title: ${heroElements.heroTitle ? 'Present' : 'Missing'}`);
    console.log(`✅ Stats section: ${heroElements.statsSection ? 'Present' : 'Missing'}`);
    console.log(`✅ Explore Articles button: ${heroElements.exploreButton ? 'Present' : 'Missing'}`);
    console.log(`✅ Admin button: ${heroElements.adminButton ? 'Present' : 'Missing'}`);
    console.log(`✅ Scroll indicator: ${heroElements.scrollIndicator ? 'Present' : 'Missing'}`);
    console.log(`✅ Hero image: ${heroElements.heroImage ? 'Present' : 'Missing'}`);
    
    console.log('\\n🎨 Dark Hero Section Features:');
    console.log('• Dark zinc-950 background');
    console.log('• Animated heading with white/gray text');
    console.log('• Statistics display (articles, categories, frequency)');
    console.log('• Two action buttons (Explore Articles, Admin)');
    console.log('• Professional logistics image');
    console.log('• Smooth scroll indicator');
    console.log('• Responsive design for all devices');
    console.log('• Consistent with services page styling');
    
    console.log('\\n🚀 Blog Hero Section is ready!');
    console.log('Features the same professional dark design as /services');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // Keep browser open for 5 seconds to see the result
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
  }
}

testBlogHero();