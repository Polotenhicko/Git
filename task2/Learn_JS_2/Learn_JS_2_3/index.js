// Всплытие и перехват событий позволяет реализовать один из самых важных приёмов разработки – делегирование.

// Идея в том, что если у нас есть много элементов, события на которых нужно обрабатывать похожим образом,
// то вместо того, чтобы назначать обработчик каждому, мы ставим один обработчик на их общего предка.

// Из него можно получить целевой элемент event.target, понять на каком именно потомке произошло событие и обработать его.

// реализовать подсветку ячейки <td> при клике.

// Вместо того, чтобы назначать обработчик onclick для каждой ячейки <td> (их может быть очень много)
// – мы повесим «единый» обработчик на элемент < table >.

const table = document.getElementById('bagua-table');
let selectedTd;
let clickFunc = function (e) {
  if (e.target.tagName != 'TD') return;
  if (selectedTd) selectedTd.classList.remove('active');
  selectedTd = e.target;
  selectedTd.classList.add('active');
};

// table.addEventListener('click', clickFunc);

// Однако, у текущей версии кода есть недостаток.
// Клик может быть не на теге <td>, а внутри него.

clickFunc = function (e) {
  const td = e.target.closest('td');
  if (!td) return;
  if (!e.currentTarget.contains(td)) return;
  if (selectedTd) selectedTd.classList.remove('active');
  selectedTd = td;
  selectedTd.classList.add('active');
};

table.addEventListener('click', clickFunc);

// Применение делегирования: действия в разметке

// Например, нам нужно сделать меню с разными кнопками: «Сохранить (save)», «Загрузить (load)», «Поиск (search)» и т.д.
//  И есть объект с соответствующими методами save, load, search… Как их состыковать ?

// Первое, что может прийти в голову – это найти каждую кнопку и назначить ей свой обработчик среди методов объекта.
//  Но существует более элегантное решение.Мы можем добавить один обработчик для всего меню и атрибуты
// data - action для каждой кнопки в соответствии с методами, которые они вызывают:

class Menu {
  constructor(elem) {
    this._elem = elem;
    elem.addEventListener('click', this.onClick);
  }

  save() {
    console.log('Сохранение');
  }

  load() {
    console.log('Загружаю');
  }

  search() {
    console.log('Сохраняю');
  }

  onClick = (e) => {
    const action = e.target.dataset.action;
    if (action) this[action]();
  };
}

new Menu(document.getElementById('menu'));

// Так что же даёт нам здесь делегирование?

// Не нужно писать код, чтобы присвоить обработчик каждой кнопке. Достаточно просто создать один метод и поместить его в разметку.
// Структура HTML становится по-настоящему гибкой. Мы можем добавлять/удалять кнопки в любое время.

// Мы также можем использовать классы .action-save, .action-load,
// но подход с использованием атрибутов data - action является более семантичным

// Делегирование событий можно использовать для добавления элементам «поведения» (behavior),
// декларативно задавая хитрые обработчики установкой специальных HTML - атрибутов и классов.

// Приём проектирования «поведение» состоит из двух частей:

// Элементу ставится пользовательский атрибут, описывающий его поведение.
// При помощи делегирования ставится обработчик на документ, который ловит все клики (или другие события) и,
// если элемент имеет нужный атрибут, производит соответствующее действие.

// Поведение: «Счётчик»
// Например, здесь HTML-атрибут data-counter добавляет кнопкам поведение: «увеличить значение при клике»:

document.addEventListener('click', function (e) {
  if (e.target.dataset.hasOwnProperty('counter')) e.target.value++;
});

// Всегда используйте метод addEventListener для обработчиков на уровне документа
// огда мы устанавливаем обработчик событий на объект document,
// мы всегда должны использовать метод addEventListener, а не document.on < событие >

// Поведение: «Переключатель» (Toggler)

// при клике на элемент с атрибутом data-toggle-id будет скрываться/показываться элемент с заданным id:

document.addEventListener('click', function (e) {
  const id = e.target.dataset.toggleId;
  if (!id) return;
  const elem = document.getElementById(id);
  elem.hidden = !elem.hidden;
});
