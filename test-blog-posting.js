const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Test data for a new blog post
const newBlogPost = {
  title: 'Advanced Fleet Management Solutions',
  author: 'Michael Chen',
  category: 'Operations',
  publishedDate: '2023-12-15',
  excerpt: 'Discover how modern fleet management technology can reduce costs and improve delivery efficiency in logistics operations.',
  featuredImage: 'https://images.unsplash.com/photo-1566746064867-27d21b74b4dc',
  status: 'published',
  content: `# Advanced Fleet Management Solutions

Modern logistics operations require sophisticated fleet management solutions to stay competitive and efficient.

## The Challenge

Fleet management in today's logistics landscape faces several key challenges:

- **Rising fuel costs** and operational expenses
- **Driver shortage** across the industry
- **Regulatory compliance** requirements
- **Customer expectations** for real-time tracking
- **Environmental sustainability** mandates

## Technology Solutions

### GPS Tracking and Telematics
Real-time vehicle tracking provides:
- Route optimization capabilities
- Driver behavior monitoring
- Fuel consumption analysis
- Predictive maintenance alerts

### AI-Powered Analytics
Machine learning algorithms help with:
- Demand forecasting
- Dynamic route planning
- Predictive maintenance scheduling
- Performance optimization

### Mobile Integration
Driver mobile apps enable:
- Digital proof of delivery
- Real-time communication
- Electronic logging compliance
- Navigation assistance

## Implementation Best Practices

1. **Start with pilot programs** before full rollout
2. **Train drivers thoroughly** on new technology
3. **Monitor KPIs closely** during transition
4. **Gather feedback regularly** from all stakeholders
5. **Integrate gradually** with existing systems

## ROI Expectations

Companies typically see:
- **15-25% reduction** in fuel costs
- **20-30% improvement** in delivery times
- **40-50% decrease** in maintenance costs
- **Significant improvement** in customer satisfaction

## Conclusion

Advanced fleet management solutions are no longer optional in modern logistics. Companies that invest in these technologies position themselves for long-term success and sustainability.`
};

async function createNewBlogPost() {
  console.log('📝 Creating new blog post...');
  
  // Create the new blog post file
  const contentDir = path.join(__dirname, 'content', 'blog');
  const filename = `${newBlogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
  const filepath = path.join(contentDir, filename);
  
  // Ensure content/blog directory exists
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  // Create frontmatter
  const frontmatter = `---
title: "${newBlogPost.title}"
author: "${newBlogPost.author}"
category: "${newBlogPost.category}"
publishedDate: "${newBlogPost.publishedDate}"
excerpt: "${newBlogPost.excerpt}"
featuredImage: "${newBlogPost.featuredImage}"
status: "${newBlogPost.status}"
---

${newBlogPost.content}`;

  // Write the file
  fs.writeFileSync(filepath, frontmatter);
  console.log(`✅ Created blog post: ${filename}`);
  
  return filename;
}

async function testBlogWithNewPost() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  
  try {
    console.log('🧪 Testing blog with new post...\n');
    
    // Create the new blog post
    const newPostFilename = await createNewBlogPost();
    
    // Wait a moment for the file system to update
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to blog page
    await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle2' });
    
    // Take screenshot of updated blog page
    await page.screenshot({ path: 'blog-with-new-post.png', fullPage: true });
    console.log('📸 Blog page with new post screenshot taken');
    
    // Count total articles
    const totalArticles = await page.$$eval('article', cards => cards.length);
    console.log(`Total articles found: ${totalArticles}`);
    
    // Check if our new post appears
    const newPostExists = await page.evaluate((title) => {
      const headings = Array.from(document.querySelectorAll('h3'));
      return headings.some(h => h.textContent.includes(title));
    }, newBlogPost.title);
    
    console.log(`New post "${newBlogPost.title}" found: ${newPostExists ? '✅' : '❌'}`);
    
    // Test filtering by Operations category (our new post's category)
    console.log('\n🔍 Testing Operations filter with new post...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const operationsButton = buttons.find(btn => btn.textContent.trim() === 'Operations');
      if (operationsButton) operationsButton.click();
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot of filtered results
    await page.screenshot({ path: 'blog-operations-filter-with-new-post.png', fullPage: true });
    console.log('📸 Operations filter with new post screenshot taken');
    
    // Count Operations articles
    const operationsArticles = await page.$$eval('article', cards => cards.length);
    console.log(`Operations articles found: ${operationsArticles}`);
    
    // Test individual article page
    console.log('\n📄 Testing individual article page...');
    const articleSlug = newBlogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await page.goto(`http://localhost:3000/blog/${articleSlug}`, { waitUntil: 'networkidle2' });
    
    // Take screenshot of individual article
    await page.screenshot({ path: 'new-article-page.png', fullPage: true });
    console.log('📸 Individual article page screenshot taken');
    
    // Check if article content loaded
    const articleTitle = await page.$eval('h1', h1 => h1.textContent);
    const contentExists = await page.$('article') !== null;
    
    console.log(`Article title: "${articleTitle}"`);
    console.log(`Article content loaded: ${contentExists ? '✅' : '❌'}`);
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`✅ New blog post created: ${newPostFilename}`);
    console.log(`✅ Total articles in blog: ${totalArticles}`);
    console.log(`✅ New post appears in listing: ${newPostExists}`);
    console.log(`✅ Operations filter shows: ${operationsArticles} articles`);
    console.log(`✅ Individual article page works: ${contentExists}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testBlogWithNewPost();