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
