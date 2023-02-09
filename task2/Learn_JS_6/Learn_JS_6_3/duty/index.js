// Посмотреть различия значений у объекта и у рендера
let i = 0;

function count(resolve) {
  do {
    i++;
    document.body.innerHTML = i;
  } while (i % 1e3 != 0);

  if (i < 1e5) {
    // Идея что можем заново запросить элемент и посмотреть у него значения innerHTML
    // хотя проблема что этот тот же объект
    console.log(1, document.querySelector('body').innerHTML, i);
    queueMicrotask(() => count(resolve));
  } else {
    resolve();
    console.log('Готово');
  }
}

new Promise((resolve) => {
  count(resolve);
}).then(() => {
  let i = 0;
  function count(resolve) {
    do {
      i++;
      document.body.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e5) {
      // 2 пример
      // Все те же самые значения, т.к. функция выше работала также
      // Я хз как получить значения рендера в этой ситуации
      console.log(2, document.body.innerHTML, i);
      queueMicrotask(() => count(resolve));
    } else {
      resolve();
      console.log('готово');
    }
  }
  return new Promise((resolve) => {
    count(resolve);
  });
});
