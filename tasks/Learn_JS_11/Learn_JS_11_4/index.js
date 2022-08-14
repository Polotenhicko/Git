// catch перехватывает ошибку

fetch('https://no-such-server.blabla')
  .then((response) => response.json())
  .catch(console.error);

// catch не обязательно должен быть сразу после ошибки
// он может быть далее, после одного или нескольких then

// может быть неверный json

fetch('./badjson.json')
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);
        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  // catch сработает при любой ошибке сверху
  .catch(console.log);

// внутри промисов есть невыидимый try catch

new Promise((resolve, reject) => {
  throw new Error('Ошибка!');
}).catch(console.log); // Error: Ошибка!

new Promise((resolve, reject) => {
  reject(new Error('Ошибка!'));
}).catch(console.log); // Error: Ошибка!

// даже если внутри then

new Promise((resolve, reject) => {
  resolve('ок');
})
  .then((result) => {
    throw new Error('Ошибка!'); // генерируем ошибку
  })
  .catch(console.log); // Error: Ошибка!

// и программная ошибка тоже

new Promise((resolve, reject) => {
  resolve('ок');
})
  .then((result) => {
    blabla(); // нет такой функции
  })
  .catch(console.log); // ReferenceError: blabla is not defined

// финальный catch перехватывает как промисы с reject, так и и случайные ошибки

// выполнится catch, а потом пойдёт далее
new Promise((resolve, reject) => {
  throw new Error('Ошибка!!!!');
})
  .catch(function (error) {
    console.log('Ошибка обработана, продолжить работу');
  })
  .then(() => console.log('Управление перейдёт в следующий then'));

//после ошибки следующие then не выполняются
new Promise((resolve, reject) => {
  throw new Error('Ошибка!');
})
  .catch(function (error) {
    // (*)

    if (error instanceof URIError) {
      // обрабатываем ошибку
    } else {
      console.log('Не могу обработать ошибку');

      throw error; // пробрасывает эту или другую ошибку в следующий catch
    }
  })
  .then(function () {
    /* не выполнится */
  })
  .catch((error) => {
    // (**)

    console.log(`Неизвестная ошибка: ${error}`);
    // ничего не возвращаем => выполнение продолжается в нормальном режиме
  });

// существует обработчик ошибок промиса

window.addEventListener('unhandledrejection', function (event) {
  // объект события имеет два специальных свойства:
  console.log(123, event.promise); // [object Promise] - промис, который сгенерировал ошибку
  console.log(123, event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});

new Promise(function () {
  throw new Error('Ошибка!');
}); // нет обработчика ошибок

// если происходит ошибка и отсутствует обработчик, то вызывается событие unhandledrejection
// но это спецификация HTML

new Promise(() => {
  throw new Error('jestb');
});

console.log('sync');
