// Допустим, у нас есть клиент с низкой скоростью соединения, и мы хотим сэкономить его трафик.
// Для этого мы решили не показывать изображения сразу, а заменять их на «макеты»

// То есть, изначально, все изображения – placeholder.svg.
// Когда страница прокручивается до того положения, где пользователь может увидеть изображение – мы меняем src на значение из data-src,
//  и таким образом изображение загружается.

function isVisible(elem) {
  const { top: elemTop, bottom: elemBottom } = elem.getBoundingClientRect();
  return elemBottom > 0 && elemTop < document.documentElement.clientHeight;
}

function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    const realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      console.log(img);
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

window.addEventListener('scroll', showVisible);
showVisible();

const arrowButton = document.createElement('div');
arrowButton.id = 'arrowTop';
// Создайте кнопку «наверх», чтобы помочь с прокруткой страницы.
window.addEventListener('scroll', function () {
  const windowHeight = document.documentElement.clientHeight;
  if (window.pageYOffset > windowHeight) {
    document.body.append(arrowButton);
  } else {
    arrowButton.remove();
  }
});

arrowButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
