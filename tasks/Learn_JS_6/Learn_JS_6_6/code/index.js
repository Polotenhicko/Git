function sliding(nums, k) {
  sliding.arr = [];
  if (nums.length >= k && k > 0) {
    for (let i = 0; i <= nums.length - k; i++) {
      sliding.arr.push(Math.max(...nums.slice(i, i + k)));
    }
  }
  return sliding.arr;
}

console.log(sliding([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
console.log(sliding([-7, -8, 7, 5, 7, 1, 6, 0], 4)); // [7, 7, 7, 7, 7]
console.log([7, 2, 4], 2); // [7, 4]
console.log([9, 11], 2); // [11]
console.log([], 1); // []
console.log([], -1); // []
