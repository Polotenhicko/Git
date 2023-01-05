const field = document.getElementById('field');
const ball = document.getElementById('ball');
field.addEventListener('click', function (e) {
  const rect = this.getBoundingClientRect();
  const ballCenterX = ball.offsetWidth / 2;
  const ballCenterY = ball.offsetHeight / 2;
  let top = e.clientY - rect.top - this.clientTop - ballCenterY;
  let left = e.clientX - rect.left - this.clientLeft - ballCenterX;
  if (top < 0) top = 0;
  if (left < 0) left = 0;
  if (top + ball.clientHeight > this.clientHeight) top = field.clientHeight - ball.clientHeight;
  if (left + ball.clientWidth > this.clientWidth) left = field.clientWidth - ball.clientWidth;
  ball.style.top = top + 'px';
  ball.style.left = left + 'px';
});
