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
