// рассмотрим функцию

// эта функция загружает на страницу новый скрипт
let loadScript = function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.append(script);
};
// такие функции называются асинхронными

// если в новом скрипте есть какая-то функция, то мы не сможем её сразу вызвать после loadScript(src)
// можно передавать callback чтобы вызвать его после загрузки скрипта

loadScript = function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
};

// loadScript('/my/script.js', function() {
//   // эта функция вызовется после того, как загрузится скрипт
//   newFunction(); // теперь всё работает
// });

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', (script) => {
  console.log(`Скрипт ${script.src} загрузился`);
  console.log(_);
});

// такое называется асинхронным программированием с использованием колбэков

// чтобы загрузить один скрипт за другим можно вызывать loadScriprt в колбэке

// loadScript('/my/script.js', function (script) {
//   console.log(`Здорово, скрипт ${script.src} загрузился, загрузим ещё один`);

//   loadScript('/my/script2.js', function (script) {
//     console.log(`Здорово, второй скрипт загрузился`);
//   });
// });

// так можно делать если одно-два действия

// пример с обработкой ошибки

loadScript = function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));

  document.head.append(script);
};

// такой пример называется колбэк с первым аргументом-ошибкой
// loadScript('/my/script.js', function (error, script) {
//   if (error) {
//     // обрабатываем ошибку
//   } else {
//     // скрипт успешно загружен
//   }
// });

// адская пирамида колбэков

// loadScript('1.js', function (error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript('2.js', function (error, script) {
//       if (error) {
//         handleError(error);
//       } else {
//         // ...
//         loadScript('3.js', function (error, script) {
//           if (error) {
//             handleError(error);
//           } else {
//             // ...и так далее, пока все скрипты не будут загружены (*)
//           }
//         });
//       }
//     });
//   }
// });

// есть профитный способ - понасоздавать функций

// loadScript('1.js', step1);

// function step1(error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript('2.js', step2);
//   }
// }

// function step2(error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript('3.js', step3);
//   }
// }

// function step3(error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...и так далее, пока все скрипты не будут загружены (*)
//   }
// };
