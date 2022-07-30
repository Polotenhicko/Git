const oldFabric = require('./oldFabric.js');
const tailFabric = require('./tailFabric.js');
const workerFabric = require('./index.js');

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

const arrObj = {
  arr: [
    1,
    [2],
    {
      test: 1,
      arr: [[1]],
    },
  ],
};

oldFabric(emptyObj);
oldFabric(fullObj);
oldFabric(negativeObj);
oldFabric(deepObj);
oldFabric(arrObj);

test('empty object old', () => {
  expect(emptyObj.getAllSum).toBe(0);
});

test('full object old', () => {
  expect(fullObj.getAllSum).toBe(1 + 2 + 3 + 123 + 5 + 1 + 2 + 3);
});

test('negative object old', () => {
  expect(negativeObj.getAllSum).toBe(0);
});

test('deep object old', () => {
  expect(deepObj.getAllSum).toBe(28);
});

test('arr object old', () => {
  expect(arrObj.getAllSum).toBe(5);
});

let tailEmptyObj = Object.assign({}, emptyObj);
let tailFullObj = Object.assign({}, fullObj);
let tailNegativeObj = Object.assign({}, negativeObj);
let tailDeepObj = Object.assign({}, deepObj);
let tailArrObj = Object.assign({}, arrObj);

tailFabric(tailEmptyObj);
tailFabric(tailFullObj);
tailFabric(tailNegativeObj);
tailFabric(tailDeepObj);
tailFabric(tailArrObj);

test('empty object tail', () => {
  expect(tailEmptyObj.getAllSum).toBe(0);
});

test('full object tail', () => {
  expect(tailFullObj.getAllSum).toBe(1 + 2 + 3 + 123 + 5 + 1 + 2 + 3);
});

test('negative object tail', () => {
  expect(tailNegativeObj.getAllSum).toBe(0);
});

test('deep object tail', () => {
  expect(tailDeepObj.getAllSum).toBe(28);
});

test('arr object tail', () => {
  expect(tailArrObj.getAllSum).toBe(5);
});

let workerEmptyObj = Object.assign({}, emptyObj);
let workerFullObj = Object.assign({}, fullObj);
let workerNegativeObj = Object.assign({}, negativeObj);
let workerDeepObj = Object.assign({}, deepObj);
let workerArrObj = Object.assign({}, arrObj);

workerFabric(workerEmptyObj);
workerFabric(workerFullObj);
workerFabric(workerNegativeObj);
workerFabric(workerDeepObj);
workerFabric(workerArrObj);

test('empty object worker', () => {
  expect(workerEmptyObj.getAllSum).toBe(0);
});

test('full object worker', () => {
  expect(workerFullObj.getAllSum).toBe(1 + 2 + 3 + 123 + 5 + 1 + 2 + 3);
});

test('negative object worker', () => {
  expect(workerNegativeObj.getAllSum).toBe(0);
});

test('deep object worker', () => {
  expect(workerDeepObj.getAllSum).toBe(28);
});

test('arr object worker', () => {
  expect(workerArrObj.getAllSum).toBe(5);
});
