import deepMerge from '../utilities/deepMerge.js';
// Define simple link field
const link = (options = {}) => {
    // Default options
    const { overrides = {} } = options;
    const linkField = {
        name: 'link',
        type: 'group',
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        name: 'type',
                        type: 'radio',
                        options: [
                            { label: 'Internal link', value: 'internal' },
                            { label: 'Custom URL', value: 'custom' },
                        ],
                        defaultValue: 'internal',
                    },
                    {
                        name: 'label',
                        label: 'Label',
                        type: 'text',
                        required: true,
                    },
                ],
            },
            {
                name: 'doc',
                label: 'Document to link to',
                type: 'relationship',
                relationTo: 'articles',
                required: true,
                admin: {
                    condition: (_, siblingData) => siblingData?.type === 'internal',
                },
            },
            {
                name: 'url',
                label: 'Custom URL',
                type: 'text',
                required: true,
                admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                },
            },
            {
                name: 'appearance',
                type: 'select',
                defaultValue: 'primary',
                options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                ],
            },
        ],
    };
    return deepMerge(linkField, overrides);
};
export default link;
