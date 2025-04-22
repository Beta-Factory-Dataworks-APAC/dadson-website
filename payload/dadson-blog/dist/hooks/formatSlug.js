// Formats the value into a URL-friendly slug
const format = (val) => val
    ?.replace(/ /g, '-')
    ?.replace(/[^ء-ي٠-٩\w-]+/g, '') // Allow Arabic characters and numbers
    ?.toLowerCase()
    ?.replace(/--+/g, '-');
const formatSlug = ({ value, originalDoc, data }) => {
    // If a slug is manually entered, use that
    if (typeof value === 'string' && value.length > 0) {
        return format(value);
    }
    // Otherwise, try to format the title field
    const title = data?.title || originalDoc?.title;
    if (title) {
        return format(title);
    }
    // Fallback if no title or slug provided
    return value;
};
export default formatSlug;
