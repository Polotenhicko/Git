// Написать точную функцию по получению максимальной высоты/ширины
// Кроссбраузерность, суперкоддер
Object.defineProperties(HTMLHtmlElement.prototype, {
  maxScrollHeight: {
    get() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    },
  },
  maxScrollWidth: {
    get() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    },
  },
});

console.log(document.documentElement.maxScrollHeight); // 1216
console.log(document.documentElement.maxScrollWidth); // 1903
