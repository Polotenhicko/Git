function fabricDescriptors(obj) {
  Object.defineProperty(obj, 'getAllSum', {
    get() {
      function getAllSum(object) {
        let sum = 0;
        for (const key in object) {
          const item = object[key];
          if (typeof item == 'object') sum += getAllSum(item);
          if (!isNaN(item)) sum += +item;
        }
        return sum;
      }
      return getAllSum(obj);
    },
  });
}

module.exports = fabricDescriptors;
