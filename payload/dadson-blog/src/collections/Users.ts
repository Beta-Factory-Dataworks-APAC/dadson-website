import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/roles.js';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    description: 'Manage website administrators, editors, and contributors.',
  },
  access: {
    // Only admins can read other users
    read: isAdmin,
    // Only admins can create users
    create: isAdmin,
    // Admins can update any user, users can update their own profile (but not role)
    update: isAdmin, // Need fine-grained control for self-update
    // Only admins can delete users
    delete: isAdmin,
    // Only admins can access the user admin panel section by default
    // admin: isAdmin, // This might be too restrictive if editors need to see authors
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    // Email is added automatically by auth: true
    // Password is added automatically by auth: true
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'contributor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Contributor',
          value: 'contributor',
        },
      ],
      // Only Admins can change roles
      access: {
        update: isAdminFieldLevel,
      },
      admin: {
        description: 'Controls user permissions.',
        position: 'sidebar',
      }
    },
    {
      name: 'avatar',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      label: 'Author Bio',
      type: 'textarea',
      admin: {
        description: 'Short biography for author pages.'
      }
    },
  ],
}; 