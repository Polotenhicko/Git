// returns new array with these rules:
//
// [1,2,3].copy(2) // [1,2,3,1,2,3]
// [4].copy(3) // [4,4,4]
// [1,2,3].copy(1) // [1,2,3]
// [1,2,3].copy(-1) // []
// [1,2,3].copy(0) // []
// [1,2,3].copy() // [1,2,3]

// https://discord.com/channels/912379978677637211/964809721838174248/972429081213820948

Array.prototype.copy = function copy(n = 1) {
  const arr = [];
  while (n-- > 0) {
    arr.push(...this);
  }
  return arr;
};

console.log([1, 2, 3].copy(2));
console.log([4].copy(3)); // [4,4,4]
console.log([1, 2, 3].copy(1)); // [1,2,3]
console.log([1, 2, 3].copy(-1)); // []
console.log([1, 2, 3].copy(0)); // []
console.log([1, 2, 3].copy()); // [1,2,3]
