import { callBack } from './exp.js';
// код добавляет событие на клик и запрещает всплытие

document.addEventListener(
  'click',
  function (e) {
    console.log(e.currentTarget);
  },
  true
); // теперь код работает, но срабатывает на погружении

// в рекакте в JSX нужно добавлять вместо onClick - onClickCapture
