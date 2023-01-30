// Создайте <div>, который превращается в <textarea>, если на него кликнуть.
// <textarea> позволяет редактировать HTML в элементе <div>.

const view = document.getElementById('view');

view.addEventListener('click', function (e) {
  const textarea = document.createElement('textarea');
  textarea.value = view.innerHTML;
  view.replaceWith(textarea);
  textarea.focus();

  textarea.onkeydown = function (e) {
    if (e.code === 'Enter') textarea.blur();
  };

  textarea.onblur = function () {
    view.innerHTML = textarea.value;
    textarea.replaceWith(view);
    textarea.onblur = null;
  };
});

// Сделайте ячейки таблицы редактируемыми по клику.

// По клику – ячейка должна стать «редактируемой» (textarea появляется внутри),
// мы можем изменять HTML.Изменение размера ячейки должно быть отключено.

// Кнопки OK и ОТМЕНА появляются ниже ячейки и, соответственно, завершают/отменяют редактирование.

// Только одну ячейку можно редактировать за один раз. Пока <td> в «режиме редактирования», клики по другим ячейкам игнорируются.

// Таблица может иметь множество ячеек. Используйте делегирование событий.

const table = document.getElementById('bagua-table');
let currentCell;
let oldInnerHTML;

table.addEventListener('click', function (e) {
  const cell = e.target.closest('td');
  if (!cell || currentCell) return;
  startEditCell(cell);
  appendControlButtons(cell);
});

function startEditCell(cell) {
  currentCell = cell;
  const textarea = document.createElement('textarea');
  textarea.value = cell.innerHTML;
  textarea.style.height = cell.offsetHeight + 'px';
  // 6, потому что лень писать код на автоматический просчёт
  textarea.rows = 6;
  oldInnerHTML = cell.innerHTML;
  cell.innerHTML = '';
  cell.classList.add('edit');
  cell.append(textarea);
  textarea.focus();
}

const createButton = (text) => {
  const btn = document.createElement('button');
  btn.innerText = text;
  return btn;
};

function appendControlButtons(cell) {
  const wrapper = document.createElement('div');
  const btnOk = createButton('Ок');
  const btnCancel = createButton('Отмена');
  wrapper.append(btnOk, btnCancel);
  wrapper.style.position = 'absolute';
  wrapper.style.zIndex = 1000;
  wrapper.style.top = cell.offsetHeight + 'px';
  wrapper.style.left = 0;
  cell.append(wrapper);
  btnOk.onclick = () => endEditCell(cell);
  btnCancel.onclick = () => endEditCell(cell, true);
}

function endEditCell(cell, isCancel) {
  const valueTextarea = cell.querySelector('textarea')?.value;
  cell.innerHTML = isCancel ? oldInnerHTML : valueTextarea;
  cell.classList.remove('edit');
  currentCell = null;
}

// Установите фокус на мышь. Затем используйте клавиши со стрелками, чтобы её двигать:

const mouse = document.getElementById('mouse');

mouse.addEventListener('click', function () {
  mouse.tabIndex = -1;
  mouse.style.position = 'fixed';
  mouse.style.zIndex = 1000;
  const rect = mouse.getBoundingClientRect();
  mouse.style.top = rect.top + 'px';
  mouse.style.left = rect.left + 'px';
  mouse.onfocus = () => document.body.addEventListener('keydown', mouseMove);
  mouse.onblur = () => document.body.removeEventListener('keydown', mouseMove);
  mouse.focus();

  function mouseMove(e) {
    const top = parseInt(mouse.style.top);
    const left = parseInt(mouse.style.left);
    switch (e.code) {
      case 'ArrowUp':
        mouse.style.top = top - 20 + 'px';
        break;
      case 'ArrowRight':
        mouse.style.left = left + 20 + 'px';
        break;
      case 'ArrowDown':
        mouse.style.top = top + 20 + 'px';
        break;
      case 'ArrowLeft':
        mouse.style.left = left - 20 + 'px';
        break;
    }
  }
});
