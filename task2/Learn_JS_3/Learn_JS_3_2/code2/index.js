// если пользователь подвинул курсор на элементе и остановился – показывать подсказку.
// А если он просто быстро провёл курсором по элементу, то не надо ничего показывать

class HoverIntent {
  constructor({
    sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
    interval = 100, // измеряем скорость каждые 100ms: определяем дистанцию между предыдущей и новой позицией.
    elem,
    over,
    out,
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // убедитесь, что "this" сохраняет своё значение для обработчиков.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // назначаем обработчики
    elem.addEventListener('mouseover', this.onMouseOver);
    elem.addEventListener('mouseout', this.onMouseOut);

    // продолжите с этого места
  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }

  destroy() {
    /* ваш код для отключения функциональности и снятия всех обработчиков */
  }
}

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.innerHTML = 'Tooltip';

// объект будет отслеживать движение мыши и вызывать функции over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  },
});
