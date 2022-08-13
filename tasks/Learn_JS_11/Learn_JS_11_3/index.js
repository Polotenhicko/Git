// цепочка промисов

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  // успешно выполняется через 1с
  .then(function (result) {
    console.log(result); // 1
    // то, что вернётся - result для след
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 4
    return result * 2;
  });

// обработчик внутри then может вернуть промис
// тогда послед обработчики ждут пока он выполнится и получают его результат

new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1e3);
})
  .then((result) => {
    console.log('---------');
    console.log(result); // 1
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1e3);
    });
  })
  .then((result) => {
    console.log(result); // 2
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1e3);
    });
  })
  .then((result) => {
    console.log(result); // 4
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1e3);
    });
  })
  .then((result) => {
    console.log(result); // 8
  });

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}

// выполнится асинхронно
loadScript('./one.js')
  .then((result) => loadScript('./two.js'))
  .then((resilt) => loadScript('./three.js'))
  .then((result) => {
    // функции в объявленных скриптах
    one();
    two();
    three();
  });

console.log('sync');

// thenabel - объекты с методом then

class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    console.log('////////////');
    console.log(resolve);
    setTimeout(() => resolve(this.num * 2), 1e3);
  }
}

// function() { native code } выведется
new Promise((resolve) => resolve(1)).then((result) => new Thenable(result)).then(console.log);
// js проверяет, есть ли у возвращаемого объекта метод then, если есть - то использует его

// пример с fetch

// let promise = fetch(url)

// запрашивает по url и возвращает промис
// промис успешно выполняется и возвращает объект response
// после того, как удалённый сервер присылает заголовки ответа, но до того
// как весь ответ сервера полностью загружен

fetch('./user.json')
  // then выполняется, когда удалённый сервер отвечает
  .then(function (response) {
    // response.text() возвращает новый промис,
    // который выполняется и возвращает полный ответ сервера
    // когд он загрузится
    return response.text();
  })
  .then(function (text) {
    console.log(text);
  });

fetch('./user.json')
  .then((response) => response.json())
  .then(console.log);

fetch('./polo.json')
  // после фетча приходит response с заголовками ответа, но сам ответ ещё не пришёл
  .then((response) => response.json())
  //
  .then((json) => fetch(`https://api.github.com/users/${json.name}`))
  .then((response) => response.json())
  .then((gitUser) => {
    const img = document.createElement('img');
    img.src = gitUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    setTimeout(() => img.remove(), 3e3);
  });

// расширим функцию

fetch('./polo.json')
  // после фетча приходит response с заголовками ответа, но сам ответ ещё не пришёл
  .then((response) => response.json())
  //
  .then((json) => fetch(`https://api.github.com/users/${json.name}`))
  .then((response) => response.json())
  .then((gitUser) => {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = gitUser.avatar_url;
      img.className = 'promise-avatar-example';
      document.body.append(img);
      setTimeout(() => {
        img.remove();
        resolve(gitUser);
      }, 3e3);
    });
  })
  .then((gitUser) => {
    console.log(`Закончили показ ${gitUser.name}`);
  });
