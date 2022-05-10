if (true) {
  var hello = 'hello';
}

console.log(hello); // hello

if (true) {
  let helloLet = 'let';
}

try {
  console.log(helloLet); // Ошибка
} catch (e) {
  console.error(e);
}

for (var i = 0; i < 10; i++) {
  true;
}

console.log(i); // 10

function test() {
  if (true) {
    var phrase = 'test';
  }

  console.log(phrase); // срабатывает и выводит "test"
}

test();
try {
  console.log(phrase); // Ошибка: phrase не определена
} catch (e) {
  console.error(e);
}

let user;
// let user; будет ошибка

var user2;
console.log(user2); // undefined
var user2;
console.log(user2); // undefined

var user3 = 123;
var user3;

console.log(user3); // 123

var user4 = 321;
var user4 = 567;

console.log(user4); // 567

function testing() {
  newPhrase = 223;

  var newPhrase;

  console.log(newPhrase); // 223
}

testing(); // 223

function testing_2() {
  name = 'Акр';
  if (false) {
    var name;
  }
  console.log(name); // Акр
}

testing_2(); // Акр

function sayHi() {
  console.log(phrase);

  var phrase = 'Привет';
}

sayHi(); // undefined
