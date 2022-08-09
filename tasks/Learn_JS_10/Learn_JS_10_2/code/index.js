// напиши какой-нибудь класс UserData, которому ты скармливаешь Name, Surname, Username, Password и т.п.
// И для некорректно введённых данных выкидывай ошибки

class UserDataError extends Error {
  constructor(message, field) {
    super(message);
    this.name = this.constructor.name;
    this.field = field;
  }
}

class UserData {
  constructor({ username, password, email } = {}) {
    try {
      this.username = UserData._validUsername(username);
      this.password = UserData._validPassword(password);
      this.email = UserData._validEmail(email);
    } catch (e) {
      if (e instanceof UserDataError) {
        console.error(`Неверное поле: ${e.field}`);
        console.error(e.message);
        return {
          __proto__: UserData.prototype,
          username: '',
          password: '',
          email: '',
        };
      } else {
        throw e;
      }
    }
  }

  static #usernameMaxLength = 10;
  static #usernameMinLength = 3;

  static #passwordMaxLength = 16;
  static #passwordMinLength = 5;

  static _validUsername(username) {
    if (typeof username == 'string') {
      if (username.length >= this.#usernameMinLength && username.length <= this.#usernameMaxLength) {
        return username;
      } else {
        throw new UserDataError(
          `Ник должен быть от ${this.#usernameMinLength} до ${this.#usernameMaxLength} символов`,
          'username'
        );
      }
    } else {
      throw new UserDataError(`Ник должен быть строкой`, 'username');
    }
  }

  static _validPassword(password) {
    if (typeof password == 'string') {
      if (password.length >= this.#passwordMinLength && password.length <= this.#passwordMaxLength) {
        return password;
      } else {
        throw new UserDataError(
          `Пароль должен быть от ${this.#passwordMinLength} до ${this.#passwordMaxLength} символов`,
          'password'
        );
      }
    } else {
      throw new UserDataError(`Пароль должен быть строкой`, 'password');
    }
  }

  static _validEmail(email) {
    if (typeof email == 'string') {
      if (email.split('').includes('@')) {
        return email;
      } else {
        throw new UserDataError(`Почта должна содержать символ @`, 'email');
      }
    } else {
      throw new UserDataError(`Почта должна быть строкой`, 'email');
    }
  }
}

console.log(new UserData());
console.log('-----');
console.log(new UserData({ username: '1' })); // Ник должен быть от 3 до 10 символов
console.log('-----');
console.log(new UserData({ username: '123', password: '1234' })); // Пароль должен быть от 5 до 16 символов
console.log('-----');
console.log(new UserData({ username: '123', password: '12345', email: 'asdasd' })); // Почта должна содержать символ @
console.log('-----');
// UserData {username: '123', password: '12345', email: 'asdasd@'}
console.log(new UserData({ username: '123', password: '12345', email: 'asdasd@' }));
