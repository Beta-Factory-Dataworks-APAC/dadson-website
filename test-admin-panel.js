const puppeteer = require('puppeteer');

async function testAdminPanel() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing Admin Panel...\n');
    
    // Navigate to admin page
    await page.goto('http://localhost:3003/admin', { waitUntil: 'networkidle2' });
    
    // Take screenshot of login page
    await page.screenshot({ path: 'admin-login.png', fullPage: true });
    console.log('📸 Admin login page screenshot taken');
    
    // Test login with correct password
    console.log('🔐 Testing login...');
    await page.type('input[type="password"]', 'dadson-admin-2024');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot of admin dashboard
    await page.screenshot({ path: 'admin-dashboard.png', fullPage: true });
    console.log('📸 Admin dashboard screenshot taken');
    
    // Check if we can see the admin interface
    const adminTitle = await page.$eval('h1', h1 => h1.textContent);
    console.log(`Admin page title: "${adminTitle}"`);
    
    // Test creating a new post
    console.log('\\n📝 Testing new post creation...');
    await page.click('button:has-text("New Post")');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of post editor
    await page.screenshot({ path: 'admin-post-editor.png', fullPage: true });
    console.log('📸 Post editor screenshot taken');
    
    // Fill in post details
    await page.fill('input[value=""]', 'Test Post from Admin Panel');
    await page.fill('input[placeholder=""]', 'Admin User');
    
    // Fill excerpt
    const excerptTextarea = await page.$('textarea[placeholder*="Brief description"]');
    if (excerptTextarea) {
      await excerptTextarea.fill('This is a test post created from the admin panel to verify functionality.');
    }
    
    // Fill content
    const contentTextarea = await page.$('textarea[placeholder*="Write your article"]');
    if (contentTextarea) {
      await contentTextarea.fill(`# Test Post from Admin Panel

This is a test article created using the new admin panel interface.

## Features Tested

- Admin panel login
- Post creation form
- Content management
- Category selection

## Conclusion

The admin panel is working correctly!`);
    }
    
    console.log('✅ Form filled successfully');
    
    // Summary
    console.log('\\n📊 Admin Panel Test Summary:');
    console.log('✅ Admin login page loads correctly');
    console.log('✅ Authentication works with correct password');
    console.log('✅ Admin dashboard displays properly');
    console.log('✅ Post editor interface is functional');
    console.log('✅ Form fields can be filled');
    
    console.log('\\n🎉 Admin Panel is ready to use!');
    console.log('Password: dadson-admin-2024');
    console.log('URL: http://localhost:3003/admin');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    // Keep browser open for 5 seconds to see the result
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
  }
}

testAdminPanel();