function fabricDescriptors(obj) {
  Object.defineProperty(obj, 'getAllSum', {
    get() {
      function getAllSum(object) {
        let sum = 0;
        for (const key in object) {
          const item = object[key];
          sum += typeof item == 'object' ? getAllSum(item) : !isNaN(item) ? +item : 0;
        }
        return sum;
      }
      return getAllSum(obj);
    },
    configurable: true,
  });
}

module.exports = fabricDescriptors;
