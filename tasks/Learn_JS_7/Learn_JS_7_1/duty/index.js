// 'use strict';

const obj = {
  testProp: this,
};

// в глобал контексте this всегда window
console.log(this == window); // true

console.log(obj.testProp == window); // true

console.log('///////');

// в function контексте this определяется window или undefined с use strict

function f() {
  console.log(this);
}

function f2() {
  'use strict';
  console.log(this);
}

f(); // window

f2(); // undefined

var a = 123;

const testObj = { a: 321 };

function test() {
  return this.a;
}

console.log(test()); // 123, т.е. от window

console.log(test.call(testObj)); // 321, т.е. от testObj

// в стрелочных функциях this устанавливается в контексте, где была создана функция

let ar = () => this;

console.log(ar()); // window

let user = {
  name: 123,
  f() {
    ar = () => this;
  },
  f2() {
    let x = () => this;
    return x;
  },
  f3() {
    return () => this;
  },
};

user.f(); // this = user

console.log(ar()); // user

let ff2 = user.f2();

console.log(ff2()); // user

console.log(user.f2()()); // user

let ff3 = user.f3();

console.log(ff3()); // user

console.log(user.f3()()); // user

// Со встречи

Array.prototype.copy = (n) => {
  console.log(this);
};

[123].copy(1); // window, т.к. для this используется global контекст
