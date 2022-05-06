// https://www.codewars.com/kata/572ab0cfa3af384df7000ff8

// Задача поменять местами 2 элемента в массиве по индексам, которые указаны в массиве со 2 аргумента

function shuffleIt(arr, ...swapArr) {
  for (const [i, j] of swapArr) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    /*
    2 способ
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;      
    3 способ
    arr[i] = arr[i] + arr[j];
    arr[j] = arr[i] - arr[j];
    arr[i] = arr[i] - arr[j];
    */
  }

  return arr;
}

console.log(shuffleIt([1, 2, 3, 4, 5], [1, 2])); // [1,3,2,4,5]
console.log(shuffleIt([1, 2, 3, 4, 5], [1, 2], [3, 4])); // [1, 3, 2, 5, 4]
