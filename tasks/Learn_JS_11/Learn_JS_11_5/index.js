// в классе Promise есть 5 статических метода

// Promise.all
// запускает множество промисов параллельно

let promise = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(console.log); // [1, 2, 3]

// можно пропустить массив данных через map, которая создаёт промис для каждого элемента

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig',
];

let request = urls.map((url) => fetch(url));

Promise.all(request).then((responses) =>
  responses.forEach((response) => console.log(`${response.url}: ${response.status}`))
);

let names = ['iliakan', 'remy', 'jeresig'];

request = names.map((name) => fetch(`https://api.github.com/users/${name}`));

Promise.all(request)
  .then((responses) => {
    console.log('============');
    responses.forEach((response) => console.log(`${response.url}: ${response.status}`));
    return Promise.all(responses.map((item) => item.json()));
  })
  .then((responses) => {
    responses.forEach((response) => console.log(response));
  });

let date = new Date();
// если любой из промисов завершается с ошибкой, то вернётся ошибка
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(console.log); // Error: Ошибка!

// результаты остальных промисов игнорируются, но они выполняются

// Promise.all разрешает передавать не промисы в итерируемый объект
// но тогда он передаёт их как есть

// выведет через секунду [3,2,1]
Promise.all([3, new Promise((resolve) => setTimeout(() => resolve(2), 1e3)), 1]).then(console.log);

// не сработает
Promise.all(new Promise((resolve, reject) => setTimeout(() => resolve('Для одного'), 1000))).catch(console.log); // Error: Ошибка!

// Promise.allSettled

// let promise = Promise.allSettled(iterator)

// Promise.all подходит когда "всё или ничего"

// allSettled ждёт завершения всех промисов, в массиве будет
// {status:"fulfilled", value:результат} для успешных завершений,
// {status:"rejected", reason:ошибка} для ошибок.

// к примеру

urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url',
  'https://lalalala',
];

// закидываем промис от fetch
Promise.allSettled(urls.map((url) => fetch(url)))
  // получаем массив объектов
  .then((results) => {
    // проходимся по массиву
    results.forEach((result, num) => {
      if (result.status == 'fulfilled') {
        console.log(`${result.value.url}: ${result.value.status}`);
      }
      if (result.status == 'rejected') {
        console.log(`${urls[num]}: ${result.reason}`);
      }
    });
  });

// массив ошибки будет таким
//   [
//   {status: 'fulfilled', value: ...объект ответа...},
//   {status: 'fulfilled', value: ...объект ответа...},
//   {status: 'rejected', reason: ...объект ошибки...},
//   {status: 'rejected', reason: ...объект ошибки...}
// ]

// полифил для Promise.allSettled

if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map((p) =>
        Promise.resolve(p).then(
          (value) => ({
            status: 'fulfilled',
            value: value,
          }),
          (error) => ({
            status: 'rejected',
            reason: error,
          })
        )
      )
    );
  };
}

// ошибка, не массив не глотает
Promise.allSettled(new Promise((resolve, reject) => setTimeout(() => resolve('Для одного'), 1000))).catch(
  console.log
); // Error: Ошибка!

// Promise.race - похож на Promise.all, но ждёт только первый выполненный промис из которого берёт результат (или ошибку)

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('1 Ошибка')), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1 Ошибка

// работает и без массива, но ошибка!!!!
Promise.race(new Promise((resolve, reject) => setTimeout(() => reject(new Error('Жесть ошибка')), 1000))).then(
  console.log
); // 1 Ошибка

// Promise.resolve/reject - говно, т.к. есть async/await

// promise.resolve - создаёт успешно выполненный промис с результатом value

// то же самое, что
promise = new Promise((resolve) => resolve('value'));

// этот метод используют для совместимости, когда ожидается, что функция возвратит именно промис

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}

// выполнится
Promise.resolve(111).then(console.log); // 111

// Promise.reject

// то же самое что
promise = new Promise((resolve, reject) => reject(error));
