// This file is kept as a placeholder to prevent build errors
// We're now using Payload CMS instead of Sanity

// Type definition for StructureBuilder to avoid Sanity import
interface StructureBuilder {
  list: () => any;
  document: () => any;
  view: {
    form: () => any;
  };
}

// Dummy implementation without requiring Sanity
const definePlugin = (config: any) => config;

// Dummy exports to satisfy import requirements
export const deskStructure = (S: StructureBuilder) => ({});
export const getDefaultDocumentNode = (S: StructureBuilder) => ({});
export const customDeskTool = definePlugin({
  name: 'desk-tool',
  plugins: []
}); 