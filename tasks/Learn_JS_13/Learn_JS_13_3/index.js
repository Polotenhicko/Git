// до этого были статические импорты

// ничего не может быть динамическим из импорта

// import ... from getPath() // не будет работать

// также нельзя делать импорты в зависимости от условий

// нельзя!
// if (...) {
//   import ...;
// }

// нельзя! нельзя ставить импорт в блок кода
// {
//   import ...;
// }

// всё потому что задача import/export - задать костяк структуры кода
// а дальше сам проанализирует что да как

// но можно и динамически
// import(module)
// загружает модуль и возвращает промис, результатом которым становится объект модуля, содержащий все его экспорты
// использовать можно динамически в любом месте кода

// ЭТО ВСЁ РАБОТАЕТ БЕЗ type="module"
const modulePath = () => './' + 'say' + '.js';

import(modulePath())
  .then((obj) => {
    // объект модуля
    console.log(obj);
    // сделали геттер и сеттер чтобы нельзя было изменить то что экспортировали
    obj.bye = 'bye';
    console.log(obj.bye);
  })
  // ошибка если будет
  .catch(console.error);

// или в async функции
(async () => {
  const file = await import(modulePath);
  console.log(file);
})().catch(console.error); // TypeError: Failed to resolve module specifier '() => './' + 'say' + '.js''

// ДАЛЬШЕ НУЖЕН type="module"
// в новом ecmascript в type="module" можно писать await на верхнем уровне

const { hi, bye } = await import(modulePath());
hi();

// default as def
const { default: def } = await import('./def' + '.js');
console.log(def);

def(); // 'default'

// import() - не какая-то функция, а то же самое что и super (не по функционалу конечно же)

console.log(window.import); // undefined

const a = isNaN;
console.log(a); // ƒ isNaN() { [native code] }
console.log(!!window.isNaN); // true
