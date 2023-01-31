// зум от 2 пальцев

const root = document.getElementById('root');

let fingers = [];

function pointerMove(e) {
  // обработка движений пальцев
  // может быть только 2 пальца
  if (fingers.length === 2) return;
  alert(fingers.length);
}

document.body.addEventListener('pointerdown', function pointerDownPrimary(e) {
  fingers.push({
    id: e.pointerId,
    pageX: e.pageX,
    pageY: e.pageY,
  });
  if (fingers.length !== 2) {
    document.body.removeEventListener('pointermove', pointerMove);
    return;
  }
  document.body.addEventListener('pointermove', pointerMove);
});

document.body.addEventListener('pointerup', function pointerUp(e) {
  const currentFinger = fingers.find((obj) => obj.id === e.pointerId);
  fingers = fingers.filter((obj) => obj !== currentFinger);
  if (fingers.length !== 2) {
    document.body.removeEventListener('pointermove', pointerMove);
    return;
  }
  document.body.addEventListener('pointermove', pointerMove);
});

document.body.ondragstart = function () {
  return false;
};
