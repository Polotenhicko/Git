// функция по нахождению первой неповторяющейся буквы
// https://www.codewars.com/kata/52bc74d4ac05d0945d00054e/javascript

function firstNonRepeatingLetter(s) {
  const map = new Map();
  s.split('').forEach((item, index) => {
    const that = item.toLowerCase();
    if (map.has(that)) {
      map.set(that, [map.get(that)[0] + 1, index]);
    } else {
      map.set(that, [0, index]);
    }
  });
  for (const [, [count, index]] of map) {
    if (count === 0) return s[index];
  }
  return '';
}

// Написать функцию лайков и дизлайков как в ютубе

function likeOrDislike(buttons) {
  let count = 0;
  buttons.forEach((item) => {
    count = item == 'Like' ? (count <= 0 ? 1 : 0) : count >= 0 ? -1 : 0;
  });
  return count == 0 ? 'Nothing' : count > 0 ? 'Like' : 'Dislike';
}
