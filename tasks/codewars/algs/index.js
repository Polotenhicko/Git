// функция по нахождению первой неповторяющейся буквы
// https://www.codewars.com/kata/52bc74d4ac05d0945d00054e/javascript

function firstNonRepeatingLetter(s) {
  const map = new Map();
  s.split('').forEach((item, index) => {
    const that = item.toLowerCase();
    map.has(that) ? map.set(that, [map.get(that)[0] + 1, index]) : map.set(that, [0, index]);
  });
  for (const [, [count, index]] of map) {
    if (count === 0) return s[index];
  }
  return '';
}
