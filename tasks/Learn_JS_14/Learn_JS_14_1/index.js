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

// чекает дескриптор у user['a'], user['b'], user['c']
// его нет, поэтому и массив в итоге пустой

console.log('---------');

user = {
  0: 'aaaa',
};

user = new Proxy(user, {
  // вернутся такие ключи
  ownKeys: () => ['a', 'b', 'c', '0'],
  getOwnPropertyDescriptor(target, prop) {
    // 3 undefined,
    // { value: 'aaaa', writable: true, enumerable: true, configurable: true }
    // есть такой дескриптор
    console.log(Object.getOwnPropertyDescriptor(target, prop));
  },
});

// чтобы определить, есть ли флаг enumerable, вызывает проверку дескриптора
// а мы можем и это перехватить через ловушку getOwnPropertyDescriptor
console.log(Object.keys(user)); // [] ничё не вернул

// сделаем прокси для защиты свойств с _

// след ловушки:
// get при чтении
// set при записи
// deleteProperty при удалении
// ownKeys чтобы исключить такие свойства из for...in и Object.keys

user = {
  name: 'John',
  method() {
    return this;
  },
  checkPass(value) {
    return value === this._password;
  },
  _password: 'qwerty123',
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error('Отказ в доступе');
    }
    const item = target[prop];
    // если просто вернём функцию, то слетит контекст
    return typeof item === 'function' ? item.bind(target) : item;
  },
  set(target, prop, value) {
    if (prop.startsWith('_')) {
      throw new Error('Отказ в доступе');
    }
    // сетим и возвращаем true, если не вернуть, то будет ошибка
    target[prop] = value;
    return true;
  },
  deleteProperty(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error('Отказ в доступе');
    }
    // удаляем и возвращаем true
    delete target[prop];
    return true;
  },
  ownKeys(target) {
    // возвращаем массив ключей
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

try {
  console.log(user._password); // Error: Отказано в доступе
} catch (e) {
  console.error(e.message);
}

// "set" не позволяет записать _password
try {
  user._password = 'test'; // Error: Отказано в доступе
} catch (e) {
  console.error(e.message);
}

// "deleteProperty" не позволяет удалить _password
try {
  delete user._password; // Error: Отказано в доступе
} catch (e) {
  console.error(e.message);
}

// "ownKeys" исключает _password из списка видимых для итерации свойств
for (let key in user) console.log(key); // name

console.log(user.method()); // {name: 'John', _password: 'qwerty123', method: ƒ, checkPass: ƒ}
console.log(user.checkPass('qwerty123')); // true

// если без bind, то внутри функций this - это прокси наш и тогда результат будет такой
// console.log(user.method()); // Proxy {name: 'John', _password: 'qwerty123', method: ƒ, checkPass: ƒ}
// тут попытаемся обратиться к Proxy._password, выозов ловушки геттера и отказ
// console.log(user.checkPass('qwerty123')); // Uncaught Error: Отказ в доступе

// такой себе прокси, могут быть путаницы при разных ситуациях
// если мы проксируем несколько раз или передаём объект и т.п.
// не везде стоит такой прокси использовать

// ещё пример

let range = {
  start: 1,
  end: 10,
};

// хочу чтобы in показывал что число входит в диапозон

// has(target, property)

range = new Proxy(range, {
  has: (target, prop) => prop >= target.start && prop <= range.end,
});

console.log(2 in range); // true
console.log(11 in range); // false

// попробуем оборачивать функции
// apply(target, thisArg, args)
// thisArg - контекст this
// args - список аргументов

// поменяем delay

let delay = function delay(f, ms) {
  // возвращает обёртку, которая вызывает функцию f через таймаут
  return function () {
    // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
};

// проблема что мы теряем свойства name, length при обёртывании

function sayHi(user) {
  console.log(`Hi, ${user}`);
}

console.log(sayHi.length); // 1

sayHi = delay(sayHi, 1e3);

console.log(sayHi.length); // 0 !!!!

delay = function delay(f, ms) {
  return new Proxy(f, {
    // передаём функцию и это работает
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    },
  });
};

sayHi = function (user) {
  console.log(`Hi, ${user}`);
};

sayHi = delay(sayHi, 1e3);

console.log(sayHi.length); // 1

sayHi('John'); // Hi, John

// Reflect - встроенный объект, упрощающий создания прокси
// ура ебать, я дожил до него
// ахуеть, 400 строк теории, впервые такое

// [[Get]], [[Set]] и т.п. существуют только в спеке и нельзя к ним обратиться
// Reflect позволяет обойти это

// его методы - минимальные обёртки вокруг внутренних методов

// примеры
// операция           Выозов Reflect                    Внутренний метод
// obj[prop]          Reflect.get(obj, prop)            [[Get]]
// obj[prop] = value  Reflect.set(obj, prop, value)     [[Set]]
// delete obj[prop]   Reflect.deleteProperty(obj, prop) [[Delete]]
// new F(value)       Reflect.construct(F, value)       [[Construct]]

user = {};

// вызываем операцию [[Set]] как функцию Reflect.set
// но важно другое
Reflect.set(user, 'name', 'John');

console.log(user.name); // 'John'

// для каждого внутреннего метода, перехватываемого Proxy,
// есть соотв метод в Reflect, который имеет то же имя и те же аргументы, что и у ловушки Proxy

// поэтому мы можем использовать Reflect чтобы перенаправить операцию на исходный объект

// пример с прозрачными get, set

user = {
  name: 'Василий',
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`);
    // читает свойство объекта, а мы возвращаем
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}`);
    // Reflect.set записывает свойство и возвращает true при успехе
    return Reflect.set(target, prop, val, receiver);
  },
});

