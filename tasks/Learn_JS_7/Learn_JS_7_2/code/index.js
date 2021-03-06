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

const test2 = {
  value1: 1,
  value2: 2,
  value3: 3,
  obj: {
    name: '123',
    value: 5,
    arr: [1, 2, 3],
  },
  arr: [1, 2, 3],
};

const test3 = {};

const test4 = {
  test: -20,
  null: null,
  undefined: undefined,
};

function fabricDescriptors(
  obj,
  options = {
    isSumStr: false,
    isSumDeepObj: true,
    isSumArr: false,
  },
  nameDesc = 'getAllSum'
) {
  Object.defineProperty(obj, nameDesc, {
    get() {
      function getAllSum(object) {
        let sum = 0;
        for (const key in object) {
          const item = object[key];
          if (!options.isSumStr && typeof item == 'string') continue;
          if (!options.isSumDeepObj && !Array.isArray(item) && typeof item == 'object') continue;
          if (!options.isSumArr && Array.isArray(item)) continue;

          // Object, не null не array
          if (typeof item == 'object' && !Array.isArray(item) && item) {
            sum += Object.getOwnPropertyDescriptor(item, nameDesc) ? item[nameDesc] : getAllSum(item);
          }

          // array
          if (Array.isArray(item)) sum += item.reduce((a, b) => (isNaN(b) ? 0 : a + +b), 0);

          // числа и строки
          if (!isNaN(item)) sum += +item;
        }
        return sum;
      }
      return getAllSum(obj);
    },
  });
}

// дефолт значения

fabricDescriptors(test);
fabricDescriptors(test2);
fabricDescriptors(test3);
fabricDescriptors(test4);

console.log(test.getAllSum); // 11
console.log(test2.getAllSum); // 11
console.log(test3.getAllSum); // 0
console.log(test4.getAllSum); // -20
