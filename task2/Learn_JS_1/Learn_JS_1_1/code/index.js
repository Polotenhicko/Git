console.log(location); // огромный объект

console.log(location.host); // URL

console.log(location.href); // вся ссылка

console.log(location.pathname); // всё что после url

console.log(location.port); // порт

console.log(location.protocol); // протокол

// setTimeout(() => location.reload(), 1e3); // обновление страницы каждую секунду

// location.assign('index.html'); // запускает загрузку и отображение нового документа по указанному URL.

// location.replace() // заменяет текущий ресурс на новый по URL, указанному в качестве параметра.
// Отличие от assign() в том, что при использовании replace() текущая страница не будет сохранена в History,
// и пользователь не сможет использовать кнопку назад, чтобы вернуться к ней.

// тут всё круто
console.log(navigator);
console.log(history);
console.log(screen);
console.log(XMLHttpRequest);
