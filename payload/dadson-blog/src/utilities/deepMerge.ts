// Placeholder utility for deep merging objects (needed for richText field)
// Consider using a library like lodash.mergewith for a robust implementation

const isObject = (item: any): item is object => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

const deepMerge = <T extends object = object, S extends object = T>(
  target: T,
  source: S,
): T & S => {
  const output = { ...target } as T & S;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const targetValue = (target as any)[key];
      const sourceValue = (source as any)[key];

      if (isObject(targetValue) && isObject(sourceValue)) {
        (output as any)[key] = deepMerge(targetValue, sourceValue);
      } else {
        (output as any)[key] = sourceValue;
      }
    });
  }

  return output;
};

export default deepMerge; 