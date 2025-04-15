// This file is kept as a placeholder to prevent build errors
// We're now using Payload CMS instead of Sanity

// Dummy implementation
const defineConfig = (config: any) => config;

// Export a dummy config object that doesn't require actual Sanity imports
const dummyConfig = defineConfig({
  name: 'disabled',
  title: 'Sanity Studio Disabled',
  projectId: '',
  dataset: '',
  plugins: [],
  schema: {
    types: [],
  },
});

export default dummyConfig; 