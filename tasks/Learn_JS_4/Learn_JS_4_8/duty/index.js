// При преобразовании объекта в примитив, первым ищется метод Symbol.toPrimitive

const obj = {
  name: 'Document',
  number: 100,
  default: 'это дефолт',
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string':
        console.log('symbol string');
        return this.name;
        break;
      case 'number':
        console.log('symbol number');
        return this.number;
        break;
      default:
        console.log('symbol default');
        return this.default;
        break;
    }
  },
  toString() {
    console.log('to string');
    return this.name;
  },
  valueOf() {
    console.log('value of');
    return this.number;
  },
};

console.log(String(obj));
console.log(Number(obj));
console.log(obj + ' 3 ');

console.log('-----------');

// Если данный метод отсутствует, то js дальше ищет методы, смотря на хинт
// Если хинт == 'string', то ищет методы по последовательности toString -> valueOf
// Если хинт == 'number' или 'default', то последовательность valueOf -> toString

let objTest = {
  name: 'Document',
  number: 100,
  default: 'это дефолт',
  toString() {
    console.log('to string');
    return this.name;
  },
  valueOf() {
    console.log('value of');
    return this.number;
  },
};

console.log(String(objTest));
console.log(Number(objTest));
console.log(objTest + ' 3 ');

console.log('-----------');

// Если valueOf не будет, то использоваться будет только toString

objTest = {
  name: 'Document',
  number: 100,
  default: 'это дефолт',
  toString() {
    console.log('to string');
    return this.name;
  },
};

console.log(String(objTest));
console.log(Number(objTest));
console.log(objTest + ' 3 ');

console.log('-----------');

// valuesOf работает только с number и defolt

objTest = {
  name: 'Document',
  number: 100,
  default: 'это дефолт',
  valueOf() {
    console.log('value of');
    return this.number;
  },
};

console.log(String(objTest));
console.log(Number(objTest));
console.log(objTest + ' 3 ');

console.log('---------');

//Проверка, в обоих ли случаях сложения (с числом и со строкой) хинт будет дефолтом

console.log(obj + ' сложение со строкой'); // default
console.log(obj + 34); // default

console.log('---------');

objTest = {
  name: 'Document',
  number: 100,
  default: 'это дефолт',
  toString() {
    console.log('to string');
    return this.name;
  },
  valueOf() {
    console.log('value of');
    return this.number;
  },
};

console.log(objTest + ' сложение со строкой'); // default valueOf
console.log(objTest + 34); // default valueOf

console.log('--------');
console.log(
  'Дополнение: Что будет если возвращать не примитив (без use strict):'
);

objTest = {
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
  console.log(String(objTest));
} catch (error) {
  // Ошибка, нельзя конвертировать объект в примитив
  console.error(error);
}

try {
  console.log(Number(objTest));
} catch (error) {
  // Ошибка, нельзя конвертировать объект в примитив
  console.error(error);
}

try {
  console.log(objTest + 3);
} catch (error) {
  // Ошибка, нельзя конвертировать объект в примитив
  console.error(error);
}

const objTest1 = {
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
  console.log(String(objTest1));
} catch (error) {
  // Ошибка. Вызываются 2 метода, toString и valueOf, а потом ошибка
  console.error(error);
}

try {
  console.log(Number(objTest1));
} catch (error) {
  // Ошибка. Вызываются 2 метода, toString и valueOf, а потом ошибка
  console.error(error);
}
