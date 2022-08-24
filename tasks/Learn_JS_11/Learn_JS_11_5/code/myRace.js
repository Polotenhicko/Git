// сделай Promise.myRace / Promise.myAll / Promise.myAllSettled по 11.5 (можешь что-то одно на выбор взять, можешь все взять)

Promise.myRace = function myRace(iterator) {
  try {
    return new Promise((resolve, reject) => {
      if (iterator[Symbol.iterator]) {
        for (const promise of iterator) {
          promise.then(resolve, reject);
        }
      } else {
        throw new Error('Объект без Symbol.iterator');
      }
    });
  } catch (e) {
    Promise.reject(e).catch(console.error);
  }
};

Promise.myRace([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 3e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 2e3);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 1e3);
  }),
]).then(console.log);

Promise.myRace([
  new Promise((resolve, reject) => {
    resolve(1);
  }),
  new Promise((resolve, reject) => {
    resolve(2);
  }),
  new Promise((resolve, reject) => {
    resolve(3);
  }),
]).then(console.log);

console.log('sync');

Promise.myRace([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка!')), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch((er) => {
  console.log(er);
  console.log('================');
}); // 1
