// [Дескрипторы, глава 7 learjs] Задача с собеса
// Сложность 2/10
// https://discord.com/channels/912379978677637211/964809721838174248/966706247967588413

const obj = {
  testProp: 123,
};

Object.defineProperty(obj, 'logTestProp', {
  value: function getValue() {
    return this.testProp;
  },
});

console.log(obj.logTestProp()); // expect 123
obj.testProp = 345;
console.log(obj.logTestProp()); // expect 345
