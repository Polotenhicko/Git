// У двигателя есть несколько этапов запуска.Каждый этап занимает какое - то время и этапов несколько.
// Написать функцию, которая будет принимать в себя генератор и запускать каждый этап двигателя

function* startEngine() {
  yield function (resolve) {
    setTimeout(() => {
      console.log('Включаю питание');
      resolve();
    }, 1e3);
  };

  yield function (resolve) {
    setTimeout(() => {
      console.log('Прокачиваю топливную смесь по форсункам');
      resolve();
    }, 1000);
  };

  yield function (resolve) {
    setTimeout(() => {
      console.log('Доза горючего попала в камеру сгорания');
      resolve();
    }, 1e3);
  };

  yield function (resolve) {
    setTimeout(() => {
      console.log('Запускаю стартер');
      resolve();
    }, 1e3);
  };

  yield function (resolve) {
    setTimeout(() => {
      console.log('Двигатель запущен');
      resolve();
    }, 1e3);
  };
}

function wrapper(generator) {
  const startGen = generator();
  let temp = startGen.next();
}

wrapper(startEngine);
