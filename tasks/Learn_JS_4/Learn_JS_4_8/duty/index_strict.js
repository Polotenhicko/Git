'use strict';
console.log('//////////');
console.log('Дополнение: Что будет если возвращать не примитив (use strict):');

const _objTest = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string':
        console.log('symbol string');
        return obj;
        break;
      case 'number':
        console.log('symbol number');
        return obj;
        break;
      default:
        console.log('symbol default');
        return obj;
        break;
    }
  },
};

try {
  console.log(String(_objTest));
} catch (error) {
  // Ошибка, нельзя конвертировать объект в примитив
  console.error(error);
}

try {
  console.log(Number(_objTest));
} catch (error) {
  // Ошибка, нельзя конвертировать объект в примитив
  console.error(error);
}

try {
  console.log(_objTest + 3);
} catch (error) {
  // Ошибка, нельзя конвертировать объект в примитив
  console.error(error);
}

const _objTest1 = {
  name: 'Document',
  number: 100,
  toString() {
    console.log('to string');
    return obj;
  },
  valueOf() {
    console.log('value of');
    return obj;
  },
};

try {
  console.log(String(_objTest1));
} catch (error) {
  // Ошибка. Вызываются 2 метода, toString и valueOf, а потом ошибка
  console.error(error);
}

try {
  console.log(Number(_objTest1));
} catch (error) {
  // Ошибка. Вызываются 2 метода, toString и valueOf, а потом ошибка
  console.error(error);
}

// Результат тот же самый
