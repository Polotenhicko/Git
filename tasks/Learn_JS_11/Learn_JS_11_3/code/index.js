// Короче, у промиса нельзя просто так узнать статус (pending, fullfilled, rejected)
// Сделай так, чтобы было можно узнать

let status = undefined;

class MyPromise extends Promise {
  constructor(func) {
    MyPromise.#status = 'pending';
    super(func);
  }

  static #status = undefined;
  static get status() {
    return this.#status;
  }

  then(funcResult, funcError) {
    function myResult(...args) {
      MyPromise.#status = 'fulfilled';
      funcResult(...args);
    }

    function myError(...args) {
      MyPromise.#status = 'rejected';
      funcError(...args);
    }

    super.then(myResult, myError);
  }

  catch(funcError) {
    super.catch((...args) => {
      MyPromise.#status = 'rejected';
      funcError(...args);
    });
  }
}

new MyPromise((resolve, reject) => {
  console.log(MyPromise.status);
  resolve(123);
}).then((result) => {
  console.log('//////////');
  console.log(MyPromise.status);
  console.log(result);
});

new MyPromise((resolve, reject) => {
  console.log('-----------');
  console.log(MyPromise.status);
  reject(new Error(123));
}).then(
  (result) => {
    console.log('/////////');
    console.log(MyPromise.status);
    console.log(result);
  },
  (error) => {
    console.log('/////////');
    console.log(MyPromise.status);
    console.log(error);
  }
);

new MyPromise((resolve, reject) => {
  console.log('-----------');
  console.log(MyPromise.status);
  reject(new Error(123));
}).catch((error) => {
  console.log('/////////');
  console.log(MyPromise.status);
  console.log(error);
});
