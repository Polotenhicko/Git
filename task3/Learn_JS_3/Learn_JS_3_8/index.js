// XMLHttpRequest – это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы.

// Несмотря на наличие слова «XML» в названии, XMLHttpRequest может работать с любыми данными, а не только с XML
// На сегодняшний день не обязательно использовать XMLHttpRequest, так как существует другой, более современный метод fetch.

// В современной веб-разработке XMLHttpRequest используется по трём причинам:

// 1.По историческим причинам: существует много кода, использующего XMLHttpRequest, который нужно поддерживать.
//  То есть легаси
// 2. Необходимость поддерживать старые браузеры и нежелание использовать полифилы (например, чтобы уменьшить количество кода).
// 3. Потребность в функциональности, которую fetch пока что не может предоставить, к примеру, отслеживание прогресса отправки на сервер.

// XMLHttpRequest имеет два режима работы: синхронный и асинхронный.

// Асинхронный:

// Чтобы сделать запрос, нам нужно выполнить три шага:

// Создать XMLHttpRequest.

// у конструктора нет аргументов
let xhr = new XMLHttpRequest();

// Инициализировать его.

// xhr.open(method, URL, [async, user, password])

// method – HTTP-метод. Обычно это "GET" или "POST".
// URL – URL, куда отправляется запрос: строка, может быть и объект URL.
// async – если указать false, тогда запрос будет выполнен синхронно
// user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

// Вызов open лишь конфигурирует запрос, а не посылает его

// Чтобы послать запрос:
// xhr.send([body])
// Необязательный параметр body содержит тело запроса.

// Некоторые типы запросов, такие как GET, не имеют тела. А некоторые, как, например, POST, используют body,
// чтобы отправлять данные на сервер

// Слушать события на xhr, чтобы получить ответ.

// Три наиболее используемых события:

// load – происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.
// error – когда запрос не может быть выполнен, например, нет соединения или невалидный URL.
// progress – происходит периодически во время загрузки ответа, сообщает о прогрессе.

xhr = new XMLHttpRequest();
let url = new URL('https://shop.funlymc.ru/payment_qiwi.php');
url.searchParams.set('q', 'test');
xhr.open('GET', url);
xhr.send();

xhr.onload = () => {
  if (xhr.status == 200) {
    console.log('Загружено:', xhr.status, xhr.response, xhr.response.length, 'байт');
  } else {
    console.log('Ошибка:', xhr.status, xhr.statusText);
  }
};

xhr.onerror = () => {
  console.log('Ошибка запроса!');
};

xhr.onprogress = (e) => {
  // запускается переодически
  // e.loaded - кол-во загуженных байт
  // e.lengthComputable - true если сервер посылает заголовок Content-Length
  // e.total - кол-во байт всего (но только если e.lengthComputable = true)
  console.log('Загружено:', e.loaded, 'из', e.total, e.lengthComputable);
  // будет: Загружено : 9 из 0 false
  // т.к. нет Content-Length
};

// После ответа сервера мы можем получить результат запроса в следующих свойствах xhr:

// status
// Код состояния HTTP (число): 200, 404, 403 и так далее, может быть 0 в случае, если ошибка не связана с HTTP.

// statusText
// Сообщение о состоянии ответа HTTP (строка): обычно OK для 200, Not Found для 404, Forbidden для 403, и так далее.

// response (в старом коде может встречаться как responseText)
// Тело ответа сервера.

// Мы можем также указать таймаут – промежуток времени, который мы готовы ждать ответ:

// xhr.timeout = 10000; // таймаут указывается в миллисекундах, т.е. 10 секунд

// Если запрос не успевает выполниться в установленное время, то он прерывается, и происходит событие timeout.

// Тип ответа
// Мы можем использовать свойство xhr.responseType, чтобы указать ожидаемый тип ответа:

// "" (по умолчанию) – строка,
// "text" – строка,
// "arraybuffer" – ArrayBuffer (для бинарных данных, смотрите в ArrayBuffer, бинарные массивы),
// "blob" – Blob (для бинарных данных, смотрите в Blob),
// "document" – XML-документ (может использовать XPath и другие XML-методы),
// "json" – JSON (парсится автоматически).

// К примеру ждём ответ json
xhr.onload = null;
xhr.onprogress = null;

xhr = new XMLHttpRequest();
xhr.open('GET', 'https://shop.funlymc.ru/payment_qiwi.php');
xhr.responseType = 'json';
xhr.send();

xhr.onload = () => {
  const responseObj = xhr.response;
  console.log(responseObj);
  // выведет спаршенный json
  // иначе null
};

// xhr.responseText и xhr.responseXML существуют по историческим причинам, раньше с их помощью получали строки или XML-документы
// Сегодня следует устанавливать желаемый тип объекта в xhr.responseType и получать xhr.response, как показано выше.

// Состояния запроса
// У XMLHttpRequest есть состояния, которые меняются по мере выполнения запроса.
// Текущее состояние можно посмотреть в свойстве xhr.readyState.

// Список всех состояний, указанных в спецификации:

UNSENT = 0; // исходное состояние
OPENED = 1; // вызван метод open
HEADERS_RECEIVED = 2; // получены заголовки ответа
LOADING = 3; // ответ в процессе передачи (данные частично получены)
DONE = 4; // запрос завершён

// Состояния объекта XMLHttpRequest меняются в таком порядке: 0 → 1 → 2 → 3 → … → 3 → 4.
// Состояние 3 повторяется каждый раз, когда получена часть данных.

