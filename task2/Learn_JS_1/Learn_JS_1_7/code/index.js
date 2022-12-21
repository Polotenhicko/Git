// Создайте функцию clear(elem), которая удаляет всё содержимое из elem.

function clear(elem) {
  elem.innerHTML = '';
  // через forof и remove не получится, т.к. remove сдвигает коллекцию
}

// clear(document.getElementById('elem'));

// Для каждого пункта:

// Запрашивайте содержимое пункта у пользователя с помощью prompt.
// Создавайте элемент <li> и добавляйте его к <ul>.
// Продолжайте до тех пор, пока пользователь не отменит ввод (нажатием клавиши Esc или введя пустую строку).
// Все элементы должны создаваться динамически.

// Если пользователь вводит HTML-теги, они должны обрабатываться как текст.

function createList(elemList) {
  if (!(elem instanceof HTMLElement)) return;
  let text;
  while ((text = prompt('Содержимое пункта?', ''))) {
    const li = document.createElement('li');
    li.textContent = text;
    elemList.append(li);
  }
}

// createList(document.getElementById('elem'));

// Напишите функцию createTree, которая создаёт вложенный список ul/li из объекта.
const div = document.getElementById('div');

function createTree(container, data) {
  function createListTree(data) {
    const ul = document.createElement('ul');
    for (const [key, value] of Object.entries(data)) {
      const li = document.createElement('li');
      li.append(key);
      if (Object.values(value).length) li.append(createListTree(value));
      ul.append(li);
    }
    return ul;
  }

  container.append(createListTree(data));
}

createTree(div, {
  Рыбы: {
    форель: {},
    лосось: {},
  },

  Деревья: {
    Огромные: {
      секвойя: {},
      дуб: {},
    },
    Цветковые: {
      яблоня: {},
      магнолия: {},
    },
  },
});
