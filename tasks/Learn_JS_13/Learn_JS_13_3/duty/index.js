import { fn, obj, test } from './test.js';

// исполняется test.js
// выводится {test: 'test'}

// нельзя переопределять импортированные переменные
try {
  test = 123;
} catch (e) {
  console.error(e); // TypeError: Assignment to constant variable.
}

// это не переопределяем
obj.test = 123;
console.log(obj); // {test: 123}

let a = 'index';

fn(); // 'test, {test: 123}'
