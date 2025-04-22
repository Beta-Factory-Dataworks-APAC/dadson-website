type FormatSlugArgs = {
    value: string;
    originalDoc?: any;
    data?: any;
};
declare const formatSlug: ({ value, originalDoc, data }: FormatSlugArgs) => string;
export default formatSlug;
