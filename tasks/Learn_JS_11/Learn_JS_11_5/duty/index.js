// пройтись по статическим методам промиса

// Prmise.all(iterable) - всё или ничего!

Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 3e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1e3);
  }),
]).then(console.log); // [3,2,1]

// итог в порядке, в котором его отправлял!

// промисы выполняются сразу вместе
// но не паралелльно (как это вообще сделать с массивом?)
let k = 0;
Promise.all([
  new Promise((resolve, reject) => {
    console.log('параллельно', k++); // 0
    setTimeout(() => reject(new Error('ошибка в Promise.all')), 3e3);
  }),
  new Promise((resolve, reject) => {
    console.log('параллельно', k++); // 1
    setTimeout(() => resolve(2), 2e3);
  }),
  new Promise((resolve, reject) => {
    console.log('параллельно', k++); // 2
    setTimeout(() => resolve(1), 1e3);
  }),
]).then(console.log, console.error); // будет ошибка, т.к. всё или ничего

let t = 0;
Promise.all([
  new Promise((resolve, reject) => {
    reject(new Error('ошибка в Promise.all 2'));
  }),
  new Promise((resolve, reject) => {
    console.log('параллельно2', ++t);
  }),
]).then(console.log, console.error);

// выполнится код во 2 промисе, хоть и 1 сразу выдаст ошибку

// можно передевать что угодно в итерируемый объект
Promise.all([1, 2, 3]).then(console.log); // [1, 2, 3]

// Promise.allSettled

// возвращает
Promise.allSettled([
  new Promise((resolve, reject) => {
    setTimeout(() => reject('rejected'), 1e3);
  }),
  new Promise((resolve, reject) => {
    resolve(3);
  }),
  new Promise((resolve, reject) => {
    resolve(5);
  }),
]).then(console.log);

// {status: 'rejected', reason: 'rejected'}
// {status: 'fulfilled', value: 3}
// {status: 'fulfilled', value: 5}

// Promise.race(itarator)
// как гонки, нужен первый выполнившийся, не важно, ошибка или нет

Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => reject('rejected'), 1e3); // будет этот промис
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(5), 3e3);
  }),
]).then(console.log, console.error);

Promise.race([
  new Promise((resolve, reject) => {
    let foo;
  }),
  new Promise((resolve, reject) => {
    let foo;
  }),
  new Promise((resolve, reject) => {
    let foo;
  }),
]).then(console.log, console.error); // ничё не будет

// Promise.any - возвратит первый успешный промис, но если все будут отклонены, то будет ошибка

Promise.any([
  new Promise((resolve, reject) => {
    setTimeout(() => reject('rejected any'), 1e3); // будет этот промис
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('3 any'), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(5), 3e3);
  }),
]).then(console.log, console.error); // '3 any'

// если все отклонены, то будет ошибка!
Promise.any([
  new Promise((resolve, reject) => {
    setTimeout(() => reject('rejected any'), 1e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject('3 any'), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(5), 3e3);
  }),
]).then(console.log, console.log); // AggregateError: All promises were rejected
