// Спецификация Server-Sent Events описывает встроенный класс EventSource, который позволяет поддерживать соединение с сервером
//  и получать от него события.

// Как и в случае с WebSocket, соединение постоянно.
// Но есть несколько важных различий:

// WebSocket:
// Двунаправленность: и сервер, и клиент могут обмениваться сообщениями
// Бинарные и текстовые данные
// Протокол WebSocket

// EventSource
// Однонаправленность: данные посылает только сервер
// Только текст
// Обычный HTTP

// Причина использовать EventSource: он проще
// Если нам нужно получать поток данных с сервера: неважно, сообщения в чате или же цены для магазина – с этим легко справится EventSource

//  К тому же, он поддерживает автоматическое переподключение при потере соединения

// Чтобы начать получать данные, нам нужно просто создать new EventSource(url).
// Браузер установит соединение с url и будет поддерживать его открытым, ожидая события.

// Сервер должен ответить со статусом 200 и заголовком Content-Type: text/event-stream
// затем он должен поддерживать соединение открытым и отправлять сообщения в особом формате:

// data: Сообщение 1

// data: Сообщение 2

// data: Сообщение 3
// data: в две строки

// Текст сообщения указывается после data:, пробел после двоеточия необязателен.
// Сообщения разделяются двойным переносом строки \n\n.
// Чтобы разделить сообщение на несколько строк, мы можем отправить несколько data: подряд (третье сообщение).

// На практике сложные сообщения обычно отправляются в формате JSON, в котором перевод строки кодируется как \n

// Пример:

// data: {"user":"Джон","message":"Первая строка\n Вторая строка"}

// Для каждого сообщения генерируется событие message:

let eventSource = new EventSource('https://learn.javascript.ru/server-sent-events/events/subscribe');

eventSource.onmessage = (e) => {
  console.log('Новое сообщение', e.data);
};
