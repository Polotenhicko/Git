// реализовать Promise.anyResolved - реждектимся, только если все зареджектились,
// а ресолвимся, если любой заресолвился.
// anyResolved будет отличаться от any тем, что принимает доп.аргумент - количество промисов,
// после которых ресолвится.Например, если кинуть ему 3,
// то будет ждать 3 заресолвивишихся и потом сразу сам заресолвит,
// а если 3 не получится - реджектит.Нужно сделать оптимально,
//  чтоб когда уже 100 % не хватит оставшихся промисов для ресолва, не ждать их, а сразу реджектить.

// [reject, resolve, resolve, reject, reject] // 4

Promise.anyResolved2 = function anyResolved(iterator, countWaiting = 0) {
  return new Promise((resolve, reject) => {
    const iteratorArray = Array.from(iterator);
    let countPromise = 0;
    let countResolve = 0;
    let isEnd = false;
    const countingPromise = (...value) => {
      countPromise += 1;
      if (iteratorArray.length - countPromise <= countWaiting - countResolve && !isEnd) {
        console.log(value); // чисто для отладки где реджектится
        isEnd = true;
        reject(new AggregateError([], 'Remaining Promises rejected'));
      }
    };

    iteratorArray.forEach((promise) => {
      promise.then(
        (result) => {
          if (countResolve >= countWaiting && !isEnd) {
            isEnd = true;
            resolve(result);
          }
          countResolve += 1;
          countingPromise('resolve', result);
        },
        (error) => {
          countingPromise('reject', error);
        }
      );
    });
  });
};

Promise.anyResolved = function anyResolved(iterator, countWaiting = 1) {
  return new Promise((resolve, reject) => {
    const iteratorArray = Array.from(iterator);
    // конечный массив
    const arr = [];
    let countResolve = 0;
    let countPromise = 0;
    let isEnd = false;
    // функция оптимизации
    const optimizeFunc = (...values) => {
      countPromise += 1;
      if (iteratorArray.length - countPromise < countWaiting - countResolve) {
        console.log(values);
        isEnd = true;
        reject(new AggregateError([], 'Remaining Promises rejected'));
      }
    };

    iteratorArray.forEach((promise) => {
      promise.then(
        (result) => {
          if (!isEnd) {
            countResolve += 1;
            arr.push(result);
            if (countResolve >= countWaiting) {
              isEnd = true;
              resolve(arr);
            }
            optimizeFunc('resolve', result);
          }
        },
        (error) => {
          if (!isEnd) optimizeFunc('reject', error);
        }
      );
    });
  });
};

Promise.anyResolved([Promise.reject(1), Promise.resolve(2)], 1).then(console.log, console.error); // [2]
Promise.anyResolved([Promise.reject(1), Promise.reject(2)], 1).then(console.log, console.error); // error ['reject', 2]
Promise.anyResolved([Promise.resolve('a'), Promise.reject('c'), Promise.resolve('b')], 2).then(
  console.log,
  console.error
); // ['a','b']

Promise.anyResolved([Promise.resolve('a'), Promise.reject('c'), Promise.resolve('b')], 3).then(
  console.log,
  console.error
); // error ['reject', 'c']

Promise.anyResolved(
  [
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 1e3);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 2e3);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 3e3);
    }),
  ],
  1
).then(console.log, console.error); // [1]
Promise.anyResolved(
  [
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 3e3);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(2), 2e3);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 1e3);
    }),
  ],
  2
).then(console.log, console.error); // [3, 1]

Promise.anyResolved('aaaa', 1).catch(console.error); // TypeError: promise.then is not a function

console.log('sync');
