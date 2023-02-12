// Дан массив из типизированных массивов Uint8Array. Напишите функцию concat(arrays),
// которая объединяет эти массивы в один типизированный массив и возвращает его.

function concat(arrays) {
  const length = arrays.reduce((acc, item) => acc + item.length, 0);
  const typedArr = new Uint8Array(length);
  let index = 0;
  for (const arr of arrays) {
    arr.forEach((item) => (typedArr[index++] = item));
  }
  return typedArr;
}

// или

function concat2(arrays) {
  return new Uint8Array([...arrays].map((item) => Array.from(item)).flat());
}

let chunks = [new Uint8Array([0, 1, 2]), new Uint8Array([3, 4, 5]), new Uint8Array([6, 7, 8])];

console.log(Array.from(concat2(chunks)));
console.log(concat(chunks).constructor.name); // Uint8Array
