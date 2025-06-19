const puppeteer = require('puppeteer');
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
const NEXT_URL = 'http://localhost:3003';
const CMS_URL = 'http://localhost:3004';
const ADMIN_EMAIL = 'admin@dadson.com';
const ADMIN_PASSWORD = 'admin123';
const CMS_STARTUP_WAIT_TIME = 15000; // 15 seconds
const NEXT_STARTUP_WAIT_TIME = 10000; // 10 seconds

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Log with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// Execute a shell command and return output
function runCommand(command) {
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Check if a server is up by making an HTTP request
async function isServerUp(url) {
  return new Promise(resolve => {
    log(`Checking if server at ${url} is up...`);
    const request = http.get(url, response => {
      log(`Got response from ${url}: ${response.statusCode}`);
      resolve(response.statusCode >= 200 && response.statusCode < 500);
    }).on('error', error => {
      log(`Error connecting to ${url}: ${error.message}`);
      resolve(false);
    });
    
    request.setTimeout(3000, () => {
      request.abort();
      log(`Timeout when connecting to ${url}`);
      resolve(false);
    });
  });
}

// Wait for server to be ready with multiple checks
async function waitForServer(url, maxAttempts = 10, intervalMs = 2000) {
  log(`Waiting for server at ${url} to be ready...`);
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const isUp = await isServerUp(url);
    if (isUp) {
      log(`Server at ${url} is up and running!`);
      return true;
    }
    
    attempts++;
    log(`Server at ${url} not ready yet (attempt ${attempts}/${maxAttempts}), waiting...`);
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  
  log(`Gave up waiting for server at ${url} after ${maxAttempts} attempts`);
  return false;
}

// Start servers
async function startServers() {
  log('Checking MongoDB status...');
  const mongoStatus = runCommand('brew services list | grep mongodb');
  
  if (!mongoStatus.output || !mongoStatus.output.includes('started')) {
    log('Starting MongoDB...');
    runCommand('brew services start mongodb/brew/mongodb-community');
    // Wait for MongoDB to start
    await new Promise(resolve => setTimeout(resolve, 3000));
  } else {
    log('MongoDB is already running');
  }

  // Start PayloadCMS in background
  log('Starting PayloadCMS server...');
  const cmsProcess = exec('cd payload/dadson-blog && npm run dev:simple -- --port 3004');
  
  // Capture CMS process output for debugging
  cmsProcess.stdout.on('data', (data) => {
    log(`CMS stdout: ${data.toString().trim()}`);
  });
  
  cmsProcess.stderr.on('data', (data) => {
    log(`CMS stderr: ${data.toString().trim()}`);
  });
  
  // Give more time for the CMS to start
  log(`Waiting ${CMS_STARTUP_WAIT_TIME/1000} seconds for PayloadCMS to initialize...`);
  await new Promise(resolve => setTimeout(resolve, CMS_STARTUP_WAIT_TIME));
  
  // Check if CMS is actually running
  const cmsIsUp = await waitForServer(`${CMS_URL}/admin`);
  if (!cmsIsUp) {
    log('WARNING: PayloadCMS server might not be running properly');
  }

  // Start Next.js in background
  log('Starting Next.js server...');
  const nextProcess = exec('NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3004 npm run dev -- -p 3003');
  
  // Capture Next.js process output for debugging
  nextProcess.stdout.on('data', (data) => {
    log(`Next.js stdout: ${data.toString().trim()}`);
  });
  
  nextProcess.stderr.on('data', (data) => {
    log(`Next.js stderr: ${data.toString().trim()}`);
  });
  
  // Wait for Next.js to start
  log(`Waiting ${NEXT_STARTUP_WAIT_TIME/1000} seconds for Next.js to initialize...`);
  await new Promise(resolve => setTimeout(resolve, NEXT_STARTUP_WAIT_TIME));
  
  // Check if Next.js is actually running
  const nextIsUp = await waitForServer(NEXT_URL);
  if (!nextIsUp) {
    log('WARNING: Next.js server might not be running properly');
  }
  
  return { cmsProcess, nextProcess, cmsIsUp, nextIsUp };
}

// Take a screenshot
async function takeScreenshot(page, name) {
  const screenshotPath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  log(`Screenshot saved: ${screenshotPath}`);
  return screenshotPath;
}

// Main test function
async function runTests() {
  log('Starting blog functionality test...');
  const results = {
    servers: { started: false, cmsRunning: false, nextRunning: false },
    nextjs: { accessible: false },
    cms: { accessible: false, loginSuccessful: false },
    blog: {
      listAccessible: false,
      articleCreated: false,
      articleVisible: false
    },
    screenshots: [],
    errorDetails: []
  };
  
  let browser;
  let servers;
  
  try {
    // Start servers
    log('Starting servers...');
    servers = await startServers();
    results.servers.started = true;
    results.servers.cmsRunning = servers.cmsIsUp;
    results.servers.nextRunning = servers.nextIsUp;
    
    // Launch browser
    log('Launching browser...');
    browser = await puppeteer.launch({ 
      headless: false, 
      defaultViewport: { width: 1280, height: 800 },
      args: ['--window-size=1280,800'],
      timeout: 60000
    });
    
    // Test Next.js frontend
    if (servers.nextIsUp) {
      log('Testing Next.js frontend...');
      const frontendPage = await browser.newPage();
      try {
        await frontendPage.goto(NEXT_URL, { waitUntil: 'networkidle2', timeout: 60000 });
        results.nextjs.accessible = true;
        results.screenshots.push(await takeScreenshot(frontendPage, '01-nextjs-home'));
        
        // Check if blog page exists
        log('Testing blog page...');
        await frontendPage.goto(`${NEXT_URL}/blog`, { waitUntil: 'networkidle2', timeout: 60000 });
        results.blog.listAccessible = await frontendPage.evaluate(() => {
          return !document.body.innerText.includes('404') && 
                !document.body.innerText.includes('Error');
        });
        results.screenshots.push(await takeScreenshot(frontendPage, '02-blog-page'));
      } catch (error) {
        log(`Error testing Next.js: ${error.message}`);
        results.errorDetails.push(`Next.js Error: ${error.message}`);
      }
    }
    
    // Test PayloadCMS admin
    if (servers.cmsIsUp) {
      log('Testing PayloadCMS admin...');
      const cmsPage = await browser.newPage();
      try {
        await cmsPage.goto(`${CMS_URL}/admin`, { waitUntil: 'networkidle2', timeout: 60000 });
        results.cms.accessible = true;
        results.screenshots.push(await takeScreenshot(cmsPage, '03-cms-login'));
        
        // Login to admin panel
        log('Logging into admin panel...');
        await cmsPage.type('input[type="email"]', ADMIN_EMAIL);
        await cmsPage.type('input[type="password"]', ADMIN_PASSWORD);
        await Promise.all([
          cmsPage.click('button[type="submit"]'),
          cmsPage.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 })
        ]);
        
        results.cms.loginSuccessful = await cmsPage.evaluate(() => {
          return !document.body.innerText.includes('Invalid') && 
                !document.body.innerText.includes('Error');
        });
        results.screenshots.push(await takeScreenshot(cmsPage, '04-cms-dashboard'));
        
        if (results.cms.loginSuccessful) {
          // Create a test article
          log('Creating test article...');
          
          // Navigate to Articles section
          await cmsPage.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a'));
            const articleLink = links.find(link => link.innerText.includes('Articles'));
            if (articleLink) articleLink.click();
          });
          
          await cmsPage.waitForTimeout(2000);
          results.screenshots.push(await takeScreenshot(cmsPage, '05-articles-list'));
          
          // Click Create New button
          await cmsPage.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const createButton = buttons.find(button => 
              button.innerText.includes('Create New') || 
              button.innerText.includes('Create Article')
            );
            if (createButton) createButton.click();
          });
          
          await cmsPage.waitForTimeout(3000);
          results.screenshots.push(await takeScreenshot(cmsPage, '06-create-article-form'));
          
          // Fill article form
          const testTitle = `Test Article ${new Date().toISOString().split('T')[0]}`;
          
          // Fill title
          await cmsPage.evaluate((title) => {
            const titleInput = document.querySelector('input[id*="title"]');
            if (titleInput) titleInput.value = title;
            const event = new Event('input', { bubbles: true });
            titleInput.dispatchEvent(event);
          }, testTitle);
          
          // Fill slug
          const testSlug = testTitle.toLowerCase().replace(/\s+/g, '-');
          await cmsPage.evaluate((slug) => {
            const slugInput = document.querySelector('input[id*="slug"]');
            if (slugInput) slugInput.value = slug;
            const event = new Event('input', { bubbles: true });
            slugInput.dispatchEvent(event);
          }, testSlug);
          
          // Fill content (this part depends on the CMS editor)
          await cmsPage.evaluate(() => {
            // This assumes there's a rich text editor
            const editor = document.querySelector('[contenteditable="true"]');
            if (editor) {
              editor.innerHTML = '<p>This is a test article created by the automated testing script.</p>';
              const event = new InputEvent('input', { bubbles: true });
              editor.dispatchEvent(event);
            }
          });
          
          // Select category (if available)
          await cmsPage.evaluate(() => {
            const categorySelect = document.querySelector('select[id*="category"]');
            if (categorySelect && categorySelect.options.length > 0) {
              categorySelect.selectedIndex = 1; // Select first category
              const event = new Event('change', { bubbles: true });
              categorySelect.dispatchEvent(event);
            }
          });
          
          await cmsPage.waitForTimeout(1000);
          results.screenshots.push(await takeScreenshot(cmsPage, '07-filled-article-form'));
          
          // Save article
          await cmsPage.evaluate(() => {
            const saveButton = document.querySelector('button[type="submit"]');
            if (saveButton) saveButton.click();
          });
          
          await cmsPage.waitForTimeout(5000);
          results.screenshots.push(await takeScreenshot(cmsPage, '08-article-saved'));
          
          // Check if article was created
          results.blog.articleCreated = await cmsPage.evaluate(() => {
            return !document.body.innerText.includes('Error') &&
                  document.body.innerText.includes('successfully');
          });
          
          // Check if article appears on blog page
          log('Checking if article appears on blog page...');
          await frontendPage.reload({ waitUntil: 'networkidle2', timeout: 60000 });
          await frontendPage.waitForTimeout(2000);
          
          results.blog.articleVisible = await frontendPage.evaluate((title) => {
            return document.body.innerText.includes(title);
          }, testTitle);
          
          results.screenshots.push(await takeScreenshot(frontendPage, '09-blog-with-new-article'));
        }
      } catch (error) {
        log(`Error testing PayloadCMS: ${error.message}`);
        results.errorDetails.push(`PayloadCMS Error: ${error.message}`);
      }
    } else {
      results.errorDetails.push('PayloadCMS server is not running');
    }
    
  } catch (error) {
    log(`Error during testing: ${error.message}`);
    console.error(error);
    results.errorDetails.push(`General Error: ${error.message}`);
  } finally {
    // Generate report
    const report = generateReport(results);
    const reportPath = path.join(__dirname, 'blog-test-report.md');
    fs.writeFileSync(reportPath, report);
    log(`Report generated at ${reportPath}`);
    
    // Cleanup
    if (browser) await browser.close();
    
    // Stop servers
    if (servers) {
      if (servers.cmsProcess) {
        log('Stopping PayloadCMS server...');
        servers.cmsProcess.kill();
      }
      if (servers.nextProcess) {
        log('Stopping Next.js server...');
        servers.nextProcess.kill();
      }
    }
  }
}

