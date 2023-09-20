function bindMethods(target) {
  const result = {};

  for (const key in target) {
    result[key] =
      typeof target[key] === 'function'
        ? target[key].bind(target)
        : target[key];
  }

  return result;
}

module.exports = {
  bindMethods,
};
