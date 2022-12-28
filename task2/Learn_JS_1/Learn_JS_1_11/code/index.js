// Используйте JavaScript, чтобы найти координаты углов, обозначенных стрелками.
const field = document.getElementById('field');

// 1
console.log(field.getBoundingClientRect().left, field.getBoundingClientRect().top);

// 2
console.log(field.getBoundingClientRect().right, field.getBoundingClientRect().bottom);

// 3
console.log(
  field.getBoundingClientRect().left + field.clientLeft,
  field.getBoundingClientRect().top + field.clientTop
);

// 4
console.log(
  field.getBoundingClientRect().right - field.clientLeft,
  field.getBoundingClientRect().bottom - field.clientTop
);

// или

console.log(
  field.getBoundingClientRect().left + field.clientLeft + field.clientWidth,
  field.getBoundingClientRect().top + field.clientTop + field.clientHeight
);
