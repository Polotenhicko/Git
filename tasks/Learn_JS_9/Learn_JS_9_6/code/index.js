function powerTypeof(value) {
  if (typeof value == 'object') {
    return Object.prototype.toString.call(value).split(' ')[1].split('').slice(0, -1).join('');
  }
  return typeof value;
}

console.log(powerTypeof(new Map())); // Map
console.log(powerTypeof({})); // Object
console.log(powerTypeof([])); // Array
console.log(powerTypeof(new Date())); // Date
console.log(powerTypeof(123)); // number
