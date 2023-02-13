// ArrayBuffer и бинарные массивы всё это часть JS

// Blob
// объект blob состоит из необязательной строки type (обычно MIME-тип) и blobParts – последовательности других объектов Blob,
//  строк и BufferSource.

// Благодаря type мы можем загружать и скачивать Blob-объекты, где type естественно становится Content-Type в сетевых запросах.

// new Blob(blobParts, options);

// blobParts – массив значений Blob/BufferSource/String.
// options – необязательный объект с дополнительными настройками:
//  type – тип объекта, обычно MIME-тип, например. image/png,
//  endings – если указан, то окончания строк создаваемого Blob будут изменены в соответствии с текущей
//    операционной системой(\r\n или \n).По умолчанию "transparent"(ничего не делать), но также может быть "native"(изменять).

// создадим Blob из строки
let blob = new Blob(['<html>...</html>'], { type: 'text/html' });
// 1 аргумент - массив

// Blob из тпизированного массива строк
let hello = new Uint8Array([[72, 101, 108, 108, 111]]); // "hello" в бинарной форме

blob = new Blob(hello, { type: 'text/plain' });

blob = new Blob([hello, ' ', 'world'], { type: 'text/plain' });

// Мы можем получить срез Blob, используя:
// blob.slice([byteStart], [byteEnd], [contentType]);

// byteStart – стартовая позиция байта, по умолчанию 0.
// byteEnd – последний байт, по умолчанию до конца.
// contentType – тип type создаваемого Blob-объекта, по умолчанию такой же, как и исходный.

// Аргументы – как в array.slice, отрицательные числа также разрешены.

// Blob не изменяем (immutable)
// Мы не можем изменять данные напрямую в Blob, но мы можем делать срезы и создавать новый Blob на их основе
// Это поведение аналогично JavaScript-строке
// мы не можем изменить символы в строке

// Blob может быть использован как URL для <a>, <img> или других тегов, для показа содержимого.
blob = new Blob(['Hello, world!'], { type: 'text/plain' });
let link = document.getElementById('link');
link.href = URL.createObjectURL(blob);
// При нажатии на ссылку я скачаю файл hello.txt с содержимым "Hello, world!"

// Мы также можем создать ссылку динамически, используя только JavaScript, и эмулировать на ней клик,
//  используя link.click(), тогда загрузка начнётся автоматически.

// простой пример создания «на лету» и загрузки Blob-объекта, без использования HTML:

link = document.createElement('a');
// атрибут download
link.download = 'hello.txt';

link.href = URL.createObjectURL(blob);
// link.click();
console.log(link.href);
URL.revokeObjectURL(link.href);

// URL.createObjectURL берёт Blob и создаёт уникальный URL для него в формате blob:<origin>/<uuid>.

// Сгенерированный url действителен, только пока текущий документ открыт
// Это позволяет ссылаться на сгенерированный в нём Blob в <img>, <a>
// или в любом другом объекте, где ожидается url в качестве одного из параметров.

// В данном случае возможен побочный эффект. Пока в карте соответствия существует ссылка на Blob, он находится в памяти.
//  Браузер не может освободить память, занятую Blob - объектом.

// Ссылка в карте соответствия автоматически удаляется при выгрузке документа, после этого также освобождается память.
// Но если приложение имеет длительный жизненный цикл, это может произойти не скоро.
// Таким образом, если мы создадим URL для Blob, он будет висеть в памяти, даже если в нём нет больше необходимости.

// URL.revokeObjectURL(url) удаляет внутреннюю ссылку на объект, что позволяет удалить его (если нет другой ссылки) сборщику мусора,
//  и память будет освобождена.

// После удаления внутренней ссылки на Blob, URL больше не будет работать.

// Альтернатива URL.createObjectURL – конвертация Blob-объекта в строку с кодировкой base64.
// Эта кодировка представляет двоичные данные в виде строки с безопасными для чтения символами в ASCII-кодах от 0 до 64
// И что более важно – мы можем использовать эту кодировку для «data-urls».

// data url имеет форму data:[<mediatype>][;base64],<data>. Мы можем использовать такой url где угодно наряду с «обычным» url.

// Смайлик:
// <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">

// Браузер декодирует строку и показывает смайлик

// Для трансформации Blob в base64 мы будем использовать встроенный в браузер объект типа FileReader
// Он может читать данные из Blob в множестве форматов

// Вот пример загрузки Blob при помощи base64:
link = document.createElement('a');
link.download = 'hello.txt';
blob = new Blob(['Hello, world!'], { type: 'text/plain' });

let reader = new FileReader();
reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает onload
reader.onload = function () {
  link.href = reader.result; // url с данными
  // link.click();
};

// Оба варианта могут быть использованы для создания URL с Blob.
// Но обычно URL.createObjectURL(blob) является более быстрым и безопасным.

// URL.createObjectURL(blob)
// - Нужно отзывать объект для освобождения памяти.
// + Прямой доступ к Blob, без «кодирования/декодирования».

// Blob to data url
// - Потеря производительности и памяти при декодировании больших Blob-объектов.
// + Нет необходимости что-либо отзывать.

// Мы можем создать Blob для изображения, части изображения или даже создать скриншот страницы. Что удобно для последующей загрузки куда-либо.

// Операции с изображениями выполняются через элемент <canvas>:
// 1. Для отрисовки изображения (или его части) на холсте (canvas) используется canvas.drawImage.
// 2. Вызов canvas-метода .toBlob(callback, format, quality) создаёт Blob и вызывает функцию callback при завершении.

// В примере ниже изображение просто копируется, но мы можем взять его часть или трансформировать его на canvas перед созданием Blob:

let img = document.querySelector('img');

// создаём <canvas> того же размера
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;
console.log(img.clientHeight);

let context = canvas.getContext('2d');

// копируем изображение в  canvas (метод позволяет вырезать часть изображения)
context.drawImage(img, 0, 0);
// мы можем вращать изображение при помощи context.rotate() и делать множество других преобразований

// toBlob является асинхронной операцией, для которой callback-функция вызывается при завершении
canvas.toBlob(function (blob) {
  // после того, как Blob создан, загружаем его
  let link = document.createElement('a');
  link.download = 'example.png';
  console.log(blob);
  link.href = URL.createObjectURL(blob);
  // link.click();

  // удаляем внутреннюю ссылку на Blob, что позволит браузеру очистить память
  URL.revokeObjectURL(link.href);
}, 'image/png');

// или await

(async () => {
  let blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  console.log(blob);
})();

// с другими картинками не получается

// Конструктор Blob позволяет создать Blob-объект практически из чего угодно, включая BufferSource.
// Но если нам нужна производительная низкоуровневая обработка, мы можем использовать ArrayBuffer из FileReader:

let fileReader = new FileReader();
fileReader.readAsArrayBuffer(blob);

fileReader.onload = function (event) {
  let arrayBuffer = fileReader.result;
  console.log('blob: ', arrayBuffer);
};
