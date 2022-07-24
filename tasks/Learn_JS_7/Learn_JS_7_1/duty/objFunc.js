console.log('|||||||||||||||||||||||||||||||');

let object = {};

Object.preventExtensions(object); // запрещает добавлять новые свойства в объект
console.log(Object.isExtensible(object)); // false, т.к. добавление св-в запрещено
object.test = 123; // ошибка в строгом режиме

console.log(object); // не изменился

object = {
  name: 'test',
};

Object.seal(object); // запрещает добавлять/удалять свойства, устанавливает для всех св-в configurable: false
console.log(Object.isSealed(object)); // true

object.test = 123;
delete object.name;
console.log(object.test); // undefined
console.log(object.name); // 'test'
// {value: 'test', writable: true, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(object, 'name'));

object = {
  name: 'test',
};

Object.freeze(object); // запрещает удалять/добавлять/изменять свойства в объекте, устанавливает
// writable: false, configurable: false
console.log(Object.isFrozen(object)); // true

object.test = 123; // не добавилось
console.log(object.test); // undefined
object.name = 'name'; // не изменилось
console.log(object.name); // 'test
delete object.name;
console.log(object); // {name: 'test'}

// {value: 'test', writable: false, enumerable: true, configurable: false}
console.log(Object.getOwnPropertyDescriptor(object, 'name'));
