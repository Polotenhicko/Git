//  async эта функция всегда возвращает промис
// значение других типов оборачиваются в завершившийся успешно промис автоматически

// эта функция вернёт выполненный промис с результатом 1
async function f() {
  return 1;
}

f().then(console.log); // 1

// можно явно вернуть промис, но будет тоже самое

async function f2() {
  return Promise.resolve(1);
}

f2().then(console.log); // 1

console.log('sync');

// await заставит интерпретатор js ждать до тех пор, пока промис справа не выполнится
// потом результат вернётся и выполнение кода продолжится
// работает только внутри async функции

async function f3() {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve('2'), 1e3);
  });

  const result = await promise;

  console.log(result);
}

f3();

// Перепишем этот пример на async

// function loadJson(url) {
//   return fetch(url).then((response) => response.json());
// }

// function loadGithubUser(name) {
//   return fetch(`https://api.github.com/users/${name}`).then((response) => response.json());
// }

// function showAvatar(githubUser) {
//   return new Promise(function (resolve, reject) {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = 'promise-avatar-example';
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser);
//     }, 3000);
//   });
// }

// // Используем их:
// loadJson('/article/promise-chaining/user.json')
//   .then((user) => loadGithubUser(user.name))
//   .then(showAvatar)
//   .then((githubUser) => alert(`Показ аватара ${githubUser.name} завершён`));

async function showAvatar() {
  // запрос json
  const response = await fetch('./user.json');
  const user = await response.json();

  // запрос из github
  const gitResponse = await fetch(`https://api.github.com/users/${user.name}`);
  const gitUser = await gitResponse.json();

  const img = document.createElement('img');
  img.src = gitUser.avatar_url;
  document.body.append(img);

  // await ждёт 3 секунды когда выполнится resolve
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return gitUser;
}

showAvatar();

// так нельзя, т.к. вне функции async
// let user = await fetch('/article/promise-chaining/user.json');

// можно обернуть в анонимную функцию

(async () => {
  let response = await fetch('./user.json');
  let user = await response.json();
  console.log(user);
})();

// await работает с thenable объектами

class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    console.log(resolve); // ƒ () { [native code] }

    setTimeout(() => resolve(this.num * 2), 1e3);
  }
}

async function func() {
  const result = await new Thenable(123);
  console.log(result);
}

func();

// когда await получает объект с .then, не являющимся промисом,
// js автоматически запускает этот метод, передавая встроенные resolve reject
// потом js ждёт вызова любой этой функции

// можно объявлять асинхронные методы класса

class Waiter {
  async wait() {
    return await Promise.resolve('waiter');
  }
}

new Waiter().wait().then(console.log); // 'waiter'

// если будет reject, то await выбросит ошибку по типу throw

async function test() {
  await Promise.reject(new Error('ошибка!'));
}

// то же самое что и это
// async function test() {
//   throw new Error('ошибка!');
// }

test(); // Uncaught (in promise) Error: ошибка!

// можно ловить через try/catch

async function test2() {
  try {
    let response = await fetch('http://no-such-url');
  } catch (e) {
    console.log(e);
  }
}

test2();

// TypeError: Failed to fetch
//     at test2 (index.js:153:26)
//     at index.js:159:1

// можно ловить catch

test().catch(console.warn);

// Error: ошибка!
//     at test (index.js:139:24)
//     at index.js:167:1

async function all() {
  let results = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
}

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return await response.json();
  }
  throw new Error(response.status);
}

loadJson('no-such-user.json').catch(console.log); // Error: 404

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson2(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return await response.json();
  }
  throw new HttpError(response);
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGithubUser() {
  const name = 'iliakan2';
  let user;
  try {
    user = await loadJson2(`https://api.github.com/users/${name}`);
  } catch (err) {
    if (err instanceof HttpError && err.response.status == 404) {
      console.log('Такого пользователя не существует, пожалуйста, повторите ввод.');
      return;
    } else {
      throw err;
    }
  }
  console.log(`Полное имя: ${user.name}.`);
  return user;
}

demoGithubUser();

async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function fas() {
  return wait().then(console.log);
}

fas();
