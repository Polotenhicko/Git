// в узле элемента весь текст в upper или lower
// спецом без стилей

function changeCase(node, isToUp = true) {
  if (!(node instanceof HTMLElement)) {
    throw new TypeError('Node должен быть HTMLElement');
  }

  for (const itemNode of node.childNodes) {
    itemNode.textContent = itemNode.textContent[isToUp ? 'toUpperCase' : 'toLowerCase']();
  }
}

try {
  changeCase('123'); // ошибка
} catch (e) {
  console.error(e);
}

// каждую секуду
let isUp = true;
setInterval(() => {
  changeCase(document.body, isUp);
  isUp = isUp ? false : true;
}, 1e3);
