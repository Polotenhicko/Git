let title = 'Document';

console.log(title.toLowerCase()); // 'document'

console.log(typeof title); // string

console.log(String('title').toUpperCase()); // 'TITLE'

let text = new String(123);
console.log(String(text)); // '123'

let value = new Number(0);
console.log(!!value); // true

value = Number(0);
console.log(!!value); // false
