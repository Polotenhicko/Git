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

// теперь await работает
async function* generateSeq(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    yield i;
  }
}

(async () => {
  const generator = generateSeq(85, 90);
  for await (let value of generator) {
    console.log(value); // 85...90
  }
})();

try {
  // ошибка, потому что не реализует Symbol.iterator
  // но реализует Symbol.asyncIterator
  for (const item of generateSeq(1, 3)) {
    console.log(item);
  }
} catch (e) {
  console.error(e);
}

// значит генераторы просто реализуют эти символы
console.log(!!generateSeq()[Symbol.asyncIterator]); // true
console.log(!!generateSequence()[Symbol.iterator]); // true

// next возвращает промис
console.log(generateSeq().next() instanceof Promise); // true

console.log('sync');

// пример перебираемого объекта с генератором
range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // сокращение для [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

for (const value of range) {
  console.log(value); // 1, потом 2, потом 3, потом 4, потом 5
}

// сделаем его асинхронным

let range2 = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() {
    for (let value = this.from; value <= this.to; value++) {
      await new Promise((r) => setTimeout(r, 1e3));
      yield value;
    }
  },
};

// будет бесконечная итерация
// for (const item of range2) {
// Symbol.iterator вернёт промис, т.к. есть оператор async, а у промиса .value = undefined и будет бесконечно крутить
//  console.log(item)
// }

(async () => {
  for await (const value of range2) {
    console.log(value);
  }
})();

// создадим функцию fetchCommits(repo) для получения коммитов

async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      headers: { 'User-agent': 'Our script' }, // заголовки
    });

    const body = await response.json(); // массив коммитов

    // ссылка на след страницу в заголовке
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    // выводим коммиты
    for (const commit of body) {
      yield commit;
    }
  }
}

(async () => {
  let count = 0;
  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
    console.log(commit.author.login);

    if (++count == 100) {
      // остановимся на 100 коммитах
      break;
    }
  }
})();
