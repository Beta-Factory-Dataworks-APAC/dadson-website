import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrEditor } from '../access/roles.js';
import formatSlug from '../hooks/formatSlug.js';
// import richText from '../fields/richText.js'; // Defined later

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'status'],
    preview: (doc) => {
      // Ensure NEXT_PUBLIC_SITE_URL is defined in your environment
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'; // Fallback to common dev port
      return `${siteUrl}/blog/${doc.slug}`;
    },
  },
  access: {
    read: () => true, // Public read access
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    // Hook needs to be defined in ../hooks/formatSlug.ts
    // beforeChange: [formatSlug], // Uncomment when hook is defined
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of your article (65-75 characters ideal)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Unique URL-friendly identifier',
      },
      hooks: {
        // beforeValidate: [formatSlug], // Uncomment when hook is defined
      },
      index: true, // Add index for faster lookups
      unique: true,
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief summary (150-160 characters ideal)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Featured image (1200x630px ideal)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false, 
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags', // Renamed from category to tags in plan description, assuming this is correct
      label: 'Tags',
      type: 'relationship',
      relationTo: 'categories', // Still relates to categories, acting as tags
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      // Automatically set the author to the logged-in user on create
      // defaultValue: ({ user }) => user.id,
      // required: true, // Consider making required if always needed
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      required: true,
    },
    {
      name: 'content',
      type: 'richText', // Use the built-in richText field
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'seo',
      label: 'SEO Settings',
      type: 'group',
      admin: {
        description: 'SEO settings for this article',
      },
      fields: [
        {
          name: 'title',
          label: 'SEO Title',
          type: 'text',
          admin: {
            description: 'Custom SEO title (defaults to post title)',
          },
        },
        {
          name: 'description',
          label: 'SEO Description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description (150-160 characters ideal)',
          },
        },
        {
          name: 'ogImage',
          label: 'Social Sharing Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Custom social sharing image (defaults to featured image)',
          },
        },
      ],
    },
  ],
}; 