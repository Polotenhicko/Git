// Секундомер
// Сделать секундомер (буквально), там есть кнопки:
// старт/пауза (в зависимости включен или нет).
// обнулить (если был запущен и щас пауза). Доступна только когда у нас пауза.

// Предлагается реализовать логику на ООП: (объект / функция конструктор без разницы) и
// потом создать DOM представление для этой модели - добавить вывод + обновление времени в DOM и кнопки действий.

// Таймер должен быть "точным" - отсчитывать время с запуска через Date.now() или performance.now().
// Обновляться должен достаточно часто, но не обязательно раз в миллисекунду(60 fps будет достаточно).

function Stopwatch() {
  let isPause = false;
  let ms = 0;
  let startDate;
  let timeout;

  function showTime(ms) {
    const date = new Date(ms);
    return {
      hour: date.getUTCHours(),
      min: date.getUTCMinutes(),
      sec: date.getUTCSeconds(),
      ms: date.getUTCMilliseconds(),
    };
  }

  this.start = function start() {
    isPause = false;
    clearTimeout(timeout);
    startDate = Date.now();

    timeout = setTimeout(function timeoutFunc() {
      ms = Date.now() - startDate;
      timeout = setTimeout(timeoutFunc, 17);
    }, 17);
  };

  this.pause = function pause() {
    if (ms) {
      isPause = true;
      clearTimeout(timeout);
      console.log(showTime(ms));
    } else {
      console.error('Секундомер не включён');
    }
  };

  this.clear = function clear() {
    if (ms && isPause) {
      ms = 0;
    } else {
      console.error(
        'Для очистки секундомер должен после запуска быть приостановлен'
      );
    }
  };
}

const test = new Stopwatch();
