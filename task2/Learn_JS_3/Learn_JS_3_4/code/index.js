// Создайте функцию runOnKeys(func, code1, code2, ... code_n),
// которая запускает func при одновременном нажатии клавиш с кодами code1, code2, …, code_n.

function runOnKeys(func, ...argCode) {
  const setKeys = new Set();
  document.addEventListener('keydown', function (e) {
    if (e.repeat) return;
    setKeys.add(e.code);
    // if ([...setKeys.values()].sort().join() == [...argCode].sort().join()) func(); // вариант проверки
    if (argCode.every((keyCode) => setKeys.has(keyCode))) func();
  });
  document.addEventListener('keyup', function (e) {
    setKeys.delete(e.code);
  });
}

runOnKeys(() => console.log('Привет!'), 'KeyQ', 'KeyW');
