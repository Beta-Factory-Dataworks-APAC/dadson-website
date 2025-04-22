declare const deepMerge: <T extends object = object, S extends object = T>(target: T, source: S) => T & S;
export default deepMerge;
