// Секундомер
// Сделать секундомер (буквально), там есть кнопки:
// старт/пауза (в зависимости включен или нет).
// обнулить (если был запущен и щас пауза). Доступна только когда у нас пауза.

// Предлагается реализовать логику на ООП: (объект / функция конструктор без разницы) и
// потом создать DOM представление для этой модели - добавить вывод + обновление времени в DOM и кнопки действий.

// Таймер должен быть "точным" - отсчитывать время с запуска через Date.now() или performance.now().
// Обновляться должен достаточно часто, но не обязательно раз в миллисекунду(60 fps будет достаточно).

function Stopwatch() {
  const $timer = document.querySelector('.stopwatch');
  const $timerMS = document.querySelector('.stopwatch+.ms');
  const $btnStart = document.querySelector('.stopwatch_start');
  const $btnPause = document.querySelector('.stopwatch_pause');
  const $btnClear = document.querySelector('.stopwatch_clear');
  const timerUpdate = 1 / 60;

  $btnStart.classList.add('active');

  $timer.textContent = '00:00:00';
  $timerMS.textContent = '.000';

  const btnChangeList = new Map([
    [
      $btnStart,
      function () {
        $btnPause.classList.add('active');
        $btnStart.classList.remove('active');
        $btnClear.classList.remove('active');
      },
    ],
    [
      $btnPause,
      function () {
        $btnPause.classList.remove('active');
        $btnStart.classList.add('active');
        $btnClear.classList.add('active');
      },
    ],
    [
      $btnClear,
      function () {
        $btnPause.classList.remove('active');
        $btnStart.classList.add('active');
        $btnClear.classList.remove('active');
      },
    ],
  ]);

  function showTime() {
    const date = new Date(ms);

    function addNulls(time, maxLength) {
      let str = String(time);
      while (str.length < maxLength) {
        str = '0' + str;
      }
      return str;
    }

    const strHour = addNulls(date.getUTCHours(), 2);
    const strMin = addNulls(date.getUTCMinutes(), 2);
    const strSec = addNulls(date.getUTCSeconds(), 2);
    const strMs = addNulls(date.getUTCMilliseconds(), 3);

    $timer.textContent = `${strHour}:${strMin}:${strSec}`;
    $timerMS.textContent = `.${strMs}`;
  }

  const timer = new (function StopwatchLogic() {
    let isPause = false;
    let ms = 0;
    let startDate = 0;
    let timeout;

    this.start = function start() {
      if (!ms || isPause) {
        startDate = startDate ? Date.now() - ms : Date.now();

        isPause = false;

        timeout = setTimeout(function timeoutFunc() {
          ms = Date.now() - startDate;
          timeout = setTimeout(timeoutFunc, timerUpdate);
        }, timerUpdate);
      }
    };

    this.pause = function pause() {
      if (ms) {
        clearTimeout(timeout);
        isPause = true;
        console.log(showTime(ms));
      } else {
        console.error('Секундомер не включён');
      }
    };

    this.clear = function clear() {
      if (ms && isPause) {
        ms = 0;
        startDate = 0;
      } else {
        console.error(
          'Для очистки секундомер должен после запуска быть приостановлен'
        );
      }
    };
  })();

  for (const [btn, value] of btnChangeList) {
    btn.addEventListener('click', value);
  }
}

const timer = new Stopwatch();
