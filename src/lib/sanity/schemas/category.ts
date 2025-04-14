export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'color',
      title: 'Color',
      description: 'Color used for category indicator',
      type: 'string',
      options: {
        list: [
          { title: 'Blue (Primary)', value: '#00B4E1' },
          { title: 'Navy', value: '#03033D' },
          { title: 'Dark Gray', value: '#101B21' },
          { title: 'Light Gray', value: '#8B8991' },
        ],
      },
      initialValue: '#00B4E1',
    },
    {
      name: 'featured',
      title: 'Featured',
      description: 'Make this a featured category',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}; 