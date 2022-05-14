// Секундомер
// Сделать секундомер (буквально), там есть кнопки:
// старт/пауза (в зависимости включен или нет).
// обнулить (если был запущен и щас пауза). Доступна только когда у нас пауза.

// Предлагается реализовать логику на ООП: (объект / функция конструктор без разницы) и
// потом создать DOM представление для этой модели - добавить вывод + обновление времени в DOM и кнопки действий.

// Таймер должен быть "точным" - отсчитывать время с запуска через Date.now() или performance.now().
// Обновляться должен достаточно часто, но не обязательно раз в миллисекунду(60 fps будет достаточно).

function Stopwatch() {
  const H1 = document.getElementById('stopwatch');
  let isPause = false;
  let ms = 0;
  let timeout;

  function showTime(msec = ms) {
    const date = new Date(msec);

    const dateObj = {
      hour: date.getUTCHours(),
      min: date.getUTCMinutes(),
      sec: date.getUTCSeconds(),
      ms: date.getUTCMilliseconds(),
    };

    const str = `${dateObj.hour}:${dateObj.min}:${dateObj.sec}. ${dateObj.ms}`;
    H1.innerHTML = str;
  }

  this.start = function start() {
    isPause = false;
    const startDate = Date.now();
    clearTimeout(timeout);

    timeout = setTimeout(function timeoutFunc() {
      showTime();
      ms = Date.now() - startDate;
      timeout = setTimeout(timeoutFunc, 17);
    }, 17);
  };

  this.pause = function pause() {
    if (ms) {
      isPause = true;
      clearTimeout(timeout);
    } else {
      console.error('Секундомер не включён');
    }
  };

  this.clear = function clear() {
    if (ms && isPause) {
      ms = 0;
      showTime();
    } else {
      console.error(
        'Для очистки секундомер должен после запуска быть приостановлен'
      );
    }
  };
}

const test = new Stopwatch();
