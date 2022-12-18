// Напишите код для выбора элемента с атрибутом data-widget-name из документа и прочитайте его значение.

const div = document.querySelector('[data-widget-name]');
console.log(div.getAttribute('data-widget-name')); // 'menu'

////////////////

// Сделайте все внешние ссылки оранжевыми, изменяя их свойство style.

// Ссылка является внешней, если:
// Её href содержит ://
// Но не начинается с http://internal.com.

const links = document.querySelectorAll('ul a');

for (const link of links) {
  const href = link.getAttribute('href');
  if (href.includes('://') && !~href.indexOf('http://internal.com')) link.style.color = 'orange';
}
