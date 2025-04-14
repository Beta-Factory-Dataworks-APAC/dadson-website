import { definePlugin } from 'sanity';
import { deskTool } from 'sanity/desk';
import { StructureBuilder } from 'sanity/desk';

// Define the structure
export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Articles')
        .child(
          S.documentTypeList('article')
            .title('All Articles')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('article')
            )
        ),
      S.divider(),
      S.listItem()
        .title('Categories')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('category')
            )
        ),
      S.listItem()
        .title('Authors')
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('author')
            )
        ),
    ]);

// Simpler implementation without React component to avoid TypeScript issues
export const getDefaultDocumentNode = (S: StructureBuilder) => {
  return S.document().views([
    S.view.form(),
  ]);
};

// Create a custom desk tool
export const customDeskTool = definePlugin({
  name: 'desk-tool',
  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: getDefaultDocumentNode,
    })
  ]
}); 