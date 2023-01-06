// Создайте дерево, которое по клику на заголовок скрывает-показывает потомков:

const ul = document.getElementById('tree');

document.addEventListener('click', function (e) {
  if (!e.target.closest('#tree')) return;
  const list = e.target.querySelector('ul');
  if (list) list.hidden = !list.hidden;
});

// Сделать таблицу сортируемой: при клике на элемент <th> строки таблицы должны сортироваться по соответствующему столбцу.
const table = document.getElementById('grid');
table.addEventListener('click', function (e) {
  const elem = e.target;
  if (!elem.dataset.type || elem.nodeName !== 'TH') return;
  const countColumn = Array.from(elem.closest('tr').children).findIndex((tag) => tag == elem);
  const type = elem.dataset.type;
  const arr = Array.from(e.currentTarget.querySelectorAll(`tbody tr`));
  arr.sort((trA, trB) => {
    if (type == 'number') return +trA.children[countColumn].innerText - +trB.children[countColumn].innerText;
    if (type == 'string')
      return trA.children[countColumn].innerText.localeCompare(trB.children[countColumn].innerText);
  });
  for (const tr of arr) {
    tr.remove();
    e.currentTarget.querySelector('tbody').append(tr);
  }
});