// Изменения в состоянии объекта запроса генерируют событие readystatechange:
xhr.onload = null;
xhr.onprogress = null;

xhr = new XMLHttpRequest();
console.log(xhr.readyState); // 0
xhr.onreadystatechange = () => {
  console.log(xhr.readyState); // 1 - 2 - 3 -4
};
xhr.open('GET', 'https://shop.funlymc.ru/payment_qiwi.php');
xhr.responseType = 'json';
xhr.send();

// Сегодня из-за существования событий load/error/progress можно сказать, что событие readystatechange «морально устарело».

// Если мы передумали делать запрос, можно отменить его вызовом xhr.abort():

xhr.abort();
// При этом генерируется событие abort, а xhr.status устанавливается в 0.
console.log(xhr.readyState); // 0

// Синхронные запросы:

// Если в методе open третий параметр async установлен на false, запрос выполняется синхронно.
// Другими словами, выполнение JavaScript останавливается на send() и возобновляется после получения ответа.
// Так ведут себя, например, функции alert или prompt.

// Вот переписанный пример с параметром async, равным false:

xhr.onreadystatechange = null;
xhr = new XMLHttpRequest();
xhr.open('GET', 'https://shop.funlymc.ru/payment_qiwi.php', false);

// try чтобы скрипт не упал
try {
  xhr.send();
  if (xhr.status != 200) {
    console.log('Ошибка', xhr.status, xhr.statusText);
  } else {
    console.log(xhr.response);
  }
} catch (e) {
  console.log(e);
}

console.log('after sync');

// Выглядит, может быть, и неплохо, но синхронные запросы используются редко, так как они блокируют выполнение JavaScript до тех пор,
//  пока загрузка не завершена

// В некоторых браузерах нельзя прокручивать страницу, пока идёт синхронный запрос
// у а если же синхронный запрос по какой-то причине выполняется слишком долго, браузер предложит закрыть «зависшую» страницу.

// HTTP-заголовки
// XMLHttpRequest умеет как указывать свои заголовки в запросе, так и читать присланные в ответ.

// Для работы с HTTP-заголовками есть 3 метода:

// setRequestHeader(name, value)
// Устанавливает заголовок запроса с именем name и значением value.

// xhr.setRequestHeader('Content-Type', 'application/json');

// Некоторые заголовки управляются исключительно браузером, например Referer или Host, а также ряд других
// XMLHttpRequest не разрешено изменять их ради безопасности пользователей и для обеспечения корректности HTTP-запроса.

// Ещё одной особенностью XMLHttpRequest является то, что отменить setRequestHeader невозможно.

// getResponseHeader(name)
// Возвращает значение заголовка ответа name (кроме Set-Cookie и Set-Cookie2).
// xhr.getResponseHeader('Content-Type')

// getAllResponseHeaders()
// Заголовки возвращаются в виде единой строки, например:

// Cache-Control: max-age=31536000
// Content-Length: 4260
// Content-Type: image/png
// Date: Sat, 08 Sep 2012 16:53:16 GMT

// Между заголовками всегда стоит перевод строки в два символа "\r\n" (независимо от ОС)

// Чтобы сделать POST-запрос, мы можем использовать встроенный объект FormData.

// пример

const formData = new FormData(document.forms.person);

formData.append('middle', 'Андрей');

xhr = new XMLHttpRequest();
xhr.open('POST', 'https://shop.funlymc.ru/payment_qiwi.php');
xhr.send(formData);

xhr.onload = () => {
  console.log(xhr.response);
};

// Обычно форма отсылается в кодировке multipart/form-data.
// Если нам больше нравится формат JSON, то используем JSON.stringify и отправляем данные как строку.

xhr.onload = null;
xhr = new XMLHttpRequest();

xhr.open('POST', 'https://shop.funlymc.ru/payment_qiwi.php');
let json = JSON.stringify({
  name: 'Вася',
  surname: 'Петров',
});

xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
xhr.send(json);

// Метод .send(body) весьма всеяден. Он может отправить практически что угодно в body, включая объекты типа Blob и BufferSource.

// Событие progress срабатывает только на стадии загрузки ответа с сервера.

// Если мы отправляем что-то большое, то нас гораздо больше интересует прогресс отправки данных на сервер.
// Но xhr.onprogress тут не поможет.

// Существует другой объект, без методов, только для отслеживания событий отправки: xhr.upload.
// Он генерирует события, похожие на события xhr, но только во время отправки данных на сервер:

// loadstart – начало загрузки данных.
// progress – генерируется периодически во время отправки на сервер.
// abort – загрузка прервана.
// error – ошибка, не связанная с HTTP.
// load – загрузка успешно завершена.
// timeout – вышло время, отведённое на загрузку (при установленном свойстве timeout).
// loadend – загрузка завершена, вне зависимости от того, как – успешно или нет.

xhr.upload.onprogress = (e) => {
  console.log('Отправлено', e.loaded, 'из', e.total);
};

xhr.upload.onload = () => {
  console.log('Данные отправлены!');
};

xhr.upload.onerror = () => {
  console.log('Ошибка,', xhr.status);
};

// XMLHttpRequest может осуществлять запросы на другие сайты, используя ту же политику CORS, что и fetch.
// Точно так же, как и при работе с fetch, по умолчанию на другой источник не отсылаются куки и заголовки HTTP-авторизации.
// Чтобы это изменить, установите xhr.withCredentials в true:

xhr = new XMLHttpRequest();
xhr.withCredentials = true;
