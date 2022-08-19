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
    console.log('//////////');
    return 111;
  })
  .then((result) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(result);
    console.log('//////////');
    throw new Error('errorThen');
  })
  .then(null, (error) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(error);
    console.log('//////////');
    throw new Error('errorCatch');
  })
  .catch((error) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(error);
    console.log('//////////');
    return 'fromCatch';
  })
  .then((result) => {
    console.log('//////////');
    console.log(MyPromise.status);
    console.log(result);
    console.log('//////////');
    new MyPromise((resolve, reject) => {
      console.log(MyPromise.status);
      resolve(555);
    })
      .then((result) => {
        console.log('//////////');
        console.log(MyPromise.status);
        console.log(result);
        console.log('//////////');
        throw new Error('внутренний еррор');
      })
      .catch((error) => {
        console.log('//////////');
        console.log(MyPromise.status);
        console.log(error);
        console.log('//////////');
      });
  });

// всё ахуенно
