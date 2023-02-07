// Почекать IntersectionObserver

// позволяет асинхронно следить за изменениями пересечения элемента с его родителями или областью видимости документа
// По мере роста веба, предыдущие методы замедляли работу браузера и были ненадёжными

// Появились ещё проблемы:
// Отложенная загрузка контента помере прокрутки страницы
// веб-сайты с бесконечным скроллом
// отчёт о видимости рекламы
// принятие решения о запуске анимации если пользователь видит или нет это

// Раньше обнаружение пересечений элементов находилось через циклы и события с использованием getBoundingClientRect
// Создавались проблемы с проивзодительностью

// Intersection Observer API даёт возможность зарегистрировать колбэк-функцию, которая выполнится при пересечении наблюдаемым элементом границ другого элемента
// Таким образом, больше нет необходимости вычислять пересечение элементов в основном потоке

// Observer API не позволит узнать точное число пикселей или определить конкретные пиксели в пересечении;
// однако, его использование покрывает наиболее частые сценарии вроде "Если элементы пересекаются на N%, сделай то-то".

// Степень пересечения целевого и корневого элемента задаётся в диапазоне от 0.0 до 1.0, где 1.0 это полное пересечение целевого элемента границ корневого.

// Создаём объект-наблюдатель
let options = {
  root: document.getElementById(''), // за кем мы следим
  rootMargin: '0px', // отступы вокруг root, прям как css margin
  threshold: 1.0, // означает что функция будет вызвана при 100% пересечения объекта
};
const callback = (entries, observer) => {
  // entries - объект с записями об изменениях
  entries.forEach((entry) => {
    // entry (запись) - изменение
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};

let observer = new IntersectionObserver(callback, options);

// пример

options = {
  // родитель целевого элемента - область просмотра
  root: null,
  rootMargin: '0px',
  // процент пересечения - половина изображения
  threshold: 0.5,
};
observer = new IntersectionObserver((entries, observer) => {
  // для каждой записи-целевого элемента
  entries.forEach((entry) => {
    // если элемент является наблюдаемым
    if (entry.isIntersecting) {
      const lazyImg = entry.target;
      // console.log(lazyImg);
      lazyImg.style.background = 'deepskyblue';
      // прекращаем наблюдение
      observer.unobserve(lazyImg);
    }
  });
}, options);

// с помощью цикла следим за всеми img на странице
const arr = document.querySelectorAll('.example');
arr.forEach((i) => {
  observer.observe(i);
});
