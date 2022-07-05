// Помимо value есть 3 спей атрибута
// writable - возможность менять свойство, иначе оно только для чтения
// enumerable - свойство перечисляется в циклах, иначе не может
// configurable - свойство можно удалить, а спец атрибуты можно менять

// при создании свойства обычным путем эти спец атрибуты все true

const obj = {
  name: 'Test',
};

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
// {value: 'Test', writable: true, enumerable: true, configurable: true}

// можно явно указать флаги

let test = {};

Object.defineProperty(test, 'name', { value: 'Test' });

console.log(Object.getOwnPropertyDescriptor(test, 'name'));
// {value: 'Test', writable: false, enumerable: false, configurable: false}
// не указанные флаги становятся false

// изменим флаг writable

test = {
  name: 'Testing',
};

Object.defineProperty(test, 'name', { writable: false });

// ошибка вылезет только в строгом режиме, изменения все равно не будет
test.name = '123';

// изменений нет
console.log(test);

test = {
  name: 'Testing',
  toString() {
    return this.name;
  },
};

for (const key in test) {
  console.log(key); // name, toString
}

// запретим перечислять свойство
Object.defineProperty(test, 'name', { enumerable: false });

console.log('---------');

for (const key in test) {
  console.log(key); // toString
}

console.log(Object.keys(test)); // только toString

// неконфигурируемое свойство
// пример - Math.PI

console.log(Object.getOwnPropertyDescriptor(Math, 'PI'));
// {value: 3.141592653589793, writable: false, enumerable: false, configurable: false}

test = {};

Object.defineProperty(test, 'name', {
  value: 'const',
  writable: false,
  configurable: false,
});

test.name = 123;

console.log(test.name); // 'const'

try {
  // ошибка, нельзя изменять атрибуты
  Object.defineProperty(test, 'name', {
    configurable: true,
  });
} catch (e) {
  console.error(e);
}

// ничего не поменялось
console.log(Object.getOwnPropertyDescriptor(test, 'name'));

// можно определять атрибуты для нескольких свойств

test = {};

Object.defineProperties(test, {
  name: { value: 'John', writable: false },
  surname: { value: 'Smith', writable: true },
});

// объект с атрибутами свойств
console.log(Object.getOwnPropertyDescriptors(test));

// умное копирование с флагами
const clone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(test)
);

// скопировались значения вместе с флагами не по ссылке!!!
console.log(clone);
console.log(Object.getOwnPropertyDescriptors(clone));

// множество методов для работы с этим всем

/*

Object.preventExtension(obj) - запрещает добавлять новые свойства

Object.seal(obj) - запрещает добавлять/удалять свойства, для всех свойств устанавливает configurable: false

Object.freeze(obj) - устанавливает для всех свойств configurable: false, writable: false

Object.isExtensible(obj) - возвращает false если добавление свойств запрещено

Object.isSealed(obj) - Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств установлено configurable: false.

Object.isFrozen(obj) - Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено configurable: false, writable: false.

*/
