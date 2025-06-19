const puppeteer = require('puppeteer');

async function testBlogUI() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing Blog UI Functionality...\n');
    
    // Navigate to blog page
    await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle2' });
    
    // Test 1: Check if article links exist and are clickable
    console.log('1. Testing Article Links:');
    const articleLinks = await page.$$eval('a[href*="/blog/"]', links => 
      links.map(link => ({ href: link.href, text: link.textContent?.trim() }))
    );
    console.log(`   Found ${articleLinks.length} article links:`, articleLinks);
    
    // Test 2: Check category filter buttons
    console.log('\n2. Testing Category Filters:');
    const categoryButtons = await page.$$eval('button', buttons => 
      buttons.map(btn => btn.textContent?.trim()).filter(text => 
        ['All', 'Operations', 'Strategy', 'Sustainability'].includes(text)
      )
    );
    console.log(`   Found category filters:`, categoryButtons);
    
    // Test 3: Check Read More buttons
    console.log('\n3. Testing Read More Buttons:');
    const readMoreLinks = await page.$$eval('a', links => 
      links.filter(link => link.textContent?.includes('Read More')).map(link => ({
        href: link.href,
        text: link.textContent?.trim()
      }))
    );
    console.log(`   Found ${readMoreLinks.length} Read More buttons:`, readMoreLinks);
    
    // Test 4: Try clicking on category filter
    console.log('\n4. Testing Category Filter Click:');
    try {
      await page.click('button:nth-of-type(2)'); // Click second category button
      await page.waitForTimeout(1000);
      console.log('   ✅ Category filter click successful');
    } catch (error) {
      console.log('   ❌ Category filter click failed:', error.message);
    }
    
    // Test 5: Try clicking on a Read More link
    console.log('\n5. Testing Read More Link Click:');
    if (readMoreLinks.length > 0) {
      try {
        await page.click('a[href*="/blog/"]:first-of-type');
        await page.waitForTimeout(2000);
        const currentUrl = page.url();
        console.log(`   Current URL after click: ${currentUrl}`);
        if (currentUrl.includes('/blog/') && currentUrl !== 'http://localhost:3000/blog') {
          console.log('   ✅ Read More navigation successful');
        } else {
          console.log('   ❌ Read More navigation failed - still on blog index');
        }
      } catch (error) {
        console.log('   ❌ Read More click failed:', error.message);
      }
    } else {
      console.log('   ⚠️  No Read More links found to test');
    }
    
    // Take final screenshot
    await page.screenshot({ 
      path: 'blog-ui-test-result.png', 
      fullPage: true 
    });
    console.log('\n📸 Screenshot saved as blog-ui-test-result.png');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testBlogUI();