// Прокрутка
// Событие прокрутки scroll позволяет реагировать на прокрутку страницы или элемента

// Что можно сделать с этим событием:
// Показать/скрыть дополнительные элементы управления или информацию, основываясь на том,
// в какой части документа находится пользователь

// Подгрузить данные, когда пользователь прокручивает страницу вниз до конца.

window.addEventListener('scroll', function (e) {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});

// Событие scroll работает как на window, так и на других элементах, на которых включена прокрутка.

// Как можно сделать что-то непрокручиваемым?

// Нельзя предотвратить прокрутку, используя event.preventDefault() в обработчике onscroll,
// потому что он срабатывает после того, как прокрутка уже произошла.

// Но можно предотвратить прокрутку, используя event.preventDefault() на событии, которое вызывает прокрутку, например,
// на событии keydown для клавиш pageUp и pageDown.

// Способов инициировать прокрутку много, поэтому более надёжный способ – использовать CSS, свойство overflow.

// создам бесконечную страницу.
// Когда посетитель прокручивает её до конца, она автоматически добавляет текущие время и дату
// в текст(чтобы посетитель мог прокрутить ещё).

const text = document.querySelector('.text');

function endlessPage(elem) {
  let textHeight = elem.offsetHeight;
  while (textHeight < document.documentElement.clientHeight * 1.2) {
    elem.innerHTML += new Date() + '<br/>';
    textHeight = elem.offsetHeight;
  }

  document.addEventListener('scroll', function (e) {
    const bottomHeight =
      this.documentElement.scrollHeight - this.documentElement.scrollTop - this.documentElement.clientHeight;
    if (bottomHeight < 80) elem.innerHTML += new Date() + '<br/>';
  });
}

endlessPage(text);
