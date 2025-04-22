import { CollectionConfig } from 'payload/types';
import { isAdminOrEditor } from '../access/roles.js';
import path from 'path';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt', // Use alt text as title in admin UI
    description: 'Upload images and other media assets.',
  },
  access: {
    read: () => true, // Publicly accessible images
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'), // Store files in payload/media directory
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre', // Note: Payload uses 'center'
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'featured',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*', 'video/*', 'application/pdf'], // Allow images, videos, pdfs
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true, // Important for accessibility and SEO
      admin: {
        description: 'Describe the image for accessibility and SEO.'
      }
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'richText', // Allow rich text captioning
      admin: {
        elements: ['link'],
        leaves: ['bold', 'italic']
      }
    },
  ],
}; 