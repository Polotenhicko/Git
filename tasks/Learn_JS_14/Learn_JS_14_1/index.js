// объект Proxy оборачивается вокруг другого объекта и
// может перехватывать (и даже обрабатывать) разные действия с ним
// например чтение/запись свойств и др.

// let proxy = new Proxy(target, handler)

// target - объект для которого делаем прокси, может быть чем угодно, даже функция
// handler - конфиг прокси: объект с ловушками (traps), методами, которые перехватывают разные операции
// например, ловушка get - для чтения свойства из target
// ловушка set - для записи свойств в target и т.д.

// при операциях над proxy если в handler имеется соотв ловушка, то она срабатывает
// и прокси может по своему обработать её, иначе действие будет сделано над оригиналом target

// пример

let target = {
  target: 'target',
};

let proxy = new Proxy(target, {}); // handler пустой

target.test = function () {
  return this;
};

console.log(proxy.test()); // Proxy {target: 'target', show: ƒ, test: ƒ}
console.log(target.test()); // {target: 'target', show: ƒ, test: ƒ}
console.log(proxy); // Proxy {target: 'target', show: ƒ, test: ƒ}
for (const key in proxy) {
  console.log(key); // target, test
}

// т.к. нет ловушки, то операции над proxy применяются к оригиналу target

// запись свойства proxy.test устанавливает значение из target
// чтение свойства из proxy.test возвращает значение из target
// итерации по proxy возвращает значения из target

// proxy это особый, экзотический объект без собственных свойств
// без handler он просто перенаправляет все операции на target

// для большинства действий с объектами в спеке есть внутренний метод на самом низком уровне
// [[Get]] для чтения свойств и [[Set]] для записи

// Ловушки перехватывают вызовы этих внутренних методов

// для каждого внутреннего метода есть ловушка
// можем добавить её в параметр handler при создании new Proxy

// внутренний метод       | ловушка                  | что вызывает

// [[Get]]                | get                      | чтение свойства
// [[Set]]                | set                      | запись свойства
// [[HasProperty]]        | has                      | оператор in
// [[Delete]]             | deleteProperty           | оператор delete
// [[Call]]               | apply                    | вызов функции
// [[Construct]]          | construct                | оператор new
// [[GetPrototypeOf]]     | getPrototypeOf           | Object.getPrototypeOf
// [[SetPrototypeOf]]     | setPrototypeOf           | Object.setPrototypeOf
// [[IsExtensible]]       | isExtensible             | Object.isExtensible
// [[PreventExtensible]]  | preventExtension         | Object.preventExtension
// [[DefineOwnProperty]]  | defineProperty           | Object.defineProperty/defineProperties
// [[GetOwnProperty]]     | getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor, for...in, Object.keys/values/entries
// [[OwnPropertyKeys]]    | ownKeys                  | Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for...in, Object.keys/values/entries

// JS налагает некоторые условия - инварианты на реализацию внутренних методов и ловушек

// большинство касается возвращаемых значений
// [[Set]] возвращает true, если значение было успешно записано, иначе false
// [[Delete]] возвращает true, если значение было успешно удалено, иначе false
// и т.д.

// есть и другие примеры:

// метод [[GetPrototypeOf]], применённый к прокси, должен вернуть то же значение, что и
// метод [[GetPrototypeOf]], применённый к оригинальному объекту.
// Т.е. прототип прокси - это прототип оригинала

// обычно используются ловушки на чтение/запись свойств

// чтобы перехватить операцию чтения, handler должен иметь метод get(target, property, receiver);
// target - это оригинальный объект который передали в конструкторе new Proxy
// property - имя свойства
// receiver - если свойство объекта является геттером, то receiver – это объект,
// который будет использован как this при его вызове. Обычно это сам объект прокси(или наследующий от него объект).
// Прямо сейчас нам не понадобится этот аргумент, подробнее разберём его позже.

// реализуем ловушку get для реализации значения по умолчанию
// при чтении несуществующего элемента вернётся 0

let arr = [1, 2, 3];

console.log(arr[3]); // undefined

// создаём конструктор прокси над arr
arr = new Proxy(
  arr,
  // handler над таргетом
  {
    // get - нащвание функции ловушки
    // target - наш объект
    // prop - свойство
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return 0;
    },
  }
);

console.log(arr[0]); // 1
console.log(arr[3]); // 0

// представим у нас есть объект-словарь с фразами английского и переводом на испанским

let dictionary = {
  Hello: 'Hola',
  Bye: 'Adiós',
};

console.log(dictionary.Hello); // 'Hola'
console.log(dictionary.Welcome); // undefined

// сделаем что будет возвращать

dictionary = new Proxy(dictionary, {
  get: (target, prop) => (prop in target ? target[prop] : prop),
});

console.log(dictionary.Welcome); // Welcome

// прокси перезаписывает переменную
// он должен заменить оригинал, никто не должен ссылаться на проксированный объект
// иначе можно запутаться

// хочу сделать исключение для чисел
// если добавляется значение иного типа, то будет ошибка

// Ловушка set происходит когда идёт запись свойства
// set(target, property, value, receiver)
// value - значение свойства
// receiver - аналогично get

let numbers = [];

numbers = new Proxy(numbers, {
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value;
      return true;
    }

    return false;
  },
});

// push ведь добавляет свойство, по сути set
// можем использовать методы!!
numbers.push(1); // добавилось
numbers.push(2); // добавилось

// добавилось
console.log(numbers.length); // 2

try {
  // вернёл ошибку из-за false
  numbers.push('aaaa'); // TypeError: 'set' on proxy: trap returned falsish for property '2'
} catch (e) {
  console.error(e);
}

// нужно соблюдать инварианты и в [[Set]] возвращать boolean
// если забыть, то будет TypeError

numbers = new Proxy(numbers, {
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value;
    }
  },
});

try {
  numbers.push(111);
} catch (e) {
  console.log(numbers); // Proxy {0: 1, 1: 2, 2: 111}
  // Добавилось из-за моей функции, но я не вернёл boolean и по этому TypeError
  console.error(e);
}

// Object.keys, for...in и большинство методов, работающих со списком свойств объект
// реализуют [[OwnPropertyKeys]] ловушки ownKeys
// Object.getOwnPropertyNames(obj) возвращает не-символьные ключи
// Object.getOwnPropertySymbols(obj) возвращает символьные ключи
// Object.keys/values() вернёт не-символьные ключи/значения с флагом enumerable true
// for...in перебирает не-символьные ключи с флагом enumerable true и ключи прототипов

// сделаем ловушку ownKeys чтобы цикл for...in и Object.keys/values пропускал свойства начинающиеся с _

let user = {
  name: 'John',
  age: 25,
  _password: 'qwerty222',
};

user = new Proxy(user, {
  ownKeys: (target) => Object.keys(target).filter((key) => !key.startsWith('_')),
});

for (const key in user) {
  console.log(key); // name, age
}

console.log(Object.keys(user)); // ['name', 'age']
console.log(Object.values(user)); // ['John', 25]

user = {};

// попробуем вернуть ключи, которых нет в объекте
user = new Proxy(user, {
  ownKeys: (target) => ['a', 'b', 'c'],
});

console.log(Object.keys(user)); // [] пусто
