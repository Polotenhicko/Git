{
  let a = 10;

  // Функция была инициализирована при создании лексического окружения
  function showA() {
    // Внешняя ссылка указывает на глобальное окружение
    console.log(a);
  }

  function showFunc() {
    // Создаётся внутренняя переменная 'a'
    let a = 20;
    // showA внешняя ссылка не поменялась
    showA();
  }

  showFunc(); // 10
}
console.log('/////');
{
  let a = 10;

  // Функция была инициализирована при создании лексического окружения
  function showA() {
    // Внешняя ссылка указывает на глобальное окружение
    // Где родился, там и пригодился
    console.log(a);
  }

  function showFunc() {
    // Замыкаемся на переменной a и меняем её
    showA();
    a = 20;
    // showA внешняя ссылка не поменялась, а переменная 'a' поменялась
    showA();
  }

  showFunc(); // 10, 20
}
console.log('//////');
{
  let a = 10;

  function showA() {
    console.log(a);
  }

  function func() {
    let a = 20;
    // При копировании сохраняется лексическое окружение
    let test = showA;
    let test2 = function () {
      console.log(a);
    };
    showA(); // 10
    test(); // 10
    test2(); // 20
  }

  func();
}
console.log('/////////');
{
  function showA() {
    console.log(a);
  }

  function showB() {
    console.log(b);
  }

  function func() {
    // Для обратной совместимости, если при попытке доступа к переменной, код её не находит,
    // то создаётся новая глобальная переменная
    b = 20;

    showB(); // 20
    showA(); // Reference error
  }

  try {
    // Не смог найти 'a'
    func();
  } catch (e) {
    console.error(e);
  }
}
console.log('-------');
{
  function makeCounter() {
    let count = 0;

    return function () {
      return count++; // есть доступ к внешней переменной "count"
    };
  }

  let counter = makeCounter();

  console.log(counter()); // 0
  console.log(counter()); // 1
  console.log(counter()); // 2
}
console.log('Со встречи:');
{
  function test() {
    let a = 20;
    function aFunc() {
      console.log(a++);
    }
    return aFunc;
  }

  function test2() {
    const result = test();
    // После выполнения, лексическое окружение test() очищяется сборщиком мусора
    // т.к. нет ссылок на окружение
    test()(); // 20
    test()(); // 20
    // Здесь ссылка result остаётся, поэтому лексическое окружение не очищяется
    result(); // 20
    result(); // 21
  }

  test2();
}
console.log('Для function expression:');
// Всё тоже самое
{
  const test = function test() {
    let a = 20;
    const aFunc = function aFunc() {
      console.log(a++);
    };
    return aFunc;
  };

  const test2 = function test2() {
    const result = test();
    // После выполнения, лексическое окружение test() очищяется сборщиком мусора
    // т.к. нет ссылок на окружение
    test()(); // 20
    test()(); // 20
    // Здесь ссылка result остаётся, поэтому лексическое окружение не очищяется
    result(); // 20
    result(); // 21
  };

  test2();
}
console.log('arrow:');
// Те же правила для стрелочной функции
{
  const test = () => {
    let a = 20;
    const aFunc = function aFunc() {
      console.log(a++);
    };
    return aFunc;
  };

  const test2 = () => {
    const result = test();
    // После выполнения, лексическое окружение test() очищяется сборщиком мусора
    // т.к. нет ссылок на окружение
    test()(); // 20
    test()(); // 20
    // Здесь ссылка result остаётся, поэтому лексическое окружение не очищяется
    result(); // 20
    result(); // 21
  };

  test2();
  console.log('|||||');

  let a = 10;

  const showA = () => {
    console.log(a);
  };

  const func = () => {
    let a = 20;
    // При копировании сохраняется лексическое окружение
    let test = showA;
    let test2 = () => {
      console.log(a);
    };
    showA(); // 10
    test(); // 10
    test2(); // 20
  };

  func();
}
