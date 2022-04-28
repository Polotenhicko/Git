// Массив является итерируемым объектом
let arr = [1, 2, 3, 4];

// У него есть символ итератор

let iterator = arr[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value);
}

// Итерируемый объект не является массивом
