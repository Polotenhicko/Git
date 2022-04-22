// 1 - 42min

function first(arr) {
  let finalArr = [];
  if (arr.length > 0) {
    let getX = false;
    for (let posX = 0; posX < arr.length; posX++) {
      const xArr = arr[posX];
      for (let posY = 0; posY < xArr.length; posY++) {
        if (xArr[posY] == 'x') {
          if (getX) {
            return [];
          } else {
            getX = true;
            finalArr = [posX, posY];
          }
        }
      }
    }
    return finalArr;
  } else {
    return [];
  }
}

// 2
