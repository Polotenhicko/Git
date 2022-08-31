Promise.myAny = function myAny(iterator) {
  try {
    if (iterator[Symbol.iterator]) {
      const iteratorArray = Array.from(iterator);
      let countError = 0;
      return new Promise((resolve, reject) => {
        iteratorArray.forEach((promise) => {
          promise.then(resolve, () => {
            countError += 1;
            if (countError == iteratorArray.length) {
              Promise.reject(new AggregateError([], 'All Promises rejected')).catch(console.error);
            }
          });
        });
      });
    } else {
      throw new Error('Объект без Symbol.iterator');
    }
  } catch (e) {
    Promise.reject(e).catch(console.error);
  }
};

Promise.myAny([Promise.reject(1), Promise.resolve(2)]).then(console.log, console.error); // 2
Promise.myAny([Promise.reject(1), Promise.reject(2)]).then(console.log, console.error); // error
Promise.myAny([Promise.resolve('a'), Promise.resolve('b')]).then(console.log, console.error); // 'a'

Promise.myAny([
  new Promise((resolve) => {
    setTimeout(() => resolve('resolve time 1'), 1e3);
  }),
  new Promise((resolve) => {
    setTimeout(() => resolve('resolve time 2'), 2e3);
  }),
]).then(console.log, console.error); // resolve time 1

Promise.myAny([
  new Promise((resolve) => {
    setTimeout(() => resolve('resolve after error'), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(1), 1e3);
  }),
]).then(console.log, console.error); // resolve after error

Promise.myAny([
  new Promise((resolve, reject) => {
    setTimeout(() => reject('reject'), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject('reject'), 1e3);
  }),
]).then(console.log, console.error); // Error: Aggregation Error
