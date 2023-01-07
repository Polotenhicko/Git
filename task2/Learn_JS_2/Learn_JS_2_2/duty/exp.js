export function callBack(e) {
  e.stopPropagation();
  console.log(e.type); // 'click'
}

const button = document.getElementById('button');
button.addEventListener('click', callBack);
