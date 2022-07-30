module.exports = function tailFabricDescriptors(obj) {
  Object.defineProperty(obj, 'getAllSum', {
    get() {
      let sum = 0;
      function getAllSum(objects) {
        const arr = [];
        for (const object of objects) {
          for (const key in object) {
            const item = object[key];
            // такой кодстайл норм???
            if (typeof item == 'object') {
              arr.push(item);
            } else if (!isNaN(item)) sum += +item;
          }
        }
        return arr.length ? getAllSum(arr) : sum;
      }
      return getAllSum([obj]);
    },
    configurable: true,
  });
};
