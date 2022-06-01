// Секундомер
// Сделать секундомер (буквально), там есть кнопки:
// старт/пауза (в зависимости включен или нет).
// обнулить (если был запущен и щас пауза). Доступна только когда у нас пауза.

// Предлагается реализовать логику на ООП: (объект / функция конструктор без разницы) и
// потом создать DOM представление для этой модели - добавить вывод + обновление времени в DOM и кнопки действий.

// Таймер должен быть "точным" - отсчитывать время с запуска через Date.now() или performance.now().
// Обновляться должен достаточно часто, но не обязательно раз в миллисекунду(60 fps будет достаточно).

function StopwatchLogic() {
  let isPause = false;
  let startDate = 0;
  let ms = 0;

  this.ms = function getMs() {
    return isPause ? ms : startDate ? (ms = Date.now() - startDate) : 0;
  };

  this.start = function start() {
    if (!this.ms() || isPause) {
      startDate = startDate ? Date.now() - this.ms() : Date.now();
      isPause = false;
      return true;
    }
    return false;
  };

  this.pause = function pause() {
    if (this.ms()) {
      isPause = true;
      return true;
    } else {
      console.error('Секундомер не включён');
      return false;
    }
  };

  this.clear = function clear() {
    if (this.ms() && isPause) {
      ms = 0;
      startDate = 0;
      return true;
    } else {
      console.error(
        'Для очистки секундомер должен после запуска быть приостановлен'
      );
      return false;
    }
  };
}

function Stopwatch() {
  const timerUpdate = 1 / 60;
  const wrapperList = document.querySelectorAll('.stopwatch_wrapper');
  for (const wrapper of wrapperList) {
    const stopwatchLogicWrap = new StopwatchLogic();
    const timer = wrapper.querySelector('.stopwatch');
    const timerMS = wrapper.querySelector(`.stopwatch+.ms`);
    const btnStart = wrapper.querySelector(`.stopwatch_start`);
    const btnPause = wrapper.querySelector(`.stopwatch_pause`);
    const btnClear = wrapper.querySelector(`.stopwatch_clear`);
    let timeoutDOM;

    const funcBtnStart = function funcBtnStart() {
      if (stopwatchLogicWrap.start()) {
        timeoutDOM = setTimeout(function timeoutFunc() {
          showTime(stopwatchLogicWrap.ms());
          timeoutDOM = setTimeout(timeoutFunc, timerUpdate);
        }, timerUpdate);
        btnPause.classList.add('active');
        btnStart.classList.remove('active');
        btnClear.classList.remove('active');
      }
    };

    const funcBtnPause = function funcBtnPause() {
      if (stopwatchLogicWrap.pause()) {
        clearTimeout(timeoutDOM);
        btnPause.classList.remove('active');
        btnStart.classList.add('active');
        btnClear.classList.add('active');
      }
    };

    const funcBtnClear = function funcBtnClear() {
      if (stopwatchLogicWrap.clear()) {
        showTime(0);
        btnPause.classList.remove('active');
        btnStart.classList.add('active');
        btnClear.classList.remove('active');
      }
    };

    btnStart.classList.add('active');

    timer.textContent = '00:00:00';
    timerMS.textContent = '.000';

    const btnChangeList = new Map([
      [btnStart, funcBtnStart],
      [btnPause, funcBtnPause],
      [btnClear, funcBtnClear],
    ]);

    function showTime(ms) {
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

      timer.textContent = `${strHour}:${strMin}:${strSec}`;
      timerMS.textContent = `.${strMs}`;
    }

    for (const [btnList, value] of btnChangeList) {
      btnList.addEventListener('click', value);
    }
  }
}

const timer = new Stopwatch();
