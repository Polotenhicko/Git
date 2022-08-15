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

// результаты остальных промисов игнорируются
