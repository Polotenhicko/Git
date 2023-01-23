// зум от 2 пальцев

let countPointer = 0;
const root = document.getElementById('root');

const listFingers = [
  {
    pointerId: null,
    x: 0,
    y: 0,
  },
  {
    pointerId: null,
    x: 0,
    y: 0,
  },
];
const firstFinger = listFingers[0];
const secondFinger = listFingers[1];

function setCoords(e, finger) {
  finger.pointerId = e.pointerId;
  finger.x = e.clientX;
  finger.y = e.clientY;
}

function pointerMove(e) {
  root.innerText += ' Движение двумя пальцами';
}

document.body.addEventListener('pointerdown', function pointerDownPrimary(e) {
  countPointer += 1;
  if (firstFinger.pointerId == null) setCoords(e, firstFinger);
  if (countPointer !== 2) return;
  setCoords(e, secondFinger);
  document.body.addEventListener('pointermove', pointerMove);
});

document.body.addEventListener('pointerup', function pointerUp(e) {
  const currentFInger = listFingers.find((finger) => finger.pointerId == e.pointerId);
  if (!currentFInger) return;
  currentFInger.pointerId = null;
  countPointer -= 1;
  document.body.removeEventListener('pointermove', pointerMove);
});
