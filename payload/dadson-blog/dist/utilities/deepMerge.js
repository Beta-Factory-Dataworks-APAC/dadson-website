// Placeholder utility for deep merging objects (needed for richText field)
// Consider using a library like lodash.mergewith for a robust implementation
const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
};
const deepMerge = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            const targetValue = target[key];
            const sourceValue = source[key];
            if (isObject(targetValue) && isObject(sourceValue)) {
                output[key] = deepMerge(targetValue, sourceValue);
            }
            else {
                output[key] = sourceValue;
            }
        });
    }
    return output;
};
export default deepMerge;
