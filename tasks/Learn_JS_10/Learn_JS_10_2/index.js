// создадим свою ошибку для json

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

try {
  throw new ValidationError('Ой ой');
} catch (e) {
  // ValidationError: Ой ой
  //   at index.js:11:9
  console.log(e);
}

let readUser = function (json) {
  const user = JSON.parse(json);

  const fnThrow = (field) => {
    if (!user[field]) throw new ValidationError(`Нет поля: ${field}`);
  };

  fnThrow('age');
  fnThrow('name');

  return user;
};

// рабочий пример с try/catch

try {
  const user = readUser('{"age": 39}');
} catch (e) {
  console.log();
  // можно проверять по e.nam === 'ValidationError'
  // но версия с instanceof лучше для масштабируемости
  if (e instanceof ValidationError) {
    console.error(`Неккоректные данные: ${e.message}`);
  } else if (e instanceof SyntaxError) {
    console.error(`Ошибка синтаксиса: ${e.message}`);
  } else {
    throw e; // неизвестная ошибка, пробросить исключение
  }
}

// класс слишком общий, много что может пойти не так
// сделаем более конкретный класс

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}

readUser = function (json) {
  const user = JSON.parse(json);

  const fnThrow = (field) => {
    if (!user[field]) throw new PropertyRequiredError(field);
  };

  fnThrow('age');
  fnThrow('name');

  return user;
};

console.log('---------');

try {
  const user = readUser('{"age": 30}');
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`Неверные данные: ${e.message}`);
    console.log(e.name); // PropertyRequiredError
    console.log(e.property); // name
  } else if (err instanceof SyntaxError) {
    console.log(`Ошибка синтаксиса JSON: ${err.message}`);
  } else {
    throw err; // неизвестная ошибка, повторно выбросит исключение
  }
}

// сделаем свой класс ошибки

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class TestError extends MyError {}

console.log(new TestError().name); // TestError

console.log('//////////');

// удобно делать обёртки для ошибок

// обёртка ReadError
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    // сама ошибка
    this.cause = cause;
    this.name = 'ReadError';
  }
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }

  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
}

readUser = function (json) {
  let user;

  // проверки на ошибку синтаксиса или просто ошибку
  try {
    // тут будет вылетать ошибка
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError('Синтаксическая ошибка', err);
    } else {
      throw err;
    }
  }

  // если ошибка валидации или просто ошибка
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError('Ошибка валидации', err);
    } else {
      throw err;
    }
  }
};

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    // ReadError: Синтаксическая ошибка
    // at readUser (index.js:134:13)
    // at index.js:153:3
    console.log(e);
    // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
    console.log('Исходная ошибка: ' + e.cause);
  } else {
    // или просто ошибка
    throw e;
  }
}

class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const err = new FormatError('ошибка');

console.log(err.message); // 'ошибка'
console.log(err.name); // 'FormatError'
console.log(err.stack); // stack

console.log(err instanceof FormatError); // true
console.log(err instanceof SyntaxError); // true
