// moveToStart

const arr = [1, 2, 3, 4, 5];

function moveToStart(arr, n) {
  if (arr.length > n) {
    return arr.slice(-n).concat(arr.slice(0, -n));
  }
  return arr.slice();
}

console.log(arr); // [1, 2, 3, 4, 5]
console.log(moveToStart(arr, 1)); // [5, 1, 2, 3, 4]
console.log(moveToStart(arr, 2)); // [4, 5, 1, 2, 3]
console.log(moveToStart(arr, 3)); // [3, 4, 5, 1, 2]
console.log(moveToStart(arr, 4)); // [2, 3, 4, 5, 1]
console.log(moveToStart(arr, 5)); // [1, 2, 3, 4, 5]
console.log(moveToStart(arr, 6)); // [1, 2, 3, 4, 5]

function hasArrays(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) return true;
  }
  return false;
}

console.log(hasArrays(arr)); // false
console.log(hasArrays([1, 2, [], {}, true])); // true
console.log(hasArrays([1, 2, {}, true])); // false

function getNumbersByParity(arr, str) {
  return str === 'even'
    ? arr.filter((item) => item % 2 === 0)
    : arr.filter((item) => item % 2 !== 0);
}

console.log(getNumbersByParity([1, 2, 3, 4, 5], 'even')); // [2, 4]
console.log(getNumbersByParity([1, 2, 3, 4, 5], 'odd')); // [1, 3, 5]
