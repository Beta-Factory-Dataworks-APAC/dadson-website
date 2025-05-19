import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb'; 
import { slateEditor } from '@payloadcms/richtext-slate';
import type { CollectionConfig } from 'payload/types';

/**
 * Users Collection Configuration
 * 
 * Defines the structure and access control for user accounts in the CMS
 * Includes role-based access control (Admin, Editor, Contributor)
 */
const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => {
      return Boolean(user?.role === 'admin');
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Contributor', value: 'contributor' },
      ],
      defaultValue: 'contributor',
    },
  ],
};

/**
 * Categories Collection Configuration
 * 
 * Defines the structure for blog post categories
 * Categories are used to organize and filter blog posts
 */
const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
};

/**
 * Media Collection Configuration
 * 
 * Defines the structure for media uploads (images, files)
 * Handles file storage and metadata
 */
const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};

/**
 * Articles Collection Configuration
 * 
 * Defines the structure for blog posts
 * Includes fields for content, metadata, and relationships
 */
const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
};

/**
 * PayloadCMS Configuration
 * 
 * Main configuration for the PayloadCMS instance
 * Sets up database connection, admin panel, and collections
 */
export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Dadson Logistics',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    css: path.resolve(__dirname, './styles/admin.css'),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost/dadson-blog',
  }),
  collections: [
    Users,
    Categories,
    Media,
    Articles
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
}); 