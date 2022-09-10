// У двигателя есть несколько этапов запуска.Каждый этап занимает какое - то время и этапов несколько.
// Написать функцию, которая будет принимать в себя генератор и запускать каждый этап двигателя

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function* startEngine() {
  yield function (resolve, reject) {
    try {
      setTimeout(() => {
        console.log('Включаю питание');
        resolve();
      }, 1e3);
    } catch (e) {
      reject(e);
    }
  };

  yield function (resolve, reject) {
    try {
      setTimeout(() => {
        console.log('Прокачиваю топливную смесь по форсункам');
        resolve();
      }, 1000);
    } catch (e) {
      reject(e);
    }
  };

  yield function (resolve, reject) {
    try {
      setTimeout(() => {
        console.log('Доза горючего попала в камеру сгорания');
        resolve();
      }, 1e3);
    } catch (e) {
      reject(e);
    }
  };

  const isBrokenStarter = getRandom(0, 1);

  yield function (resolve, reject) {
    try {
      if (isBrokenStarter) {
        setTimeout(() => {
          console.log('Запускаю стартер');
          resolve();
        }, 1e3);
      } else {
        setTimeout(() => {
          reject(new Error('Стартер сломан'));
        }, 1e3);
      }
    } catch (e) {
      reject(e);
    }
  };

  yield function (resolve, reject) {
    try {
      setTimeout(() => {
        console.log('Двигатель запущен');
        resolve();
      }, 1e3);
    } catch (e) {
      reject(e);
    }
  };
}

// переписать на async/await
// сделать поинтереснее
function wrapper(generator) {
  let index = 0;
  const startGen = generator();
  function fn(func) {
    new Promise((resolve, reject) => {
      func(resolve, reject);
    }).then(() => {
      index += 1;
      if (!startGen.done) fn(startGen.next().value);
    }, console.error);
  }

  if (!startGen.done) fn(startGen.next().value);
  else console.error('Генератор пуст!');
}

wrapper(startEngine);
