// Сортируйте и упорядочивайте людей по возрасту с помощью стрелочных функций

// https://www.codewars.com/kata/559f3e20f4f29869cf0000ea

const orderPeople = function orderPeople(people) {
  return people.sort((personA, personB) => personA.age - personB.age); //complete this function
};

console.log(
  orderPeople([
    { age: 83, name: 'joel' },
    { age: 46, name: 'roger' },
    { age: 99, name: 'vinny' },
    { age: 26, name: 'don' },
    { age: 74, name: 'brendan' },
  ])
);

// Перемещение чисел в двумерном массиве по направлению

// https://www.codewars.com/kata/572af273a3af3836660014a1

function infiniteLoop(arrCopy, d, n) {
  const arr = arrCopy.slice(0);
  const dirRight = d == 'right' ? true : false;
  while (n--) {
    arr.forEach((itemArr, indexArr) => {
      if (dirRight) {
        if (indexArr == arr.length - 1) {
          arr[0].unshift(itemArr.pop());
        } else {
          arr[indexArr + 1].unshift(itemArr.pop());
        }
      } else {
        if (!indexArr) {
          arr[arr.length - 1].push(itemArr.shift());
        } else {
          arr[indexArr - 1].push(itemArr.shift());
        }
      }
    });
  }
  return arr;
}

console.log(
  infiniteLoop(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    'right',
    2
  )
);
console.log(
  infiniteLoop(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    'left',
    4
  )
);
