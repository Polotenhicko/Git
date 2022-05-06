function sequenceSum(begin, end) {
  if (end < begin) return NaN;

  return end == begin ? begin : begin + sequenceSum(begin + 1, end);
}

console.log(sequenceSum(3, 2)); // NaN
console.log(sequenceSum(1, 5)); // 15
console.log(sequenceSum(4, 10)); // 49
console.log(sequenceSum(-3, 2)); // -3
console.log(sequenceSum(5, 5)); // 5

console.log('/////////');

function getStringCount(objOrArr) {
  let stringCount = 0;
  if (objOrArr) {
    for (const item of Object.values(objOrArr)) {
      if (typeof item == 'object') {
        stringCount += getStringCount(item);
      } else if (typeof item == 'string') {
        stringCount++;
      }
    }
  }
  return stringCount;
}

console.log(
  getStringCount({
    first: '123',
    second: '123',
    third: false,
    fourth: ['anytime', 2, 3, '4'],
    fifth: null,
    obj: {
      test: '123',
    },
    emptyArr: [],
    emptyObj: {},
    emptyStr: '',
  })
); // 6

console.log(getStringCount(['1', '2', '3', ['4']])); // 4
