// реализовать Promise.anyResolved - реждектимся, только если все зареджектились,
// а ресолвимся, если любой заресолвился.
// anyResolved будет отличаться от any тем, что принимает доп.аргумент - количество промисов,
// после которых ресолвится.Например, если кинуть ему 3,
// то будет ждать 3 заресолвивишихся и потом сразу сам заресолвит,
// а если 3 не получится - реджектит.Нужно сделать оптимально,
//  чтоб когда уже 100 % не хватит оставшихся промисов для ресолва, не ждать их, а сразу реджектить.

Promise.anyResolved = function anyResolved(iterator, countPromise) {
  try {
    if (iterator[Symbol.iterator]) {
      const iteratorArray = Array.from(iterator);
      let countError = 0;
      return new Promise((resolve, reject) => {
        iteratorArray.forEach((promise) => {
          promise.then(resolve, () => {
            countError += 1;
            if (countError == iteratorArray.length) {
              Promise.reject(new AggregateError([], 'All Promises rejected')).catch(console.error);
            }
          });
        });
      });
    } else {
      throw new Error('Объект без Symbol.iterator');
    }
  } catch (e) {
    Promise.reject(e).catch(console.error);
  }
};
