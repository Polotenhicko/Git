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

  yield function (resolve, reject) {
    try {
      if (getRandom(0, 1)) {
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

function wrapper(generator) {
  let index = 0;
  function fn(func) {
    const isEnd = (value) => value == startGen.length;
    return new Promise((resolve, reject) => {
      func(resolve, reject);
    }).then(() => {
      index += 1;
      if (!isEnd(index)) fn(startGen[index]);
    }, console.error);
  }
  const startGen = Array.from(generator());

  if (startGen.length) fn(startGen[index]);
  else console.error('Генератор пуст!');
}

wrapper(startEngine);
