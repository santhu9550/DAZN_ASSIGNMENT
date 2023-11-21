/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
let cache: any = {};

const setCache = (key: string, data: any) => {
  return (cache[key] = data);
};

const getCache = (key: string) => (key in cache ? cache[key] : null);

const clearCache = () => {
  cache = {};
};

export { setCache, getCache, clearCache };
