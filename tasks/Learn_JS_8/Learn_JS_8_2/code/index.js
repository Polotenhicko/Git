// сделать функцию нахождения числа элементов в массиве без свойства length
Array.prototype.size = function () {
  let count = 0;
  for (const item of this) {
    count++;
  }
  return count;
};

// сделать функцию группировки массива по функции
Array.prototype.groupBy = function (fn = (n) => n) {
  const map = new Map();
  this.forEach((item) => {
    const result = fn(item);
    map.has(result) ? map.set(result, map.get(result).concat(item)) : map.set(result, [item]);
  });
  return Object.fromEntries(map);
};

// '{"1":[1,1,1],"2":[2,2],"3":[3],"4":[4],"5":[5],"6":[6]}'
console.log(JSON.stringify([1, 2, 3, 2, 4, 1, 5, 1, 6].groupBy()));

//'{"0":[3,6],"1":[1,4,1,1],"2":[2,2,5]}'
console.log(
  JSON.stringify(
    [1, 2, 3, 2, 4, 1, 5, 1, 6].groupBy(function (a) {
      return a % 3;
    })
  )
);

console.log(
  JSON.stringify(
    ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].groupBy(function (
      a
    ) {
      return a.length;
    })
  )
);
