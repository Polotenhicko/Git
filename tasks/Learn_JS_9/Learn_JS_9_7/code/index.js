// [ООП, глава 9] Задача с собеса
// Сложность 6/10 на собесе, обычно 3/10
// Дан код, ответить на вопросы к нему

// 1. Почему одни и те же имена свойств, но не ругается интерпретатор?
// 2. Что такое геттеры и есть ли тут они? Что такое методы и есть ли тут они?
// 3. Что такое класс и экземпляр класса?
// 4. Куда записывается каждое свойство?
// 5. Что выведется в результате выполнения for и spread? Почему?

// Ответы:
// 1. Потому что они идут в разные места, static - в инстанс, остальные 2 идут в прототип класса
// 2. Геттеры - свойство-аксессор, вызывается когда мы пытаемся получить свойство (не меняя),
// в классе Item геттеров нет. Методы - функции, которые присваиваются в прототип класса, это функция get() {}
// 3. Класс - специальный конструктор, который возвращает объект с записанными внутри методами и свойствами.
// Экземпляр класса - полученный объект от вызова класса, наследуемый от прототипа класса
// 4. Статические свойства записываются в сам класс, свойства в конструкторе или свойства вне конструктора - в экземпляр класса

class Item2 {
  data = 10;
  get() {}
  static data = 20;
  static get() {}
}

// выпишет все статические свойства класса, кроме методов
// не выводит методы, т.к. у них стоит enumirable: false
// for (const key in Item2) {
//   console.log(key);
// }

// выпишет все свойства экземпляра класса (и методы), кроме методов прототипа класса
// т.к. у методов прототипа enumerable: false
// for (const key in new Item2()) {
//   console.log(key);
// }

// выведет тоже самое что и у for
// console.log({ ...new Item2() });
// тоже самое с for
// console.log({ ...Item2 });

// [ООП, главы 8,9] Задача с собеса
// Сложность 8/10 на собесе, обычная 4/10
// переписать на функции конструкторы с прототипами
// class BasicItem {
//   constructor(_testProp) {
//     this._parentProp = _testProp + 100;
//   }

//   getParentProp() {
//     return this._parentProp;
//   }
// }
// //
// class Item extends BasicItem {
//   static data = 5;

//   constructor(_testProp) {
//     super(_testProp);
//     this._testProp = _testProp;
//   }

//   getProp() {
//     return this._testProp + this.getParentProp() + Item.data;
//   }
// }

// аналог

function BasicItem(_testProp) {
  // конструктор
  this._parentProp = _testProp + 100;

  // в прототип
  BasicItem.prototype.getParentProp = function getParentProp() {
    return this._parentProp;
  };
}

function Item(_testProp) {
  // наследование
  Object.setPrototypeOf(Item.prototype, BasicItem.prototype);

  // статическое свойство
  Item.data = 5;

  // типо конструктор с super()
  BasicItem.call(this, _testProp);
  this._testProp = _testProp;

  // в прототип
  Item.prototype.getProp = function getProp() {
    return this._testProp + this.getParentProp() + Item.data;
  };
}

console.log(new Item(1000).getProp()); // expect 2105
