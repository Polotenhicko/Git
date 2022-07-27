// сделать функцию добавления статических методов

function addStaticMethod(class_, name, method) {
  class_[name] = method;
  class_.prototype[name] = method.bind(class_);
}

class Class {
  static property = 'static';
  property = 'instance';
}

const obj = new Class();

console.log(Class.property); // 'static'
console.log(obj.property); // 'instance'

addStaticMethod(Class, 'foo', function () {
  return this.property;
});

console.log(Class.foo()); // 'static'
console.log(obj.foo()); // 'static'
