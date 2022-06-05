const user = {
  firstName: 'user',
  logName() {
    console.log(this.firstName);
  },
};

setTimeout(user.logName, 500); // undefined, т.к. this потерялся

// Можно решить это при помощи функции-обёртки
// Но всё может сломать если перезаписать user

setTimeout(() => {
  try {
    user.logName();
  } catch (error) {
    console.error(error); // user.logName is not a function
  }
}, 500);

user.logName = 123;

function logName() {
  console.log(this.firstName);
}

// Можно забиндить контекст
const bindFunc = logName.bind(user);

bindFunc(); // 'user'

// Даже сразу при создании
const test = function (phrase) {
  console.log(phrase, this.firstName);
}.bind(user);

// аргументы тоже передаются
test('Фраза:'); // 'Фраза: user'

// Теперь с timeout

user.logNameTest = function () {
  console.log(this.firstName);
};

// Работает
setTimeout(user.logNameTest.bind(user), 1e3);

// Для стрелочных всё по прежнему
user.test = () => console.log(this);

let aboba = user.test.bind(user);
aboba();

// Частичное применение

function mul(a, b) {
  return a * b;
}

let double = mul.bind(undefined, 2);

console.log(double(2)); // 4
console.log(double(3)); // 6
