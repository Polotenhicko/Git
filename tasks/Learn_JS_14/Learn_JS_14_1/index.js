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
// [[Get]] возвращает true, если значение было успешно удалено, иначе false
// и т.д.

// есть и другие примеры:
//
