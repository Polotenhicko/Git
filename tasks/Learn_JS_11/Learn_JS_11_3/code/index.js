// Короче, у промиса нельзя просто так узнать статус (pending, fullfilled, rejected)
// Сделай так, чтобы было можно узнать

class MyPromise extends Promise {
  constructor(func) {
    MyPromise.#status = 'pending';
    super(func);
  }

  then(funcResult, funcError) {
    return super.then(
      (...args) => {
        MyPromise.#status = 'fullfilled';
        return funcResult(...args);
      },
      (...args) => {
        MyPromise.#status = 'rejected';
        return funcError(...args);
      }
    );
  }

  static #status = undefined;

  static get status() {
    return this.#status;
  }
}

new MyPromise((resolve, reject) => {
  console.log(MyPromise.status);
  resolve(1);
})
  .then((result) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(result);
    return 111;
  })
  .then((result) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(result);
    throw new Error('errorThen');
  })
  .then(null, (error) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(error);
    throw new Error('errorCatch');
  })
  .catch((error) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(error);
    return 'fromCatch';
  })
  .then((result) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(result);
  });
