'use strict';
const user = {
  firstName: 'Alex',
  lastName: 'Sidorov',
  childrens: ['Ananas Korkov', 'Svetlan Sinaev'],
  showChildrens() {
    console.group();
    this.childrens.forEach((child) =>
      console.log(`${this.firstName} ${this.lastName} has ${child}`)
    );
    console.groupEnd();
  },
  showChildrensAlt() {
    console.group();
    this.childrens.forEach(function (child) {
      try {
        console.log(`${this.firstName} ${this.lastName} has ${child}`);
      } catch (e) {
        console.error(e);
      }
    });
    console.groupEnd();
  },
};

user.showChildrens(); // Нормально выводит массив благодаря стрелочной функции

user.showChildrensAlt(); // Ошибка, т.к. this = undefined

// Стрелочная функция не может быть использована как конструктор
const arrowFunc = () => {
  this.title = 'title';
};

try {
  const newArrowFunc = new arrowFunc();
} catch (e) {
  console.error(e); // arrowFunc is not a constructor
}

// У стрелочной просто нет this, поэтому .bind не сработает
function showChilds() {
  console.group();
  this.childrens.forEach((child) =>
    console.log(`${this.firstName} ${this.lastName} has ${child}`)
  );
  console.groupEnd();
}

showChilds.bind(user)();

const showChildsAlt = () => {
  try {
    this.childrens.forEach((child) =>
      console.log(`${this.firstName} ${this.lastName} has ${child}`)
    );
  } catch (e) {
    console.error(e);
  }
};

// Не сработает
showChildsAlt.bind(user)();

// У стрелочных нет arguments

const argArrowFunc = () => {
  try {
    console.log(arguments);
  } catch (e) {
    console.error(e);
  }
};

function argFunc() {
  console.log(arguments);
}

argArrowFunc(1, 2); // arguments is not defined

argFunc(1, 2); // arguments есть

console.log('//////////');

const obj = {
  test: 123,
  methodArrow: () => {
    console.log(this.test);
  },
  method: function () {
    console.log(this.test);
    const arrow = () => {
      console.log(this.test);
    };
    arrow();
  },
};

obj.methodArrow(); // Ошибка при use strict, а так = undefined
obj.method(); // 123, 123

console.log('--------');

let testArrow;

const objTest = {
  test: 321,
  method() {
    testArrow = () => console.log(this.test);
  },
};

function Beer() {
  this.test = 123;
  this.arrow = () => {
    console.log(this.test);
  };
  this.method = function () {
    try {
      console.log(this.test);
    } catch (e) {
      console.error(e);
    }
    try {
      const meth = function () {
        console.log(this.test);
      };
      meth();
    } catch (e) {
      console.error(e);
    }
  };
}

const inst = new Beer();

inst.arrow(); // 123
inst.method(); // 123, ошибка

console.log('"""""""""""""""');

const test1 = inst.arrow;
const test2 = inst.method;

test1(); // 123 ???????
test2(); // ошибка, ошибка

objTest.method();

testArrow(); // 321, ахуеть

// Получается, переменная функция идёт по ссылке, а т.к. стрелочная функция
// берёт this снаружи, то и this берётся от туда, куда ведёт ссылка
