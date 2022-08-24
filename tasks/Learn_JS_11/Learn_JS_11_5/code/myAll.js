Promise.myAll = function myAll(iterator) {
  try {
    if (iterator[Symbol.iterator]) {
      const arrIterator = Array.from(iterator);
      const pArray = {
        length: arrIterator.length,
      };
      return new Promise((resolve, reject) => {
        let count = 0;
        arrIterator.forEach((promise, index) => {
          const handlerValue = (value) => {
            pArray[index] = value;
            if (count++ == arrIterator.length - 1) resolve(Array.from(pArray));
          };
          if (promise instanceof Promise) {
            promise.then((result) => {
              handlerValue(result);
            }, reject);
          } else {
            handlerValue(promise);
          }
        });
      }).catch((err) => {
        throw err;
      });
    } else {
      throw new Error('Объект без Symbol.iterator');
    }
  } catch (e) {
    Promise.reject(e).catch(console.error);
  }
};

Promise.myAll([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 3e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 1e3);
  }),
]).then(console.log, console.error); // [1, 2, 3]

Promise.myAll([
  new Promise((resolve, reject) => {
    setTimeout(() => reject(1), 3e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 1e3);
  }),
]).then(console.log, console.error); // 1 как ошибка

Promise.myAll(['a', 'b', 'c']).then(console.log, console.error); // ['a', 'b', 'c']

// пример из learnjs

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig',
];

let request = urls.map((url) => fetch(url));

Promise.all(request).then((responses) =>
  responses.forEach((response) => console.log(`${response.url}: ${response.status}`))
);

let names = ['iliakan', 'remy', 'jeresig', 'polo_КРиво'];

request = names.map((name) => fetch(`https://api.github.com/users/${name}`));

Promise.all(request)
  .then((responses) => {
    console.log('============');
    responses.forEach((response) => console.log(`${response.url}: ${response.status}`));
    return Promise.all(responses.map((item) => item.json()));
  })
  .then((responses) => {
    responses.forEach((response) => console.log(response));
  });

console.log('sync');
// Promise.all([
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(1), 3e3);
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(2), 2e3);
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(3), 1e3);
//   }),
// ]).then(console.log, console.error);

// Promise.myAll([
//   new Promise((resolve, reject) => {
//     resolve(1);
//   }),
//   new Promise((resolve, reject) => {
//     resolve(2);
//   }),
//   new Promise((resolve, reject) => {
//     resolve(3);
//   }),
// ]).then(console.log);

// Promise.myAll([
//   new Promise((resolve, reject) => {
//     setTimeout(() => reject(1), 3e3);
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(2), 2e3);
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(3), 1e3);
//   }),
// ]).then(console.log);

// Promise.myAll([
//   new Promise((resolve, reject) => {
//     resolve(1);
//   }),
//   new Promise((resolve, reject) => {
//     resolve(2);
//   }),
//   new Promise((resolve, reject) => {
//     reject(3);
//   }),
// ]).then(console.log);
