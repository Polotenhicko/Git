// Короче, у промиса нельзя просто так узнать статус (pending, fullfilled, rejected)
// Сделай так, чтобы было можно узнать

function showStatus(isResolved) {
  new Promise((resolve, reject) => {
    console.log(`status: pending`);

    setTimeout(() => {
      isResolved ? resolve(1) : reject(0);
    }, 1e3);
  }).then(
    () => {
      console.log(`status: 'fulfilled'`);
    },
    () => {
      console.log(`status: 'rejected'`);
    }
  );
}

showStatus(true);
