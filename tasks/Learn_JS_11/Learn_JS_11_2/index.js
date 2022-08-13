// синтаксис промисов

let promise = new Promise(function (resolve, reject) {
  // функция-исполнитель (executor)
});

// у объекта promise есть внутренние свойства
// state - вначале "pending" (ожидание), потом меняется на "fulfilled" (выполнено успешно) при вызове на resolve
// или "rejected" при вызове reject

// result - вначале undefined, далее меняется на value при вызове resolve(value)
// или на error при вызове reject(error)

promise = new Promise(function (resolve, reject) {
  // эта функция выполнится автоматически при вызове new Promise
  // resolve, reject встроенны в JS
  // через секунду выполнится
  setTimeout(() => {
    console.log('Выполнено через 1 сек');
    resolve('done');
  }, 1e3);
  // будет: state: 'fulfilled', result: 'done'
});

// пример с ошибкой

promise = new Promise(function (resolve, reject) {
  // спустя секунду будет ошибка
  setTimeout(() => reject(new Error('Ошибка!')), 1e3);
  // будет: state: 'rejected', result: error
});

// спокойно выполнится без колбэков
promise = new Promise(function (resolve, reject) {
  // спустя секунду будет ошибка
  setTimeout(() => console.log('без всего'), 1e3);
  // будет: state: 'rejected', result: error
});

// только 1 колбэк, остальные игнорируются
promise = new Promise(function (resolve, reject) {
  resolve('done');

  reject(new Error('…')); // игнорируется
  setTimeout(() => resolve('…')); // игнорируется
});

// resolve или reject может быть вызван сразу, когда нет асинхронщины (но я не уверен)

// свойства state и result - внутренние, мы не можем получить к ним доступ

// метод then

// синтаксис
promise.then(
  function (result) {
    // когда состояние 'fulfilled'
    // обработает успешное выполнение
  },
  function (error) {
    // когда состояние 'rejected'
    // обработает ошибку
  }
);

promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done!'), 1e3);
});

promise.then(
  (result) => console.log(result), // done
  (error) => console.log(error) // не выполнится
);

promise = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('Whoops!')), 1000);
});

// reject запустит вторую функцию, переданную в .then
promise.then(
  (result) => console.log(result), // не будет запущена
  (error) => console.error(error) // выведет "Error: Whoops!" спустя одну секунду
);

// можно передать только 1 функцию если уверены что будет успешное выполнение
// или передать первым аргументом null
// ИЛИ воспользоваться .catch

promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Ошибка!')), 1000);
});

// .catch(errorHandlingFunction)
// .catch(f) это то же самое, что promise.then(null, f)
promise.catch(console.error); // выведет "Error: Ошибка!" спустя одну секунду
// Вызов .catch(f) – это сокращённый, «укороченный» вариант .then(null, f).

// есть ещё .finally
// Вызов .finally(f) похож на .then(f, f), в том смысле,
// что f выполнится в любом случае, когда промис завершится: успешно или с ошибкой.

new Promise((resolve, reject) => setTimeout(() => resolve('ok'), 1e3))
  .finally(() => console.log('готов'))
  .then((result) => console.log(result));

// finally не имеет аргументов

// можно вызвать сначала finally, а потом then или catch
new Promise((resolve, reject) => {
  setTimeout(() => resolve('result'), 2000);
})
  .finally(() => console.log('Промис завершён'))
  .then((result) => console.log(result)); // <-- .then обработает результат

new Promise((resolve, reject) => {
  throw new Error('error');
})
  .finally(() => console.log('Промис завершён'))
  .catch((err) => console.log(err)); // <-- .catch обработает объект ошибки

// изменим старую функцию

// function loadScript(src, callback) {
//   const script = document.createElement('script');
//   script.src = src;

//   script.onload = () => callback(null, script);
//   script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

//   document.head.append(script);
// }

function loadScriptPromise(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}

// применение

promise = loadScriptPromise('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js');

promise.then(
  (script) => console.log(`${script} загружен`),
  (error) => console.error(`Ошибка: ${error.msg}`)
);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let date = Date.now();
delay(3000).then(() => console.log('выполнилось через 3 секунды', Date.now() - date));

function showCircle(cx, cy, radius) {
  let div = document.createElement('div');
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + 'px';
  div.style.top = cy + 'px';
  div.style.border = '1px solid black';
  div.className = 'circle';
  document.body.append(div);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      div.addEventListener('transitionend', function handler() {
        div.removeEventListener('transitionend', handler);
        resolve(div);
      });
    }, 1e3);
  });
}

showCircle(150, 150, 100).then((div) => {
  // после исполнения промиса
  div.classList.add('message-ball');
  div.append('Hello, world!');
});