// Generate report from results
function generateReport(results) {
  const timestamp = new Date().toISOString();
  
  let report = `# Dadson Blog Functionality Test Report\n\n`;
  report += `**Timestamp:** ${timestamp}\n\n`;
  
  report += `## Server Status\n\n`;
  report += `- **Servers started:** ${results.servers.started ? '✅ Yes' : '❌ No'}\n`;
  report += `- **PayloadCMS running:** ${results.servers.cmsRunning ? '✅ Yes' : '❌ No'}\n`;
  report += `- **Next.js running:** ${results.servers.nextRunning ? '✅ Yes' : '❌ No'}\n`;
  report += `- **Next.js accessible:** ${results.nextjs.accessible ? '✅ Yes' : '❌ No'}\n`;
  report += `- **PayloadCMS accessible:** ${results.cms.accessible ? '✅ Yes' : '❌ No'}\n\n`;
  
  report += `## CMS Admin\n\n`;
  report += `- **Login successful:** ${results.cms.loginSuccessful ? '✅ Yes' : '❌ No'}\n\n`;
  
  report += `## Blog Functionality\n\n`;
  report += `- **Blog page accessible:** ${results.blog.listAccessible ? '✅ Yes' : '❌ No'}\n`;
  report += `- **Article creation:** ${results.blog.articleCreated ? '✅ Success' : '❌ Failed'}\n`;
  report += `- **Article visible on blog:** ${results.blog.articleVisible ? '✅ Yes' : '❌ No'}\n\n`;
  
  if (results.errorDetails.length > 0) {
    report += `## Error Details\n\n`;
    results.errorDetails.forEach(error => {
      report += `- ${error}\n`;
    });
    report += '\n';
  }
  
  report += `## Screenshots\n\n`;
  results.screenshots.forEach((screenshot, index) => {
    const filename = path.basename(screenshot);
    report += `### ${filename.replace('.png', '').replace(/^\d+-/, '')}\n\n`;
    report += `![${filename}](${screenshot})\n\n`;
  });
  
  report += `## Conclusion\n\n`;
  const success = results.blog.articleCreated && results.blog.articleVisible;
  report += success 
    ? '✅ **Blog functionality is working correctly.**\n' 
    : '❌ **Issues detected with blog functionality. Please check the details above.**\n';
  
  report += `\n## How to Start the Blog Servers\n\n`;
  report += `To start the blog servers, follow these steps:\n\n`;
  report += `1. Start MongoDB if it's not running:\n   \`\`\`bash\n   brew services start mongodb/brew/mongodb-community\n   \`\`\`\n\n`;
  report += `2. Start PayloadCMS:\n   \`\`\`bash\n   cd payload/dadson-blog\n   npm run dev:simple -- --port 3004\n   \`\`\`\n\n`;
  report += `3. In a separate terminal, start the Next.js app:\n   \`\`\`bash\n   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3004 npm run dev -- -p 3003\n   \`\`\`\n\n`;
  report += `Alternatively, use the provided script to start both servers:\n\`\`\`bash\n./start-blog-stack.sh\n\`\`\`\n`;
  
  return report;
}

// Run the tests
runTests().catch(console.error); 