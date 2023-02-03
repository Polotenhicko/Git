document.body.addEventListener('dblclick', function (e) {
  const selectionText = getSelectionText()?.trim();
  if (!selectionText) return;
  navigator.clipboard.writeText(selectionText).then(() => {
    navigator.clipboard.readText().then(console.log); // вывожу скопированный текст
  });
});

const input = document.getElementById('input');
input.addEventListener('paste', function (e) {
  e.preventDefault();
  console.log(e.clipboardData.getData('text/plain'));
});

// своровал код, но даю обещание что разберусь с ним как только пройду эту тему (она идёт некст), хотя может я уже пришёл на встречу с подготовленной темой
function getSelectionText() {
  var text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}
