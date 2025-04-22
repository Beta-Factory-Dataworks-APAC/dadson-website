import { isAdmin, isAdminOrEditor } from '../access/roles.js';
export const Categories = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
        description: 'Organize articles into categories or use as tags.',
    },
    access: {
        read: () => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
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
            admin: {
                position: 'sidebar',
            },
            hooks: {
            // beforeValidate: [formatSlug], // Uncomment when hook is defined
            },
            index: true, // Add index for faster lookups
            unique: true,
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'parent',
            label: 'Parent Category', // Optional parent for hierarchy
            type: 'relationship',
            relationTo: 'categories',
            hasMany: false,
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
