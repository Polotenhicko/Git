// У нас есть дерево, структурированное как вложенные списки ul/li.

// Напишите код, который выведет каждый элемент списка <li>:
const ul = document.querySelector('ul');
// Какой в нём текст (без поддерева) ?
for (const li of ul.children) {
  // console.log(li);
  console.log(li.firstChild.data.trim());
}

// Какое число потомков – всех вложенных <li> (включая глубоко вложенные) ?
function countChild(element) {
  let count = 0;
  for (const li of element.children) {
    count += 1;
    for (const liChild of li.children) {
      count += countChild(liChild);
    }
  }
  return count;
}

console.log(countChild(ul));

// или
console.log(ul.querySelectorAll('li').length); // 16
