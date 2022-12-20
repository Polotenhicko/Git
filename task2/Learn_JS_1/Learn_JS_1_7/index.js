// DOM-узел можно создать двумя методами:
// document.createElement(tag) - Создаёт новый элемент с заданным тегом:

const div = document.createElement('div');

// document.createTextNode(text)
// Создаёт новый текстовый узел с заданным текстом:

const textNode = document.createTextNode('Куку');

div.className = 'alert';
div.innerHTML = '<strong>Всем привет!</strong> Вы прочитали важное сообщение.';

// создали элемент, но он только перменная пока что
