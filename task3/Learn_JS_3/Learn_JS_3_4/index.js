// fetch возвращает промис. А в JavaScript в целом нет понятия «отмены» промиса.

// Для таких целей существует специальный встроенный объект: AbortController, который можно использовать для отмены не только fetch,
// но и других асинхронных задач.

// Использовать его достаточно просто:

// Шаг 1: создаём контроллер:
let controller = new AbortController();

// Он имеет единственный метод abort() и единственное свойство signal.
// При вызове abort():
//  генерируется событие с именем abort на объекте controller.signal
//  свойство controller.signal.aborted становится равным true.

// Все, кто хотят узнать о вызове abort(), ставят обработчики на controller.signal, чтобы отслеживать его.

controller = new AbortController();
let signal = controller.signal;

// ставим обработчик на signal
signal.addEventListener('abort', () => console.log('Отмена!'));

console.log(controller.signal.aborted); // false
controller.abort(); // Отмена!
console.log(controller.signal.aborted); // true

// Шаг 2:
// Передаём свойство signal опцией в fetch

controller = new AbortController();
fetch('/', {
  signal: controller.signal,
});

// Метод fetch умеет работать с AbortController, он слушает событие abort на signal.

// Шаг 3:
// Чтобы прервать выполнение fetch, вызовите controller.abort():

// controller.abort();
// Вот и всё: fetch получает событие из signal и прерывает запрос.

// Когда fetch отменяется, его промис завершается с ошибкой AbortError, поэтому мы должны обработать её, например, в try..catch:

// прервать через 1 секунду
controller = new AbortController();
// setTimeout(() => controller.abort());

(async () => {
  try {
    const response = await fetch('/', {
      signal: controller.signal,
    });
  } catch (e) {
    console.log(e, e.name); // DOMException: The user aborted a request. , 'AbortError'
    if (e.name == 'AbortError') {
      console.log('Прервали!');
    } else {
      throw e;
    }
  }
})();

// AbortController – масштабируемый, он позволяет отменить несколько вызовов fetch одновременно.

// Например, здесь мы запрашиваем много URL параллельно, и контроллер прерывает их все:

let urls = ['/tasks/NaN/', '/tasks/cloneDeep/', '/task2/Learn_JS_1/Learn_JS_1_1/']; // список URL для параллельных fetch
controller = new AbortController();
// setTimeout(() => controller.abort());

// если откуда-то вызвать controller.abort(),
// то это прервёт все вызовы fetch
let fetchJobs = urls.map((url) => fetch(url, { signal: controller.signal }));
(async () => {
  try {
    const results = await Promise.all(fetchJobs);
  } catch (e) {
    console.log(e.name); // AbortError
  }
})();

// Если у нас есть собственные асинхронные задачи, отличные от fetch,
// мы можем использовать один AbortController для их остановки вместе с fetch.
// Нужно лишь слушать его событие abort:

urls = ['/tasks/NaN/', '/tasks/cloneDeep/', '/task2/Learn_JS_1/Learn_JS_1_1/']; // список URL для параллельных fetch
controller = new AbortController();

const ourJob = new Promise((resolve, reject) => {
  // если сработает abort, то реджектимся
  controller.signal.addEventListener('abort', reject);
});

fetchJobs = urls.map((url) =>
  fetch(url, {
    // запросы fetch
    signal: controller.signal,
  })
);

(async () => {
  const results = await Promise.all([...fetchJobs, ourJob]);
})();
