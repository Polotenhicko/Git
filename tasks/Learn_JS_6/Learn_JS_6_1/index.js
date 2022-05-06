// Обычный способ

function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

console.log(pow(3, 2)); // 9

// Рекурсивный способ

function pow(x, n) {
  return n == 1 ? x : x * pow(x, n - 1);
}

console.log(pow(2, 3)); // 8

const company = {
  // тот же самый объект, сжатый для краткости
  sales: [
    { name: 'John', salary: 1000 },
    { name: 'Alice', salary: 600 },
  ],
  development: {
    sites: [
      { name: 'Peter', salary: 2000 },
      { name: 'Alex', salary: 1800 },
    ],
    internals: [{ name: 'Jack', salary: 1300 }],
  },
};

// Функция для подсчёта суммы зарплат
function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0); // сумма элементов массива
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // рекурсивно вызывается для подотделов, суммируя результаты
    }
    return sum;
  }
}

console.log(sumSalaries(company)); // 6700

// Связанный список

let list = {
  value: '1',
  next: {
    value: '2',
    next: {
      value: '3',
      next: {
        value: '4',
        next: null,
      },
    },
  },
};

console.log(list);

list = { value: '1' };
list.next = { value: '2' };
list.next.next = { value: '3' };
list.next.next.next = { value: '4' };

console.log(list); // То же самое

let secondList = list.next;
list.next = null;

console.log(secondList); // 2,3,4
console.log(list); // 1

list.next = secondList;
console.log(list); // 1, 2, 3, 4

list = { value: 'New item', next: list };
console.log(list); // Добавлен новый item в начало списка

// Удалить 1

list.next = list.next.next;
console.log(list);

// Добавить ссылку на пред элемент

list = { value: '1' };
list.next = { value: '2', prev: list };
list.next.next = { value: '3', prev: list.next };
list.next.next.next = { value: '4', prev: list.next.next, next: null };

console.log(list);

// Через рекурсию
function sumTo(n) {
  return n == 1 ? n : n + sumTo(n - 1);
}

console.log(sumTo(1));
console.log(sumTo(2));
console.log(sumTo(3));
console.log(sumTo(4));
console.log(sumTo(100));

// Через цикл
console.log('//////');

function sumTo2(n) {
  let number = 1;
  while (n != 1) {
    number += n--;
  }
  return number;
}

console.log(sumTo2(1));
console.log(sumTo2(2));
console.log(sumTo2(3));
console.log(sumTo2(4));
console.log(sumTo2(100));

// Формула:
console.log('//////');
function sumTo3(n) {
  return (n * (n + 1)) / 2;
}

console.log(sumTo2(1));
console.log(sumTo2(2));
console.log(sumTo2(3));
console.log(sumTo2(4));
console.log(sumTo2(100));

function factorial(n) {
  return n == 1 ? n : n * factorial(n - 1);
}

console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(5));

console.log('///////');

function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

console.log(fib(3)); // 2
console.log(fib(4)); // 3
console.log(fib(5)); // 5
console.log(fib(7)); // 13
console.log(fib(77)); // 5527939700884757

console.log('////////');

list = {
  value: '1',
  next: {
    value: '2',
    next: {
      value: '3',
      next: {
        value: '4',
        next: null,
      },
    },
  },
};
// Рекурсия
function printList(list) {
  console.log(list.value);
  if (list.next) printList(list.next);
}

printList(list);

// Цикл

function printList2(list) {
  // console.log(list.value);
  // let next = list.next;
  // while (next) {
  //   console.log(next.value);
  //   next = next.next;
  // }

  while (list) {
    console.log(list.value);
    list = list.next;
  }
}

console.log('-----');

printList2(list);

// Вывод списка в обратном порядке
console.log('////////');

// Цикл
function printListFromEnd(list) {
  // const arr = [];
  // while (list) {
  //   arr.unshift(list.value);
  //   list = list.next;
  // }
  // arr.forEach((item) => console.log(item));
  let arr = [];

  while (list) {
    arr.push(list.value);
    list = list.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}

printListFromEnd(list);

console.log('---------');
// Рекурсия
function printListFromEnd2(list) {
  // if (!list.next) {
  //   console.log(list.value);
  //   return true;
  // } else {
  //   if (printListFromEnd2(list.next)) {
  //     console.log(list.value);
  //     return true;
  //   }
  // }

  if (list.next) {
    printListFromEnd2(list.next);
  }

  console.log(list.value);
}

printListFromEnd2(list);

// Сколько раз вызывалась рекурсия

function loop(n = 0) {
  try {
    if (n >= 0) {
      loop(n + 1);
    }
  } catch (error) {
    console.error(n);
  }
}

console.log('///////');
loop();
// 8987 вызова в хроме
// 22334 в firefox
// 8989 в edge
