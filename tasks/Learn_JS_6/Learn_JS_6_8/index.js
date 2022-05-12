function sayHello(name) {
  name ? console.log(`Hello ${name}`) : sayHello('Гость');
}

sayHello(); // Hello Гость

setTimeout(sayHello, 1e3); // Hello Гость через секунду
setTimeout(sayHello, 2e3, 'Имя'); // Hello Имя через 2 сек

setTimeout('console.log(123)', 3e3); // 123 через 3 сек
let timerId = setTimeout('console.log(123)', 3e3);
console.log('timerId:', timerId); // Выводит id таймера
clearTimeout(timerId);
console.log('timerId:', timerId); // Выводит тот же id таймера

// Метод setInterval имеет такой же синтаксис

timerId = setInterval(() => console.log('tick'), 2000);

// Остановить через 5 сек

setTimeout(() => {
  clearInterval(timerId);
  console.log('stop');
}, 5000);

timerId2 = setTimeout(function tick() {
  console.log('tick timeout');
  timerId2 = setTimeout(tick, 2000); // (*)
}, 2000);

setTimeout(() => console.log('0 задержка!'));

console.log('Код весь выполнился!');

clearTimeout(timerId2);

function printNumbers(from, to) {
  let value = from;
  let interval = setInterval(function () {
    console.log(value);
    if (value == to) clearInterval(interval);
    value++;
  }, 1e3);
}

printNumbers(1, 3);
