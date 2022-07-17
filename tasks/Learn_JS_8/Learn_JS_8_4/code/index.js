// Написать свой reverse
Array.prototype.reverse2 = function () {
  const max = (this.length / 2) % 2 == 0 ? this.length / 2 : Math.ceil(this.length / 2);
  let j = this.length - 1;
  for (let i = 0; i < max; i++, j--) {
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

console.log([].reverse2()); // []
console.log([1, 2].reverse2()); // [2,1]
console.log([1, 2, 3].reverse2()); // [3,2,1]
console.log([1, 2, 3, 4].reverse2()); // [4,3,2,1]
