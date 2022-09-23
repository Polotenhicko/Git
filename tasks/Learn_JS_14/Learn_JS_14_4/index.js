// некоторые способы вызова метода приводят к потере this
// да неужели

let user = {
  name1: 'John',
  hi() {
    console.log(this.name1);
  },
  bye() {
    console.log('Пока');
  },
};

user.hi(); // 'John'

(user ? user.hi : user.bye)(); // undefined

// в данном случае мы возвращаем просто функцию и вызываем её, а this = window
// точка возвращает не саму функцию, а спец значение ссылочного типа Reference Type

// когда скобки применяются к значению ссылочного типа, то они получают адекватно this