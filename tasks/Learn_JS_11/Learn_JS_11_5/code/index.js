// сделай Promise.myRace / Promise.myAll / Promise.myAllSettled по 11.5 (можешь что-то одно на выбор взять, можешь все взять)

Promise.myRace = function myRace(iterator) {
  const result = {
    isChanged: false,
    isError: false,
    value: undefined,
  };

  const changeResult = (value, isError = false) => {
    if (!result.isChanged) {
      result.value = value;
      result.isChanged = true;
      if (isError) result.isError = true;
    }
  };

  try {
    if (iterator[Symbol.iterator]) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (const promise of iterator) {
            promise.then(
              (result1) => {
                console.log('for');
                changeResult(result1);
              },
              (error) => {
                changeResult(error, true)();
              }
            );
          }
          Promise.resolve().then(() => console.log('after'));
          resolve();
        });
      }).then(() => {
        if (result.isError) {
          throw new Error(result.value);
        } else {
          return result.value;
        }
      });
    } else {
      throw new Error('Объект без Symbol.iterator');
    }
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
]).then((r) => console.log('then after'));

// Promise.myRace([
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

console.log('sync');
