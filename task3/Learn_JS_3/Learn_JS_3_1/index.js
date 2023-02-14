// ооо да, сейчас я буду обмазываться сетевыми запросами после работы с бинарными данными

// JavaScript может отправлять сетевые запросы на сервер и подгружать новую информацию по мере необходимости.
// Для сетевых запросов из JavaScript есть широко известный термин «AJAX» (аббревиатура от Asynchronous JavaScript And XML)

// Есть несколько способов делать сетевые запросы и получать информацию с сервера.

// Метод fetch() — современный и очень мощный
// Он не поддерживается старыми (можно использовать полифил), но поддерживается всеми современными браузерами.

// let promise = fetch(url, [options])
// url – URL для отправки запроса.
// options – дополнительные параметры: метод, заголовки и так далее.

// Без options это простой GET-запрос, скачивающий содержимое по адресу url.

// Процесс получения ответа обычно происходит в два этапа.

// Во-первых, promise выполняется с объектом встроенного класса Response в качестве результата,
// как только сервер пришлёт заголовки ответа.
// На этом этапе мы можем проверить статус HTTP-запроса и определить, выполнился ли он успешно,
//  а также посмотреть заголовки, но пока без тела ответа.

// Промис завершается с ошибкой, если fetch не смог выполнить HTTP-запрос,
// например при ошибке сети или если нет такого сайта.HTTP - статусы 404 и 500 не являются ошибкой.

// Мы можем увидеть HTTP-статус в свойствах ответа:

// status – код статуса HTTP-запроса, например 200.
// ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.

(async () => {
  let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  console.log(response);
  if (response.ok) {
    const json = await response.json();
    console.log(json); // валидный json
  } else {
    console.log('Ошибка HTTP: ', response.status);
  }

  response = await fetch('https://jsonplaceholder.typicode.com/todos/-1');
  if (response.ok) {
    const json = await response.json();
    console.log(json);
  } else {
    console.log('Ошибка HTTP: ', response.status); // 404
  }
})();

// Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.
// Response предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:

// response.text() – читает ответ и возвращает как обычный текст,
// response.json() – декодирует ответ в формате JSON,
// response.formData() – возвращает ответ как объект FormData
// response.blob() – возвращает объект как Blob (бинарные данные с типом),
// response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных),

// помимо этого, response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям

// Например, получим JSON-объект с последними коммитами из репозитория на GitHub:
(async () => {
  const url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
  const response = await fetch(url);

  const commits = await response.json();
  console.log(commits[0].author.login); // iliakan
})();

// С промисами без await

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then((response) => response.json())
  .then((commits) => console.log(commits[0].author.login)); // iliakan

// Чтобы получить текст - response.text()

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then((response) => response.text())
  .then((result) => console.log(result.slice(0, 80)));

// В качестве примера работы с бинарными данными, давайте запросим и выведем на экран логотип спецификации «fetch»

fetch('./s.svg')
  .then((response) => response.blob())
  .then((blob) => {
    const img = document.createElement('img');
    img.style = 'position:fixed;top:10px;left:10px;width:100px';
    document.body.append(img);

    img.src = URL.createObjectURL(blob);

    setTimeout(() => {
      // прячем через три секунды
      img.remove();
      URL.revokeObjectURL(img.src);
    }, 3000);
  });

// Мы можем выбрать только один метод чтения ответа.

// Заголовки ответа хранятся в похожем на Map объекте response.headers.

// Это не совсем Map, но мы можем использовать такие же методы, как с Map, чтобы получить заголовок
// по его имени или перебрать заголовки в цикле:

fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits').then((response) => {
  console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8
  for (const item of response.headers) {
    console.log(item); // массив типа ['content-length', '278'] и т.д.
  }
});

// Для установки заголовка запроса в fetch мы можем использовать опцию headers. Она содержит объект с исходящими заголовками, например:

fetch('url', {
  headers: {
    Authentication: 'secret',
  },
});

// Есть список запрещённых для установки заголовков
// Не хочу их копипастить
// Эти заголовки обеспечивают достоверность данных и корректную работу протокола HTTP,
// поэтому они контролируются исключительно браузером.

// POST-запросы

// Для отправки POST-запроса или запроса с другим методом, нам необходимо использовать fetch параметры:

// method – HTTP метод, например POST,
// body – тело запроса, одно из списка:
//  строка (например, в формате JSON),
//  объект FormData для отправки данных как form/multipart,
//  Blob/BufferSource для отправки бинарных данных,
//  URLSearchParams для отправки данных в кодировке x-www-form-urlencoded, используется редко.

// Например, этот код отправляет объект user как JSON:

const user = {
  name: 'John',
  surname: 'Smith',
};

fetch('./article/fetch/post/user', {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  method: 'POST',
  body: JSON.stringify(user),
})
  .then((response) => response.json())
  .then(console.log);

// Если body - строка, то заголовок Content-Type по умолчанию будет таким:
// text/plain;charset=UTF-8.

// Но, так как мы посылаем JSON, то используем параметр headers для отправки вместо этого application/json,
// правильный Content - Type для JSON.

// Мы можем отправить бинарные данные при помощи fetch, используя объекты Blob или BufferSource.

// В этом примере есть элемент <canvas>, на котором мы можем рисовать движением мыши.
// При нажатии на кнопку «Отправить» изображение отправляется на сервер:

canvasElem.onmousemove = function (e) {
  const ctx = canvasElem.getContext('2d');
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
};

submit.onclick = async function (e) {
  const blob = new Promise((resolve) => canvasElem.toBlob(resolve, 'image/png'));
  console.log(blob);
  const response = await fetch('https://learn.javascript.ru/fetch/article/fetch/post/image', {
    method: 'POST',
    body: blob,
  });
  const result = await response.json();
  console.log(result.message);
};

// Не нужно устанавливать Content-Type, т.к. blob имеет установленный image/png
