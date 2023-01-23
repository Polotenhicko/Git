// зум от 2 пальцев

let countPointer = 0;
const firstFinger = {
  pointerId: null,
  x: 0,
  y: 0,
};
const secondFinger = {
  pointerId: null,
  x: 0,
  y: 0,
};

function setCoords(e, finger) {
  finger.pointerId = e.pointerId;
  finger.x = e.clientX;
  finger.y = e.clientY;
}

function pointerMove(e) {
  document.body.setPointerCapture(firstFinger.pointerId);
  document.body.setPointerCapture(secondFinger.pointerId);
  document.body.innerText += ' Движение двумя пальцами';
}

document.body.addEventListener('pointerdown', function pointerDownPrimary(e) {
  countPointer += 1;
  if (firstFinger.pointerId == null) setCoords(e, firstFinger);
  if (countPointer !== 2) return;
  setCoords(e, secondFinger);
  document.body.addEventListener('pointermove', pointerMove);
});
