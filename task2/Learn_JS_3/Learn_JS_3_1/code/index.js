// Создайте список, в котором элементы могут быть выделены, как в файловых менеджерах.
// P.S. В этом задании все элементы списка содержат только текст. Без вложенных тегов.

const ul = document.getElementById('ul');

ul.addEventListener('click', function (e) {
  if (e.target.nodeName != 'LI') return;
  const elem = e.target;
  if (e.ctrlKey || e.metaKey) {
    elem.classList.toggle('selected');
    return;
  }
  for (const li of ul.querySelectorAll('li.selected')) {
    li.classList.remove('selected');
  }
  elem.classList.add('selected');
});

ul.addEventListener('mousedown', function (e) {
  e.preventDefault();
});
