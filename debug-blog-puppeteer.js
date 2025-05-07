const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to create directory if it doesn't exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper function for introducing delays
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Directory to save all screenshots and logs
const DEBUG_DIR = path.join(__dirname, 'debug-blog-results');
ensureDir(DEBUG_DIR);

// Create a debug log file
const logFile = path.join(DEBUG_DIR, 'debug-log.md');
fs.writeFileSync(logFile, '# Blog Module Debugging Log\n\n', 'utf8');

// Function to append to the log
function log(message, isHeading = false) {
  console.log(message);
  
  // Format for markdown
  const formattedMessage = isHeading ? `\n## ${message}\n\n` : `${message}\n`;
  fs.appendFileSync(logFile, formattedMessage, 'utf8');
}

// Function to log with screenshot reference
function logWithScreenshot(message, screenshotPath) {
  const relativePath = path.relative(DEBUG_DIR, screenshotPath);
  const mdMessage = `${message}\n\n![Screenshot](${relativePath})\n\n`;
  fs.appendFileSync(logFile, mdMessage, 'utf8');
}

async function runCommand(command) {
  log(`Running command: \`${command}\``, false);
  try {
    const output = execSync(command).toString();
    log("Command output:", false);
    log("```\n" + output + "\n```", false);
    return output;
  } catch (error) {
    log("Command failed:", false);
    log("```\n" + error.toString() + "\n```", false);
    return error.toString();
  }
}

async function debugBlogModule() {
  log("Blog Module Debugging Process", true);
  let browser;
  
  try {
    log("Starting debugging process at " + new Date().toISOString(), false);
    
    // 1. Check for port conflicts
    log("1. Initial Port Verification", true);
    
    // Check which processes are using the relevant ports
    await runCommand("lsof -i :3000");
    await runCommand("lsof -i :3001");
    
    // 2. MongoDB and PayloadCMS Verification
    log("2. MongoDB and PayloadCMS Verification", true);
    
    // Check if MongoDB is running
    const mongoOutput = await runCommand("brew services list | grep mongodb");
    
    if (!mongoOutput.includes("started")) {
      log("MongoDB is not running. Starting it now...", false);
      await runCommand("brew services start mongodb/brew/mongodb-community");
    }
    
    // Launch browser for visual checks
    browser = await puppeteer.launch({ 
      headless: false,
      args: ['--window-size=1920,1080']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // 3. API Connection Testing
    log("3. API Connection Testing", true);
    
    // Test PayloadCMS API directly
    try {
      await page.goto('http://localhost:3001/api/articles', { waitUntil: 'networkidle0', timeout: 10000 });
      const screenshotPath = path.join(DEBUG_DIR, 'payload-articles-api.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logWithScreenshot("PayloadCMS Articles API test", screenshotPath);
      
      // Capture the response for analysis
      const responseText = await page.evaluate(() => document.body.innerText);
      log("API Response:\n```json\n" + responseText.substring(0, 500) + "...\n```", false);
    } catch (error) {
      log(`Could not connect to PayloadCMS API: ${error.message}`, false);
    }
    
    // Test mock API
    try {
      await page.goto('http://localhost:3000/api/blog', { waitUntil: 'networkidle0', timeout: 10000 });
      const screenshotPath = path.join(DEBUG_DIR, 'nextjs-blog-api.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logWithScreenshot("Next.js Blog API test", screenshotPath);
      
      // Capture the response for analysis
      const responseText = await page.evaluate(() => document.body.innerText);
      log("API Response:\n```json\n" + responseText.substring(0, 500) + "...\n```", false);
    } catch (error) {
      log(`Could not connect to Next.js Blog API: ${error.message}`, false);
    }
    
    // Test categories endpoint
    try {
      await page.goto('http://localhost:3001/api/categories', { waitUntil: 'networkidle0', timeout: 10000 });
      const screenshotPath = path.join(DEBUG_DIR, 'payload-categories-api.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logWithScreenshot("PayloadCMS Categories API test", screenshotPath);
    } catch (error) {
      log(`Could not connect to PayloadCMS Categories API: ${error.message}`, false);
    }
    
    try {
      await page.goto('http://localhost:3000/api/blog/categories', { waitUntil: 'networkidle0', timeout: 10000 });
      const screenshotPath = path.join(DEBUG_DIR, 'nextjs-blog-categories-api.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logWithScreenshot("Next.js Blog Categories API test", screenshotPath);
    } catch (error) {
      log(`Could not connect to Next.js Blog Categories API: ${error.message}`, false);
    }
    
    // 4. Frontend Visual Testing
    log("4. Frontend Visual Testing", true);
    
    // Test Next.js blog page
    try {
      await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle0', timeout: 10000 });
      const screenshotPath = path.join(DEBUG_DIR, 'nextjs-blog-page.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logWithScreenshot("Next.js Blog Page", screenshotPath);
      
      // Capture network requests
      const requests = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter(entry => entry.name.includes('/api/'))
          .map(entry => ({ url: entry.name, duration: entry.duration }));
      });
      
      log("Network Requests:", false);
      log("```json\n" + JSON.stringify(requests, null, 2) + "\n```", false);
    } catch (error) {
      log(`Could not load Next.js Blog Page: ${error.message}`, false);
    }
    
    // Test PayloadCMS admin
    try {
      await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle0', timeout: 10000 });
      const screenshotPath = path.join(DEBUG_DIR, 'payload-admin.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      logWithScreenshot("PayloadCMS Admin Page", screenshotPath);
    } catch (error) {
      log(`Could not load PayloadCMS Admin Page: ${error.message}`, false);
    }
    
    // 5. Check Environment Variables
    log("5. Environment Variables Check", true);
    
    // Check Next.js environment
    try {
      const nextEnvContent = fs.readFileSync('nextjs-env.txt', 'utf8');
      log("Next.js Environment Variables:", false);
      log("```\n" + nextEnvContent + "\n```", false);
    } catch (error) {
      log("Could not read Next.js environment variables", false);
    }
    
    // Check PayloadCMS environment
    try {
      const payloadEnvContent = fs.readFileSync('payload-env.txt', 'utf8');
      log("PayloadCMS Environment Variables:", false);
      log("```\n" + payloadEnvContent + "\n```", false);
    } catch (error) {
      log("Could not read PayloadCMS environment variables", false);
    }
    
    // 6. Create Summary
    log("6. Debugging Summary", true);
    
    // Create a summary of our findings
    log("### Observed Issues:", false);
    log("*Automatically identify issues based on debug results here*", false);
    log("1. *Fill in once identified*", false);
    
    log("### Recommendations:", false);
    log("1. *Fill in once identified*", false);
    
    log("The debugging process is complete. Check the debug-blog-results directory for screenshots and logs.", false);
    
  } catch (error) {
    log("Error during debugging process: " + error.message, false);
    console.error("Debug process failed:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the debug process
debugBlogModule(); 