// Нахождение NaN без Number.isNaN

function checkNaN(values) {
  for (const item of values) {
    console.group();
    console.log(`value: ${item}`);
    console.log(`typeof: ${typeof item}`);
    if (+item !== +item) {
      console.log('isNaN');
    } else {
      console.log('is Number');
    }
    console.groupEnd();
  }
}

let values = [
  1,
  '1',
  'Infinity',
  'undefined',
  'null',
  'undefined',
  null,
  Infinity,
  undefined,
  NaN,
  'NaN',
  'asd',
];

checkNaN(values);
