// Встроенный класс URL предоставляет удобный интерфейс для создания и разбора URL-адресов.

// Синтаксис создания нового объекта URL:
// new URL(url, [base])

// url – полный URL-адрес или только путь, если указан второй параметр,
// base – необязательный «базовый» URL: если указан и аргумент url содержит только путь, то адрес будет создан относительно него

// Пример

let url = new URL('https://javascript.info/profile/admin');
console.log(url.toString()); // https://javascript.info/profile/admin
// или

url = new URL('/profile/admin', 'https://javascript.info');
console.log(url.toString()); // https://javascript.info/profile/admin

// они одинаковые

// Ещё можно легко создавать новый URL относительно существующего URL

url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

console.log(newUrl.toString()); // https://javascript.info/profile/tester

// это из-за метода toString

// Объект URL даёт доступ к компонентам URL, поэтому это отличный способ «разобрать» URL-адрес, например:

url = new URL('https://javascript.info/url?p1=aaaa&p2=bbb#hash');
console.log(url.protocol); // https:
console.log(url.host); // javascript.info
console.log(url.pathname); // /url

console.log(url.href); // всё вместе https://javascript.info/url

console.log(url.origin); // источник - https://javascript.info

console.log(url.hostname); // отличие от host - host включает в себя и порт - javascript.info

console.log(url.port); // '' ну порт

console.log(url.search); // get запрос ?p1=aaaa&p2=bbb

console.log(url.hash); // #hash - какой-то хеш

// href это полный URL-адрес, то же самое, что url.toString()
// protocol – протокол, заканчивается символом двоеточия :
// search строка параметров, начинается с вопросительного знака ?
// hash начинается с символа #
// - также есть свойства user и password, если используется HTTP-аутентификация: http://login:password@site.com
//  (редко используется)

// Мы можем использовать объект URL в методах fetch или XMLHttpRequest и почти во всех других, где ожидается URL-строка.

// Допустим, мы хотим создать URL-адрес с заданными параметрами, например, https://google.com/search?query=JavaScript.
url = new URL('https://google.com/search?query=JavaScript');
// указываем их в строке
// Но параметры должны быть правильно закодированы, чтобы они могли содержать не-латинские буквы, пробелы и т.п.

// Так что для этого есть свойство url.searchParams – объект типа URLSearchParams.

// Он предоставляет удобные методы для работы с параметрами:

// append(name, value) – добавить параметр по имени,
// delete(name) – удалить параметр по имени,
// get(name) – получить параметр по имени,
// getAll(name) – получить все параметры с одинаковым именем name (такое возможно, например: ?user=John&user=Pete),
// has(name) – проверить наличие параметра по имени,
// set(name, value) – задать/заменить параметр,
// sort() – отсортировать параметры по имени, используется редко,
// …и является перебираемым, аналогично Map.

url.search = '?query=JavaScript&result= 123ф';
console.log(url.toString()); // https://google.com/search?query=JavaScript&result=%20123%D1%84
// безопасно добавил пробел и ф

// сделать это через URLSearchParams
url = new URL('https://google.com/search?query=JavaScript');
url.searchParams.set('q', 'test lol!');
console.log(url.toString()); // https://google.com/search?query=JavaScript&q=test+lol%21

// параметры автоматически кодируются

// является перебираемым объектом + имеет forEach и sort методы
for (const item of url.searchParams) {
  console.log(item); // ['query', 'JavaScript'], ['q', 'test lol!']
}

for (const [key, value] of url.searchParams) {
  console.log(key, ': ', value); // query :  JavaScript, q :  test lol!
}

url.searchParams.append('q', 'бб');
console.log(url.toString()); // https://google.com/search?query=JavaScript&q=test+lol%21&q=%D0%B1%D0%B1
// 2 ключа q

url.searchParams.set('q', 123);
console.log(url.toString()); // https://google.com/search?query=JavaScript&q=123
// ключи заменились

// Существует стандарт RFC3986, который определяет список разрешённых и запрещённых символов в URL.
// Запрещённые символы, например, нелатинские буквы и пробелы, должны быть закодированы – заменены соответствующими кодами UTF-8
// с префиксом %, например: %20 (исторически сложилось так, что пробел в URL-адресе можно также кодировать символом +,
// но это исключение).

// К счастью, объекты URL делают всё это автоматически

// А вот обычный window.location такого не делает

// Всё ещё можно делать пути через строки, но нужно их кодировать

// Для этого есть встроенные функции:

// encodeURI – кодирует URL-адрес целиком.
// decodeURI – декодирует URL-адрес целиком.
// encodeURIComponent – кодирует компонент URL, например, параметр, хеш, имя пути и т.п.
// decodeURIComponent – декодирует компонент URL.

// Когда использовать 2 последних, а когда 2 первых?

// http://site.com:8080/path/page?p1=v1&p2=v2#hash
// Как мы видим, в URL-адресе разрешены символы :, ?, =, &, #.
// С другой стороны, если взглянуть на один компонент, например, URL-параметр, то в нём такие символы должны быть закодированы,
// чтобы не поломать форматирование.

// encodeURI кодирует только символы, полностью запрещённые в URL.
// encodeURIComponent кодирует эти же символы плюс, в дополнение к ним, символы #, $, &, +, ,, /, :, ;, =, ? и @.

// Так что для URL целиком можно использовать encodeURI:

url = encodeURI('http://site.com/привет');

console.log(url.toString()); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82

// А для параметров лучше будет взять encodeURIComponent:

let music = encodeURIComponent('Rock&Roll');
url = `https://google.com/search?q=${music}`;

console.log(url.toString()); // https://google.com/search?q=Rock%26Roll

// теперь другой метод

music = encodeURI('Rock&Roll');
url = `https://google.com/search?q=${music}`;

console.log(url.toString()); // https://google.com/search?q=Rock&Roll

// Чтобы правильно вставить параметр поиска в строку URL, мы должны использовать для него только encodeURIComponent

try {
  url = new URL('h');
} catch (e) {
  console.error(e); // TypeError: Failed to construct 'URL': Invalid URL
}

// Классы URL и URLSearchParams базируются на последней спецификации URI, описывающей устройство адресов: RFC3986,
// в то время как функции encode * – на устаревшей версии стандарта RFC2396.