// т.е. если хотим перенаправить вызов на объект, то вызываем Reflect
// большинство можно и без этого, но есть нюансы

// рассмотрим пример, где видно что Reflect.get крутой
// и зачем нужен receiver

// допустим есть свойство _name и геттер для него

user = {
  _name: 'Гость',
  get name() {
    return this._name;
  },
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  },
});

// всё прозрачно, вроде ок
console.log(userProxy.name); // Гость

// усложним пример

// унаследуем от проксированного user объект admin

let admin = {
  __proto__: userProxy,
  _name: 'Админ',
};

// понятное дело почему не то, что ожидаем
console.log(admin.name); // 'Гость'

// для таких случаев нужен receiver
// в нём хранится ссылка на правильный контекст this, который нужно передать геттеру
// просто так не понять что у нас геттер или просто свойство, поэтому передаём в Reflect

userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    // receiver = admin
    return Reflect.get(target, prop, receiver);
  },
  // или короче
  // get(target, prop, receiver) {
  //   return Reflect.get(...arguments);
  // },
});

admin = {
  __proto__: userProxy,
  _name: 'Админ',
};

console.log(admin.name); // 'Админ'

// прокси - идеальное средство для настройки поведения объектов на самом низком уровне
// но есть ограничения

// многие встроенные объекты используют "внутренние слоты"
// это как свойства, но только для внутреннего использования в самой спеке

// например Map хранит элементы во внутреннем слоте [[MapData]]
// встроенные методы обращаются к слотам напрямую, не через [[Get]], [[Set]]
// таким образом, прокси не может перехватить это

// и вот сам нюанс, так как эти обращения идут к внутреннему слоту, то проксированный метод объекта не заработает

let map = new Map();

proxy = new Proxy(map, {});

try {
  // не можем обратиться к внутреннему слоту
  // .set пытается обратиться к this.[[MapData]], которого нет у proxy
  proxy.set('лол', 'ошибка');
} catch (e) {
  // TypeError: Method Map.prototype.set called on incompatible receiver #<Map>
  console.error(e);
}

// мы можем это исправить

proxy = new Proxy(map, {
  get(target, prop, receiver) {
    const value = Reflect.get(...arguments);
    return typeof value === 'function' ? value.bind(target) : value;
  },
});

// теперь всё работает потому что мы привязали к оригинальному map
// когда this.[[MapData]], то будет всё ок
proxy.set('test', 1);
console.log(proxy.get('test')); // 1

