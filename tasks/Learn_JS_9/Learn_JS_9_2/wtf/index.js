class A {
  method() {
    return 1;
  }
}

// A {}
console.log(new A()); // экземпляр класса A

class B extends A {
  method2() {
    return 2;
  }
}

// B {}
console.log(new B()); // экземпляр класса B

// возьмём прототип класса B

// A {constructor: ƒ, method2: ƒ}
console.log(new B().__proto__); // экземпляр класса A ???

// разве js не делает просто B.prototype.__proto__ = A.prototype ???
console.log(B.prototype.__proto__ === A.prototype); // true

// learnjs
// Ключевое слово extends работает, используя прототипы.
// Оно устанавливает B.prototype.[[Prototype]] в A.prototype.
// Так что если метод не найден в B.prototype, JavaScript берёт его из A.prototype.
// ничего про то, что

B.prototype = {
  method2: 'aaa',
};

// видимо ещё нельзя переопределять prototype
console.log(B.prototype); // не поменялось

console.log(new B().__proto__); // всё тоже самое

// попробую у не наследуемого класса
class C {}

C.prototype = null;

console.log(new C().__proto__); // не меняется
