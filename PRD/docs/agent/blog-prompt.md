Here's the continuation of the implementation plan for the blog module and admin panel:

## 7. Sanity Studio Integration (continued)

### Target Files:
- `src/app/studio/[[...index]]/page.tsx` (Create/Update)

### Implementation Steps:
1. **Update Sanity Studio page**:
   ```tsx
   // src/app/studio/[[...index]]/page.tsx
   'use client'

   import { NextStudio } from 'next-sanity/studio'
   import config from '@/lib/sanity/sanity.config'

   export default function StudioPage() {
     return <NextStudio config={config} />
   }
   ```

2. **Create Sanity Studio layout**:
   ```tsx
   // src/app/studio/[[...index]]/layout.tsx
   export const metadata = {
     title: 'Dadson Logistics - Content Studio',
     description: 'Admin panel for managing blog content',
   }

   export default function StudioLayout({ children }) {
     return (
       <html lang="en">
         <body>{children}</body>
       </html>
     )
   }
   ```

## 8. Sanity Studio Customization

### Target Files:
- `src/lib/sanity/desk-structure.ts` (Create)
- `src/lib/sanity/sanity.config.ts` (Update)

### Implementation Steps:
1. **Create custom desk structure**:
   ```tsx
   // src/lib/sanity/desk-structure.ts
   import { StructureBuilder } from 'sanity/desk'
   
   export const getDefaultDocumentNode = (S: StructureBuilder) => {
     return S.document().views([
       S.view.form(),
       S.view.component(() => {
         return (
           <iframe
             src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/preview`}
             style={{ width: '100%', height: '100%', border: 'none' }}
           />
         )
       }).title('Preview'),
     ])
   }
   
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
       ])
   ```

2. **Update Sanity config**:
   ```typescript
   // src/lib/sanity/sanity.config.ts
   import {defineConfig} from 'sanity'
   import {deskTool} from 'sanity/desk'
   import {visionTool} from '@sanity/vision'
   import {codeInput} from '@sanity/code-input'
   import schemas from './schemas'
   import {deskStructure, getDefaultDocumentNode} from './desk-structure'

   export default defineConfig({
     name: 'dadson-logistics',
     title: 'Dadson Logistics',
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
     plugins: [
       deskTool({
         structure: deskStructure,
         defaultDocumentNode: getDefaultDocumentNode,
       }),
       visionTool(),
       codeInput(),
     ],
     schema: {
       types: schemas,
     },
     studio: {
       components: {
         // Custom components here
       }
     }
   })
   ```

## 9. Preview API Setup

### Target Files:
- `src/app/api/preview/route.ts` (Create)
- `src/app/api/exit-preview/route.ts` (Create)

### Implementation Steps:
1. **Create preview API routes**:
   ```typescript
   // src/app/api/preview/route.ts
   import { draftMode } from 'next/headers'
   import { redirect } from 'next/navigation'

   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url)
     const secret = searchParams.get('secret')
     const slug = searchParams.get('slug')
     const documentType = searchParams.get('documentType') || 'article'

     // Check the secret
     if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
       return new Response('Invalid token', { status: 401 })
     }

     // Enable draft mode
     draftMode().enable()

     // Redirect to the path based on document type
     if (documentType === 'article' && slug) {
       redirect(`/blog/${slug}`)
     }

     // Default redirect
     redirect('/blog')
   }
   ```

   ```typescript
   // src/app/api/exit-preview/route.ts
   import { draftMode } from 'next/headers'
   import { redirect } from 'next/navigation'

   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url)
     const path = searchParams.get('path') || '/blog'

     // Disable draft mode
     draftMode().disable()

     // Redirect to the path
     redirect(path)
   }
   ```

## 10. TipTap Editor Integration

### Target Files:
- `src/lib/sanity/schema/blockContent.ts` (Create)
- `src/lib/sanity/components/TipTapEditor.tsx` (Create)

### Implementation Steps:
1. **Create custom TipTap editor**:
   ```typescript
   // src/lib/sanity/components/TipTapEditor.tsx
   'use client'
   
   import React, { useCallback, useState } from 'react'
   import { useEditor, EditorContent } from '@tiptap/react'
   import StarterKit from '@tiptap/starter-kit'
   import Image from '@tiptap/extension-image'
   import Link from '@tiptap/extension-link'
   import Underline from '@tiptap/extension-underline'
   import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
   import { lowlight } from 'lowlight'

   // Define props type
   interface TipTapEditorProps {
     value: string
     onChange: (value: string) => void
   }

   const TipTapEditor: React.FC<TipTapEditorProps> = ({ value, onChange }) => {
     // Initialize editor
     const editor = useEditor({
       extensions: [
         StarterKit,
         Image,
         Link.configure({
           openOnClick: false,
         }),
         Underline,
         CodeBlockLowlight.configure({
           lowlight,
         }),
       ],
       content: value,
       onUpdate: ({ editor }) => {
         onChange(editor.getHTML())
       },
     })

     // Editor toolbar
     const Toolbar = () => {
       const setLink = useCallback(() => {
         if (!editor) return
         
         const previousUrl = editor.getAttributes('link').href
         const url = window.prompt('URL', previousUrl)
         
         if (url === null) {
           return
         }
         
         if (url === '') {
           editor.chain().focus().extendMarkRange('link').unsetLink().run()
           return
         }
         
         editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
       }, [editor])
       
       return (
         <div className="border-b p-2 flex flex-wrap gap-2">
           <button
             onClick={() => editor?.chain().focus().toggleBold().run()}
             className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-blue-100' : ''}`}
           >
             Bold
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleItalic().run()}
             className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-blue-100' : ''}`}
           >
             Italic
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleUnderline().run()}
             className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-blue-100' : ''}`}
           >
             Underline
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
             className={`p-2 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-blue-100' : ''}`}
           >
             H2
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
             className={`p-2 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-blue-100' : ''}`}
           >
             H3
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleBulletList().run()}
             className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-blue-100' : ''}`}
           >
             Bullet List
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleOrderedList().run()}
             className={`p-2 rounded ${editor?.isActive('orderedList') ? 'bg-blue-100' : ''}`}
           >
             Ordered List
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleBlockquote().run()}
             className={`p-2 rounded ${editor?.isActive('blockquote') ? 'bg-blue-100' : ''}`}
           >
             Quote
           </button>
           <button
             onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
             className={`p-2 rounded ${editor?.isActive('codeBlock') ? 'bg-blue-100' : ''}`}
           >
             Code Block
           </button>
           <button onClick={setLink} className={`p-2 rounded ${editor?.isActive('link') ? 'bg-blue-100' : ''}`}>
             Link
           </button>
         </div>
       )
     }

     return (
       <div className="border rounded">
         <Toolbar />
         <EditorContent editor={editor} className="p-4" />
       </div>
     )
   }

   export default TipTapEditor
   ```

## Potential Blockers and Solutions

### 1. Sanity.io Project Setup
**Blocker:** You need a Sanity.io account and project to proceed.
**Solution:** 
- Create an account at sanity.io
- Create a new project from the Sanity dashboard
- Install the Sanity CLI: `npm install -g @sanity/cli`
- Gather the project ID, dataset name, and API tokens
- Add these to your .env.local file

### 2. React 19 Compatibility Issues
**Blocker:** As seen in earlier errors, React 19 might have compatibility issues with some dependencies.
**Solution:**
- Use the `--legacy-peer-deps` flag when installing packages: `npm install @sanity/client next-sanity @portabletext/react @sanity/image-url --legacy-peer-deps`
- Alternatively, consider downgrading React to version 18 temporarily if issues persist

### 3. Sanity Studio Loading in Next.js 13+
**Blocker:** Sanity Studio has some specific requirements for Next.js App Router.
**Solution:**
- Ensure Sanity Studio is loaded as a client component using the 'use client' directive
- Set up a separate layout for the Studio route that doesn't include your site's navigation
- Use the NextStudio component from next-sanity for proper integration

### 4. Image Optimization with Next.js
**Blocker:** Working with Sanity images in Next.js requires proper configuration.
**Solution:**
- Use the urlForImage helper function provided
- Ensure all images use the Next.js Image component with appropriate width/height
- Add your Sanity project's domain to the next.config.js image domains

### 5. TipTap Editor Dependencies
**Blocker:** TipTap editor has multiple dependencies that need to be installed.
**Solution:**
- Install all required TipTap extensions in one command:
  ```
  npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-underline @tiptap/extension-code-block-lowlight lowlight --legacy-peer-deps
  ```

### 6. CORS Issues with Sanity API
**Blocker:** You might encounter CORS issues when fetching from Sanity.
**Solution:**
- Add your website domain to the CORS origins in your Sanity project settings
- Navigate to your Sanity project dashboard → API → CORS origins

### 7. Sanity Studio Authentication
**Blocker:** Sanity Studio needs proper authentication to prevent unauthorized access.
**Solution:**
- Set up authentication in Sanity Studio
- Configure user roles and permissions in the Sanity dashboard
- Consider adding a simple redirect to login page if not authenticated

## Implementation Order

To implement this effectively, follow this order:

1. Set up the Sanity project and environment variables
2. Implement Sanity schemas and basic client configuration
3. Create the Sanity Studio integration
4. Implement basic blog components and pages
5. Add TipTap editor integration
6. Implement preview functionality
7. Add advanced features like related articles and category filtering
8. Test and refine the implementation

This modular approach will allow you to get the blog and admin functionality up and running step by step, with each phase building on the previous one.