// это не относится к Array
// он не использует слоты, т.к. давно уже тусит в js

// нечто похожее происходит с приватными полями классов

class User {
  #name = 'Гость';

  getName() {
    return this.#name;
  }
}

user = new User();
user = new Proxy(user, {});

try {
  // приватные поля реализуются при помощи внутренних слотов!!!! ахуеть
  console.log(user.getName());
} catch (e) {
  // TypeError: Cannot read private member #name from an object whose class did not declare it
  console.error(e);
}

user = new User();
// решение такое же как и в пред, привязка контекста
user = new Proxy(user, {
  get(target, prop, receiver) {
    const value = Reflect.get(...arguments);
    return typeof value === 'function' ? value.bind(target) : value;
  },
});

console.log(user.getName()); // 'Гость'

// но остались недостатки, методу передаётся оригинальный объект
// а он может быть передан куда-то ещё

// отключаемые прокси - прокси, который может быть отключён вызовом специальной функции
// допустим у нас есть какой-то ресурс и мы бы хотели закрыть к нему доступ в любой момент
// можем использовать отключаемый прокси, без ловушек
// такой прокси будет передавать все операции на проксируемый объект и мы сможем отключить его в любой момент

// let {proxy, revoke} = Proxy.revocable(target, handler)

let object = {
  data: 'Важная инфа',
};

let { proxy: proxy2, revoke } = Proxy.revocable(object, {});

console.log(proxy2.data); // 'Важные данные'

// удаляем все внутренние ссылки на оригинальный объект из прокси
revoke();
console.log(proxy2); // Proxy {}
console.log(object); // {data: 'Важная инфа'}

try {
  // а всё, удаляет ссылки на ориг объект из прокси
  console.log(proxy2.data);
} catch (error) {
  // TypeError: Cannot perform 'get' on a proxy that has been revoked
  console.error(error);
}

// можем хранить функцию revoke в WeakMap чтобы легко найти её по объекту прокси

let revokes = new WeakMap();

object = {
  data: 'Важная инфа',
};

let { proxy: proxy3, revoke: revoke3 } = Proxy.revocable(object, {});

revokes.set(proxy3, revoke3);

// ...

revoke3 = revokes.get(proxy3);

revoke3();

try {
  console.log(proxy3.data);
} catch (e) {
  // TypeError: Cannot perform 'get' on a proxy that has been revoked
  console.error(e);
}

// преимущество такого подхода в том, что мы не должны таскать функцию revoke3 повсюду
// мы получаем её по необходимости из WeakMap revokes

// Мы использовали WeakMap вместо Map, чтобы не блокировать сборку мусора.
// Если прокси объект становится недостижимым(то есть на него больше нет ссылок),
// то WeakMap позволяет сборщику мусора удалить его из памяти вместе с соответствующей функцией revoke,
// которая в этом случае больше не нужна.

// создать прокси, который генерирует ошибку при попытке прочитать несуществующее свойство

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(...arguments);
      } else {
        throw new Error('Ошибка');
      }
    },
  });
}

user = {
  name: 'John',
};

user = wrap(user);

console.log(user.name); // 'John'
try {
  console.log(user.age); // Ошибка
} catch (e) {
  console.error(e);
}

array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      prop = target.length + +prop;
    }
    return Reflect.get(target, prop, receiver);
  },
});

console.log(array[-1]);
console.log(array[-2]);
console.log(array.length); // 3

// Создайте функцию makeObservable(target), которая делает объект «наблюдаемым», возвращая прокси.

function makeObservable(target) {
  let handlersObserve = [];
  target.observe = (callback) => {
    handlersObserve.push(callback);
  };
  return new Proxy(target, {
    set(target, prop, value, receiver) {
      const set = Reflect.set(...arguments);
      if (set) {
        handlersObserve.forEach((fn) => fn(prop, value));
      }
      return set;
    },
  });
}

user = {};

user = makeObservable(user);

user.observe((key, value) => {
  console.log(`SET ${key} = ${value}`);
});

user.name = 'John'; // SET name = John
