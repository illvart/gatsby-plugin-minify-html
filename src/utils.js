const isObject = (val) => val !== null && typeof val === 'object';
const isBoolean = (val) => val === false || val === true;

const deepMerge = (target = {}, source = {}) => {
  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (!target[key] || !isObject(target[key])) {
        target[key] = source[key];
      }
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, {[key]: source[key]});
    }
  });
  return target;
};

module.exports = {isObject, isBoolean, deepMerge};
