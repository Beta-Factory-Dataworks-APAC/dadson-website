// Simplified CallToAction block without type imports
// import link from '../fields/link.js'; // Removing link import due to circular dependency issues

export const CallToAction = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'style',
      label: 'Background Style',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark (Navy)', value: 'dark' },
        { label: 'Primary (Blue)', value: 'primary' },
      ],
      defaultValue: 'light',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonStyle',
          type: 'select',
          options: [
            { label: 'Primary (Blue)', value: 'primary' },
            { label: 'Secondary (White/Outline)', value: 'secondary' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
  ],
};

export default CallToAction; 