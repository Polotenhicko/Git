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
