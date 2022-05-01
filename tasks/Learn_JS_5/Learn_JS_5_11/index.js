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

console.log(Date.parse('2015-01-13T14:00:00.000+03:00')); // месяц с 1, если неверно введено - NaN, возвращает timestamp

console.log(`Загрузка началась ${performance.now()}мс назад`);
// Получаем что-то вроде: "Загрузка началась 34731.26000000001мс назад"
// .26 –- это микросекунды (260 микросекунд)
// корректными являются только первые три цифры после точки, а остальные -- это ошибка точности

// Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.

let ex1 = new Date('2012-02-20T03:12:00');
console.log(ex1);
ex1 = new Date(2012, 1, 20, 3, 12);
console.log(ex1);

/////////////////

function getWeekDay(date) {
  const weekDayNumber = date.getDay();
  const weekDays = new Map([
    [0, 'ВС'],
    [1, 'ПН'],
    [2, 'ВТ'],
    [3, 'СР'],
    [4, 'ЧТ'],
    [5, 'ПТ'],
    [6, 'СБ'],
  ]);
  if (weekDays.has(weekDayNumber)) return weekDays.get(weekDayNumber);
}

date = new Date(2012, 0, 3); // 3 января 2012 года
console.log(getWeekDay(date)); // нужно вывести "ВТ"

// Правильный вариант:

function getWeekDay(date) {
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  return days[date.getDay()];
}

////////////////

function getLocalDay(date) {
  const weekDay = date.getDay();
  return !weekDay ? 7 : weekDay;
}

/*
0 - вс
6 - сб
*/

date = new Date(2022, 4, 2);
console.log(getLocalDay(date));

////////////

date = new Date(2015, 0, 2);

function getDateAgo(date, number) {
  return new Date(date - number * 24 * 3600 * 1000).getDate();
}

console.log(getDateAgo(date, 2));

/////////////

function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

console.log(getLastDayOfMonth(2012, 0));

///////////

function getSecondsToday() {
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((Date.now() - today) / 1000);
}

// от learn js
function getSecondsToday2() {
  let now = new Date();

  // создаём объект с текущими днём/месяцем/годом
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // разница в миллисекундах
  return Math.round(diff / 1000); // получаем секунды
}

console.log(getSecondsToday(), getSecondsToday2());

console.log(getSecondsToday() == getSecondsToday2());

function bench(f) {
  let start = Date.now();
  for (let i = 0; i < 100000; i++) f();
  return Date.now() - start;
}

bench(getSecondsToday);
bench(getSecondsToday2);

let time1 = 0;
let time2 = 0;

// bench(upperSlice) и bench(upperLoop) поочерёдно запускаются 10 раз
// for (let i = 0; i < 10; i++) {
//   time1 += bench(getSecondsToday);
//   time2 += bench(getSecondsToday2);
// }

console.log('Итоговое время diffSubtract: ' + time1);
console.log('Итоговое время diffGetTime: ' + time2);

// Моя функция быстрее работает

function getSecondsToTomorrow() {
  const today = new Date();
  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  return Math.round((tomorrow - today) / 1000);
}

console.log(getSecondsToTomorrow());

function formatDate(date) {
  const formDate = new Date() - date;

  let str;
  if (formDate <= 60) {
    str = 'прямо сейчас';
  } else if (formDate <= 60 * 1000) {
    str = `${formDate / 1000} сек. назад`;
  } else if (formDate <= 24 * 60 * 1000) {
    str = `${formDate / 60 / 1000} мин. назад`;
  } else {
    return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`;
  }
  return str;
}

console.log(formatDate(new Date(new Date() - 86400 * 1000)));
