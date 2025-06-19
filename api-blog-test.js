/**
 * API-focused Blog Functionality Test
 * Tests the blog API endpoints to verify that content is served correctly
 */

// For Node 18+ we can use the global fetch
// For older Node versions, uncomment:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Configuration
const NEXT_PORT = process.env.NEXT_PORT || 3007; // Using the running port
const NEXT_URL = `http://localhost:${NEXT_PORT}`;

// ANSI Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Test a specific API endpoint
 */
async function testEndpoint(endpoint, description) {
  console.log(`\n${colors.blue}Testing ${description} (${endpoint})...${colors.reset}`);
  
  try {
    const response = await fetch(`${NEXT_URL}${endpoint}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`${colors.green}✓ Endpoint responded with status ${response.status}${colors.reset}`);
      
      if (data.docs && Array.isArray(data.docs)) {
        console.log(`${colors.green}✓ Found ${data.docs.length} items${colors.reset}`);
        return {
          success: true,
          data: data
        };
      } else {
        console.log(`${colors.yellow}⚠ Response has unexpected format (no docs array)${colors.reset}`);
        return {
          success: true,
          data: data,
          warning: 'Unexpected format'
        };
      }
    } else {
      console.log(`${colors.red}✗ Endpoint returned status ${response.status}${colors.reset}`);
      return {
        success: false,
        status: response.status
      };
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error testing endpoint: ${error.message}${colors.reset}`);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Validate an article object
 */
function validateArticle(article) {
  const requiredFields = ['id', 'title', 'slug', 'content', 'publishedDate'];
  const missingFields = requiredFields.filter(field => !article[field]);
  
  if (missingFields.length > 0) {
    console.log(`${colors.yellow}⚠ Article missing required fields: ${missingFields.join(', ')}${colors.reset}`);
    return false;
  }
  
  return true;
}

/**
 * Main test function
 */
async function runTests() {
  console.log(`${colors.magenta}=== Blog API Functionality Test ====${colors.reset}`);
  let allTestsPassed = true;
  
  // 1. Test blog articles endpoint
  const articlesResult = await testEndpoint('/api/blog', 'blog articles endpoint');
  
  if (articlesResult.success && articlesResult.data.docs) {
    // Validate first article
    if (articlesResult.data.docs.length > 0) {
      const firstArticle = articlesResult.data.docs[0];
      console.log(`${colors.blue}Validating first article (${firstArticle.title})...${colors.reset}`);
      
      if (validateArticle(firstArticle)) {
        console.log(`${colors.green}✓ Article structure is valid${colors.reset}`);
        
        // Display article details
        console.log(`${colors.cyan}Article details:${colors.reset}`);
        console.log(`  Title: ${firstArticle.title}`);
        console.log(`  Slug: ${firstArticle.slug}`);
        console.log(`  Author: ${firstArticle.author?.name || 'Unknown'}`);
        console.log(`  Category: ${firstArticle.category?.name || 'Unknown'}`);
        console.log(`  Published: ${new Date(firstArticle.publishedDate).toLocaleDateString()}`);
      } else {
        console.log(`${colors.red}✗ Article structure is invalid${colors.reset}`);
        allTestsPassed = false;
      }
      
      // 2. Test single article endpoint with slug
      const slug = firstArticle.slug;
      const singleArticleResult = await testEndpoint(`/api/blog?slug=${slug}`, 'single article endpoint');
      
      if (singleArticleResult.success && singleArticleResult.data.docs) {
        if (singleArticleResult.data.docs.length === 1) {
          console.log(`${colors.green}✓ Single article endpoint returned exactly one article${colors.reset}`);
          
          // Verify it's the same article
          const retrievedArticle = singleArticleResult.data.docs[0];
          if (retrievedArticle.id === firstArticle.id) {
            console.log(`${colors.green}✓ Retrieved the correct article by slug${colors.reset}`);
          } else {
            console.log(`${colors.red}✗ Retrieved a different article than expected${colors.reset}`);
            allTestsPassed = false;
          }
        } else {
          console.log(`${colors.red}✗ Single article endpoint returned ${singleArticleResult.data.docs.length} articles (expected 1)${colors.reset}`);
          allTestsPassed = false;
        }
      } else {
        allTestsPassed = false;
      }
    }
  } else {
    allTestsPassed = false;
  }
  
  // 3. Test categories endpoint
  const categoriesResult = await testEndpoint('/api/blog/categories', 'blog categories endpoint');
  
  if (categoriesResult.success && categoriesResult.data.docs) {
    // Display categories
    if (categoriesResult.data.docs.length > 0) {
      console.log(`${colors.cyan}Available categories:${colors.reset}`);
      categoriesResult.data.docs.forEach(category => {
        console.log(`  - ${category.name} (${category.slug})`);
      });
      
      // 4. Test filtering by category
      const testCategory = categoriesResult.data.docs[0];
      const categoryFilterResult = await testEndpoint(`/api/blog?category=${testCategory.slug}`, `filtering by category (${testCategory.name})`);
      
      if (categoryFilterResult.success && categoryFilterResult.data.docs) {
        console.log(`${colors.green}✓ Category filtering returned ${categoryFilterResult.data.docs.length} articles${colors.reset}`);
        
        // Verify all articles are in the correct category
        const invalidCategoryArticles = categoryFilterResult.data.docs.filter(
          article => article.category?.slug !== testCategory.slug
        );
        
        if (invalidCategoryArticles.length === 0) {
          console.log(`${colors.green}✓ All returned articles are in the correct category${colors.reset}`);
        } else {
          console.log(`${colors.red}✗ Found ${invalidCategoryArticles.length} articles in wrong category${colors.reset}`);
          allTestsPassed = false;
        }
      } else {
        allTestsPassed = false;
      }
    }
  } else {
    allTestsPassed = false;
  }
  
  // Final results
  console.log(`\n${colors.magenta}=== Test Results ====${colors.reset}`);
  if (allTestsPassed) {
    console.log(`${colors.green}✓ All blog API tests passed!${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Some blog API tests failed. See above for details.${colors.reset}`);
  }
}

// Run tests
runTests(); 