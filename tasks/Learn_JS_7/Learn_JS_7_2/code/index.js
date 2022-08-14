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
    isSumStr: true,
    isSumDeepObj: true,
    isSumArr: true,
  }
) {
  Object.defineProperty(obj, 'getAllSum', {
    get() {
      function getAllSum(object) {
        let sum = 0;
        const getValue = (item) => {
          // Object, Array, не null
          if (typeof item == 'object' && item) {
            return !isNaN(item.getAllSum) ? +item.getAllSum : getAllSum(item);
          }
          // вся остальная нечисть, null, string, number
          return !isNaN(item) ? +item : 0;
        };

        for (const key in object) {
          const item = object[key];
          if (!options.isSumStr && typeof item == 'string') continue;
          if (!options.isSumDeepObj && !Array.isArray(item) && typeof item == 'object') continue;
          if (!options.isSumArr && Array.isArray(item)) continue;

          // array
          if (Array.isArray(item)) {
            sum += item.reduce((acc, item) => acc + getValue(item), 0);
            // чтобы он не проитерировал массив 2 раза
            continue;
          }

          // здесь может закинуться что угодно
          sum += getValue(item);
        }
        return sum;
      }
      return getAllSum(obj);
    },
    configurable: true,
  });
}

module.exports = fabricDescriptors;

// дефолт значения

// module.exports = fabricDescriptors;

// fabricDescriptors(test);
// fabricDescriptors(test2);
// fabricDescriptors(test3);
// fabricDescriptors(test4);

// console.log(test.getAllSum); // 11
// console.log(test2.getAllSum); // 11
// console.log(test3.getAllSum); // 0
// console.log(test4.getAllSum); // -20
