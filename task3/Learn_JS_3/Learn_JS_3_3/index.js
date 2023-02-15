// Метод fetch позволяет отслеживать процесс получения данных.

// Заметим, на данный момент в fetch нет способа отслеживать процесс отправки.
// Для этого используйте XMLHttpRequest, позже мы его рассмотрим.

// Чтобы отслеживать ход загрузки данных с сервера, можно использовать свойство response.body.
// Это ReadableStream(«поток для чтения») – особый объект, который предоставляет тело ответа по частям, по мере поступления.

// В отличие от response.text(), response.json() и других методов, response.body даёт полный контроль над процессом чтения,
// и мы можем подсчитать, сколько данных получено на каждый момент.

// Пример
(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(`Получено ${value.length} байт`);
  }
})();

// Результат вызова await reader.read() – это объект с двумя свойствами:

// done – true, когда чтение закончено, иначе false.
// value – типизированный массив данных ответа Uint8Array.

// Streams API также описывает асинхронный перебор по ReadableStream, при помощи цикла for await..of, но он пока слабо поддерживается

// Мы получаем новые фрагменты данных в цикле, пока загрузка не завершится, то есть пока done не станет true.
// Чтобы отслеживать процесс загрузки, нам нужно при получении очередного фрагмента прибавлять его длину value к счётчику.

(async () => {
  const response = await fetch(
    'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100'
  );
  const reader = response.body.getReader();

  // получаем длину содержимого ответа
  const contentLength = +response.headers.get('Content-Length');

  let receivedLength = 0; // количество байт, полученных на данный момент
  let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log(`Получено ${receivedLength} из ${contentLength}`);
  }

  // соединим фрагменты в общий типизированный массив Uint8Array
  const chunksAll = new Uint8Array(receivedLength);
  let pos = 0;

  for (const chunk of chunks) {
    chunksAll.set(chunk, pos);
    pos += chunk.length;
  }

  // декодируем Uint8Array обратно в строку
  const result = new TextDecoder('utf-8').decode(chunksAll);
  const commits = JSON.parse(result);
  console.log(commits[0].author.login);
})();

// Обратите внимание, что мы не можем использовать одновременно оба эти метода для чтения одного и того же ответа:
// либо обычный метод response.json(), либо чтение потока response.body.

// Заголовок Content-Length может быть нечитаемым, зависит от ответа сайта
