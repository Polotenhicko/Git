console.log('Задача Вариант №2');
console.log('=====================');

// Можно определить тип, за которым будет мониторинг, заранее
function createCounter2(type = undefined) {
  // Не вынес за функцию чтобы не ломать предыдущий код
  let value = 0;

  let difference = 0;

  // По задаче новая сущность
  const CounterBaseValue = function CounterBaseValue() {
    // Весь конструктор 2 варианта

    // Значение, на сколько изменяется при increment/decrement

    // Возможные типы и действия при выводе
    this.types = new Map([
      [
        'increment',
        function () {
          return difference;
        },
      ],
      [
        'decrement',
        function () {
          // Может быть 0, и тогда можно вывести -0, данный код это убирает
          return difference ? -difference : 0;
        },
      ],
    ]);

    // Изменить тип за которым идёт мониторинг
    this.changeType = function changeType(newType) {
      type = newType;
      difference = 0;
    };

    // Если такой тип есть, то счётчик увеличивается
    this.doValue = function doValue(func) {
      if (this.types.has(type) && func.name == type) difference++;
    };

    // Получить значения, если такой тип есть в списке и выполнить функцию этого типа по выводу
    this.getValue = function getValue() {
      return this.types.has(type) ? this.types.get(type)() : undefined;
    };
  };

  return {
    // Добавление новой сущности
    CounterBaseValue: new CounterBaseValue(), // 2 задача

    increment: function increment() {
      value++;
      // При действии мы вызываем метод сущности
      this.CounterBaseValue.doValue(increment); // 2 задача
    },

    decrement: function decrement() {
      value--;
      // При действии мы вызываем метод сущности
      this.CounterBaseValue.doValue(decrement); // 2 задача
    },

    getValue: function getValue() {
      return value;
    },
  };
}

const count2 = createCounter2();
count2.increment(); // 1
count2.increment(); // 2
count2.increment(); // 3
count2.decrement(); // 2

console.log(count2.getValue()); // 2

console.log(count2.CounterBaseValue.getValue()); // undefined, т.к. тип не указан

count2.CounterBaseValue.changeType('increment');
console.log(count2.CounterBaseValue.getValue()); // 0

count2.increment(); // 3
count2.increment(); // 4
count2.increment(); // 5
count2.decrement(); // 4
count2.decrement(); // 3

console.log(count2.getValue()); // 3

console.log(count2.CounterBaseValue.getValue()); // 3

count2.CounterBaseValue.changeType('decrement');
console.log(count2.CounterBaseValue.getValue()); // 0

count2.increment(); // 4
count2.decrement(); // 3
count2.decrement(); // 2

console.log(count2.getValue()); // 2
console.log(count2.CounterBaseValue.getValue()); // -2

count2.CounterBaseValue.changeType('aboba');
console.log(count2.CounterBaseValue.getValue()); // undefined

count2.increment(); // 3
count2.decrement(); // 2

console.log(count2.getValue()); // 2
console.log(count2.CounterBaseValue.getValue()); // undefined

// Вопросы:

// Значение по умолчанию было установлено на 'undefined'. Можно было выбрать любое другое значение, потому что логика разделена и основное сравнение идёт через поиск в Map

// Возможно само замыкание не даёт прямо изменять значение value и difference. Других способов я не вижу, да и модификаторов доступа в коде нет.
