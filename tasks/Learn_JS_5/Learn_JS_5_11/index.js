console.log(new Date()); // Sat Apr 30 2022 21:00:54 GMT+0300 (Москва, стандартное время)

console.log(new Date(0)); // Thu Jan 01 1970 03:00:00 GMT+0300 (Москва, стандартное время)

let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);

// Можно уходить до 1970

let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log(Dec31_1969);

let date = new Date('2017-01-26');
console.log(date);

console.log(new Date(0000, 0, 0, 0, 0, 0, 0)); // 1899 ??

const now = new Date();

console.log(now.getFullYear()); // 2022
console.log(now.getMonth()); // 03, т.к. отсчёт от 0
console.log(now.getDate()); // 30

console.log(now.getDay()); // от 0 воскр до 6 суббота день недели

console.log(now.getUTCHours()); // 19 (22 - 3)

console.log(now.getTime()); // таймстамп сейчас

console.log(now.getTimezoneOffset()); // Разница в минутах между UTC и моим временем (3 * 60)

console.log('////////');

console.log(now.setHours(0, 0, 0, 0));

date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date); // ...1st Feb 2013!

date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // задать первое число месяца
console.log(date);

date.setDate(0); // первый день месяца -- это 1, так что выводится последнее число предыдущего месяца
console.log(date); // 31 Dec 2015

date = new Date();
console.log(+date); // количество миллисекунд, то же самое, что date.getTime()
console.log(+date == date.getTime()); // true

console.log(Date.now() == date.getTime()); // true
