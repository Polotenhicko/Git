function toAnotherSystem(number, system) {
  if (isFinite(number) && isFinite(system) && system >= 2 && system <= 36) {
    return (+number).toString(+system).toUpperCase();
  } else {
    return NaN;
  }
}

console.log(toAnotherSystem(3, 2)); // 11
console.log(toAnotherSystem(10, 16)); // A
console.log(toAnotherSystem(10, 1)); // NaN
console.log(toAnotherSystem(10, 37)); // NaN
console.log(toAnotherSystem('10', '16')); // A
console.log(toAnotherSystem('10A', 16)); // NaN
console.log(toAnotherSystem('0b11', 10)); // 3
