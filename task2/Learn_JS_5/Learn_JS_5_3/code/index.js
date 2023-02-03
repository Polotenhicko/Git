// Создайте функцию preloadImages(sources, callback),
// которая загружает все изображения из массива sources и, когда все они будут загружены, вызывает callback.

// мой код внутри preloadImages
function preloadImages(sources, callback) {
  const arr = [];
  for (const src of sources) {
    const img = document.createElement('img');
    img.src = src;
    arr.push(
      new Promise((resolve) => {
        // В случае ошибки функция должна считать изображение «загруженным».
        img.onload = img.onerror = resolve;
      })
    );
  }
  Promise.all(arr)
    .then(() => {
      callback();
    })
    .catch(() => console.log('Непредвиденная ошибка'));
}

const sources = [
  'https://en.js.cx/images-load/1.jpg',
  'https://en.js.cx/images-load/2.jpg',
  'https://en.js.cx/images-load/3.jpg',
];

// добавляем случайные символы к ссылкам, чтобы избежать кеширования
for (let i = 0; i < sources.length; i++) {
  sources[i] += '?' + Math.random();
}

// для каждого изображения
// создадим другое изображение с аналогичным src и проверим, есть ли у нас его ширина
function testLoaded() {
  let widthSum = 0;
  for (let i = 0; i < sources.length; i++) {
    let img = document.createElement('img');
    img.src = sources[i];
    widthSum += img.width;
  }
  console.log(widthSum);
}

// каждое изображение в разрешении 100x100, итоговая сумма их ширин должна быть 300
preloadImages(sources, testLoaded);
