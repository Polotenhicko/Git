// Сделайте так, чтобы при клике на ссылки внутри элемента id="contents" пользователю выводился вопрос о том,
//  действительно ли он хочет покинуть страницу, и если он не хочет, то прерывать переход по ссылке.

const content = document.getElementById('contents');

content.addEventListener('click', function (e) {
  if (!e.target.closest('a')) return;
  const href = e.target.closest('a').getAttribute('href');
  if (!confirm(`Действительно хотите перейти на ${href}?`)) e.preventDefault();
});

// Создайте галерею изображений, в которой основное изображение изменяется при клике на уменьшенный вариант.
const ul = document.getElementById('thumbs');

ul.addEventListener('click', function (e) {
  const anchor = e.target.closest('a');
  if (!anchor) return;
  e.preventDefault();
  showLargeImg(anchor.href, anchor.title);
});

function showLargeImg(src, alt) {
  const largeImg = document.getElementById('largeImg');
  largeImg.setAttribute('src', src);
  largeImg.setAttribute('alt', alt);
}
