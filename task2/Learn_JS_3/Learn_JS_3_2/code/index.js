// Напишите JavaScript код, который показывает подсказку над элементом с атрибутом data-tooltip.
// Значение атрибута должно становиться текстом подсказки.
let currentElem;

document.onmouseover = function (e) {
  if (currentElem) return;
  const target = e.target.closest('[data-tooltip]');
  if (!target) return;
  setToolTip(target);
};

document.onmouseout = function (e) {
  if (!currentElem) return;
  const related = e.relatedTarget;
  if (currentElem === related) return;
  if (currentElem.contains(related) && !related.hasAttribute('data-tooltip')) return;
  clearToolTip();
};

function setToolTip(elemBox) {
  currentElem = elemBox;
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.innerText = elemBox.dataset.tooltip;
  document.body.append(tooltip);
  const { top, bottom } = elemBox.getBoundingClientRect();
  tooltip.style.left = elemBox.offsetWidth / 2 - tooltip.offsetWidth / 2 + 'px';
  // пока что сверху если есть место, иначе снизу
  if (top >= tooltip.offsetHeight + 5) {
    tooltip.style.top = top - tooltip.offsetHeight - 3 + 'px';
  } else {
    tooltip.style.top = bottom + 3 + 'px';
  }
}

function clearToolTip() {
  currentElem = null;
  document.querySelector('.tooltip').remove();
}
