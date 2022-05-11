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
