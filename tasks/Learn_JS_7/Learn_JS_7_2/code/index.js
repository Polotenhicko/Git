const test = {
  value1: 1,
  value2: 2,
  value3: 3,
  obj: {
    name: '123',
    value: 5,
  },
  arr: [1, 2, 3],
};

const test2 = {};

const test3 = {
  test: -20,
  null: null,
  undefined: undefined,
};

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

fabricDescriptors(test);
fabricDescriptors(test2);
fabricDescriptors(test3);

console.log(test.getAllSum); // 140
console.log(test2.getAllSum); // 0
console.log(test3.getAllSum); // -20
