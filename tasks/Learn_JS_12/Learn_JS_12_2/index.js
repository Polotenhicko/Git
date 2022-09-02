// асинхронные итераторы

// пример сихронного итератора
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const item of range) {
  console.log(item); // 1,2,3,4,5
}

// чтобы сделать объект итерируемым асинхронно:
// Использовать Symbol.asyncIterator
// next() возвращает промис
// чтобы перебрать такой объект, используется цикл for await (let item of iterable)

// из прошлого кода сделать асинхронный

range = {
  from: 1,
  to: 5,

  // for await...of вызывает этот метод один раз в самом начале
  [Symbol.asyncIterator]() {
    // ...возвращает объект-итератор и for await работает только с ним
    return {
      current: this.from,
      last: this.to,
      // next() вызывается на каждой итерации цикла
      async next() {
        // должен возвращать значение как объект {done:...,value:...}
        // можно использовать await внутри для асинхронности

        await new Promise((resolve) => setTimeout(resolve, 1e3));

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

(async () => {
  for await (const item of range) {
    console.log(item); // 1,2,3,4,5
  }
})();

// spread и forof ожидают Symbol.iterator, благодаря чему нельзя ошибиться
// и закинуть Symbol.asyncIterator

// пример с генератором

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const value of generateSequence(100, 105)) {
  console.log(value); // 100...105
}

// не можем использовать await в обычных генераторах

console.log('sync');
