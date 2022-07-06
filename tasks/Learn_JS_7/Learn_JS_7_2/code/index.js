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
    sumStr: false,
    sumDeepObj: true,
    sumArr: false,
  },
  nameDesc = 'getAllSum'
) {
  Object.defineProperty(obj, nameDesc, {
    get() {
      function getAllSum(object) {
        let sum = 0;
        for (const key in object) {
          const item = object[key];
          if (!options.sumStr && typeof item == 'string') continue;
          if (!options.sumDeepObj && item && !Array.isArray(item) && typeof item == 'object') continue;
          if (!options.sumArr && Array.isArray(item)) continue;

          if (item && Object.getOwnPropertyDescriptor(item, nameDesc)) {
            sum += item[nameDesc];
          }
          // числа и строки
          if (!isNaN(item)) sum += +item;
        }
        return sum;
      }
      return getAllSum(obj);
    },
  });
}

fabricDescriptors(test);
console.log(test.getAllSum); // 6
fabricDescriptors(test.obj);
fabricDescriptors(test2);
fabricDescriptors(test3);
fabricDescriptors(test4);

console.log(test.getAllSum); // 6 + /"128 ('123' + 5)"
console.log(test2.getAllSum); // 6
console.log(test3.getAllSum); // 0
console.log(test4.getAllSum); // -20
