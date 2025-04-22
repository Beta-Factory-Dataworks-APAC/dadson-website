/**
 * Deep merges two objects.
 * @param {Object} target - Target object to merge into
 * @param {Object} source - Source object to merge from
 * @returns {Object} - Merged object
 */
function deepMerge(target, source) {
  // Return source if target is not an object
  if (typeof target !== 'object' || target === null) {
    return source;
  }

  // Create a new object to avoid mutating the original
  const output = { ...target };
  
  if (typeof source === 'object' && source !== null) {
    Object.keys(source).forEach(key => {
      // If both target and source values are objects, recursively merge
      if (typeof source[key] === 'object' && 
          source[key] !== null && 
          typeof output[key] === 'object' && 
          output[key] !== null &&
          !Array.isArray(source[key]) && 
          !Array.isArray(output[key])) {
        output[key] = deepMerge(output[key], source[key]);
      } else {
        // Otherwise, simply assign the source value
        output[key] = source[key];
      }
    });
  }
  
  return output;
}

export default deepMerge; 