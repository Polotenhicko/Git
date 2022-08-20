// промисификация - простое преобразование функции с колбэками в промисы

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

  document.head.append(script);
}

// использование:
// loadScript('path/script.js', (err, script) => {...})

// новая функция будет делать тоже самое, принимать src, и возвращать промис
// мы не меняем старую функцию!!
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// без ошибки
loadScriptPromise('./../Learn_JS_11_3/one.js').then((result) => {
  console.log('Скрипт загружен', result);
  one(); // 'one'
});

// с ошибкой
loadScriptPromise('./../Learn_JS_11_3/адын.жс').then(
  (result) => {
    console.log('Скрипт загружен', result);
    one(); // 'one'
  },
  (error) => {
    console.error('Ошибка!', error);
  }
);

// сделаем функцию-помощник

function promisify(func) {
  // обёртка
  return function (...args) {
    // возвращаем промис
    return new Promise((resolve, reject) => {
      function callback(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }

      // в массив аргументов кидаем колбэк
      args.push(callback);

      func.apply(this, args);
    });
  };
}

loadScriptPromise = promisify(loadScript);

// норм
loadScriptPromise('./../Learn_JS_11_3/two.js').then((result) => {
  console.log('Скрипт загружен', result);
  two(); // 'two'
});

// с ошибкой
loadScriptPromise('./../Learn_JS_11_3/дыва.жс').then(
  (result) => {
    console.log('Скрипт загружен', result);
    two();
  },
  (error) => {
    console.error('Ошибка!', error);
  }
);

// улучшенная функция для множеств аргументов в колбэке
function promisify(func, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // наш специальный колбэк для func
        if (err) {
          reject(err);
        } else {
          // делаем resolve для всех results колбэка, если задано manyArgs
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      func.call(this, ...args);
    });
  };
}

// Также существуют модули с более гибкой промисификацией,
// например, es6 - promisify или встроенная функция util.promisify в Node.js.
