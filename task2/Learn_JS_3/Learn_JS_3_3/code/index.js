// Создайте слайдер:
// Захватите мышкой синий бегунок и двигайте его.

slider.onmousedown = function (e) {
  e.preventDefault(); // чтобы не было выделений
  const target = e.target;
  if (!target.classList.contains('thumb')) return;

  // это ползунок
  const sliderRect = slider.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const shiftX = e.clientX - targetRect.left;

  function onMouseMove(e) {
    let left = e.clientX - sliderRect.left - shiftX;
    if (left + target.offsetWidth > sliderRect.width) {
      left = sliderRect.width - target.width;
    }
    if (left < 0) left = 0;
    target.style.left = left + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

document.querySelector('.thumb').ondragstart = function () {
  return false;
};
