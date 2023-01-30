// зум от 2 пальцев

let countPointer = 0;
const root = document.getElementById('root');

function setCoords(e, finger) {}

function pointerMove(e) {
  root.innerText += ' Движение двумя пальцами';
}

document.body.addEventListener('pointerdown', function pointerDownPrimary(e) {
  countPointer += 1;
  if (countPointer !== 2) return;
  // document.body.addEventListener('pointermove', pointerMove);
  pointerMove();
});

document.body.addEventListener('pointerup', function pointerUp(e) {
  countPointer -= 1;
  if (countPointer) return;
  // document.body.removeEventListener('pointermove', pointerMove);
  root.innerText = 'Убрано';
});
