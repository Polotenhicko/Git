// обработчики .then/.catch/.finally всегда асинхронны

console.log('Код выполнен');

new Promise((resolve) => resolve('then')).then(console.log);

// Код выполнен
// then
