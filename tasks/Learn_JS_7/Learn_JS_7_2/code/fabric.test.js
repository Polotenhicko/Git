const oldFabric = require('./oldFabric.js');
const tailFabric = require('./tailFabric.js');

const emptyObj = {};

const fullObj = {
  value1: 1,
  value2: 2,
  value3: 3,
  obj: {
    name: '123',
    value: 5,
  },
  arr: [1, 2, 3],
};

const negativeObj = {
  test: -20,
  text: 'asd',
  null: null,
  undefined: undefined,
  array: ['a', 'b', '0', '20'],
};

const deepObj = {
  value1: 1,
  obj: {
    name: '1',
    value: 2,
    obj: {
      name: '1',
      value: 2,
      obj: {
        name: '1',
        value: 2,
        obj: {
          name: '1',
          value: 2,
          obj: {
            name: '1',
            value: 2,
            obj: {
              name: '1',
              value: 2,
              obj: {
                name: '1',
                value: 2,
                obj: {
                  name: '1',
                  value: 2,
                  obj: {
                    name: '1',
                    value: 2,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// oldFabric(emptyObj);
// oldFabric(fullObj);
// oldFabric(negativeObj);
// oldFabric(deepObj);

tailFabric(emptyObj);
tailFabric(fullObj);
tailFabric(negativeObj);
tailFabric(deepObj);

test('empty object', () => {
  expect(emptyObj.getAllSum).toBe(0);
});

test('full object', () => {
  expect(fullObj.getAllSum).toBe(1 + 2 + 3 + 123 + 5 + 1 + 2 + 3);
});

test('negative object', () => {
  expect(negativeObj.getAllSum).toBe(0);
});

test('deep object', () => {
  expect(deepObj.getAllSum).toBe(28);
});
