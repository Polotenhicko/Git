// https://www.codewars.com/kata/56d6b7e43e8186c228000637

function colourAssociation(array) {
  const newArr = [];
  const set = new Set(array);
  for (const item of set.values()) {
    newArr.push({ [item[0]]: item[1] });
  }
  return newArr;
}

console.log(
  colourAssociation([
    ['white', 'goodness'],
    ['blue', 'tranquility'],
  ])
); // [{white:"goodness"},{blue:"tranquility"}]
