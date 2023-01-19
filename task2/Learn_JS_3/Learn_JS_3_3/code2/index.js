// перенос ячеек в таблице

// сначала генерация изображений

const table = document.getElementById('table');

let countImage = 1;

function appendRandomImage(nodeListImg) {
  const promiseArr = [];
  for (const img of nodeListImg) {
    img.src = `https://picsum.photos/300/300?random=${countImage++}`;
    // img.src = `https://picsum.photos/300/300?random=1`;
    const promise = new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
    promiseArr.push(promise);
  }
  Promise.all(promiseArr)
    .then(() => {
      // все картинки загрузились
      table.onmousedown = function (e) {
        const target = e.target.closest('td');
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const shiftX = e.clientX - rect.left;
        const shiftY = e.clientY - rect.top;
        target.style.position = 'absolute';
        target.style.zIndex = 1000;

        const tempTd = document.createElement('td');
        tempTd.classList.add('empty');
        target.before(tempTd);

        let hoverElement;
        let side;
        let isCanAppend = false;

        target.classList.add('out_table');
        document.body.append(target);

        onMouseMove(e);
        function onMouseMove(e) {
          isCanAppend = false;
          target.style.top = e.pageY - shiftY + 'px';
          target.style.left = e.pageX - shiftX + 'px';
          target.hidden = true;
          const elemFromPoint = document.elementFromPoint(e.clientX, e.clientY)?.closest('td');
          target.hidden = false;
          if (hoverElement) removeHoverEffect(hoverElement);
          if (!elemFromPoint || !table.contains(elemFromPoint)) return;
          hoverElement = elemFromPoint;
          addHoverEffect(e, hoverElement);
          isCanAppend = true;
        }

        function addHoverEffect(e, hoverElem) {
          const rectHover = hoverElem.getBoundingClientRect();
          if (e.clientX >= rectHover.left) side = 'left';
          if (e.clientX >= rectHover.right - rectHover.width / 2) side = 'right';
          hoverElem.classList.add(side);
        }

        function removeHoverEffect(elem) {
          elem.classList.remove('left', 'right');
        }

        function appendDragElement(dragEl, hoverEl) {
          if (side == 'left') hoverEl.before(dragEl);
          if (side == 'right') hoverEl.after(dragEl);
        }

        function onMouseUp(e) {
          target.style.cssText = '';
          if (hoverElement) removeHoverEffect(hoverElement);
          if (isCanAppend) {
            appendDragElement(target, hoverElement);
          } else {
            tempTd.after(target);
          }
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          hoverElement = null;
          tempTd.remove();
          target.classList.remove('out_table');
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', onMouseUp);
      };
      document.ondragstart = function () {
        return false;
      };
    })
    .catch(() => {
      // какие-то картинки не загрузились
    });
}

appendRandomImage(table.querySelectorAll('img'));
