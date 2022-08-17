// Короче, у промиса нельзя просто так узнать статус (pending, fullfilled, rejected)
// Сделай так, чтобы было можно узнать

let status = undefined;

class MyPromise extends Promise {
  constructor(func) {
    status = 'pending';
    function wrapper(resultFunc, errorFunc) {
      func(
        (...args) => {
          status = 'fulfilled';
          resultFunc(...args);
        },
        (...args) => {
          status = 'rejected';
          errorFunc(...args);
        }
      );
    }
    super(wrapper);
  }
}

// new MyPromise((resolve, reject) => {
//   console.log(status);
//   resolve(123);
// }).then((result) => {
//   console.log(status);
//   console.log(result);
// });

new MyPromise((resolve, reject) => {
  reject(new Error(123));
}).then(
  (result) => {
    console.log(status);
    console.log(result);
  },
  (error) => {
    console.log(status);
    console.log(error);
  }
);
