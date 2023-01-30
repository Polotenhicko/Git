// Создайте функцию showPrompt(html, callback), которая выводит форму с сообщением (html), полем ввода и кнопками OK/ОТМЕНА.
const btnShow = document.getElementById('show-form');
btnShow.onclick = () =>
  showPrompt('Введите что-нибудь<br>...умное :)', function (value) {
    console.log(value);
  });

function showPrompt(htmlMesage, callback) {
  const form = document.getElementById('prompt-form');
  const formContainer = document.getElementById('prompt-form-container');
  const formMessage = document.getElementById('prompt-message');
  const textInput = form.elements.text;
  showModalForm(formContainer);
  formMessage.innerHTML = htmlMesage;
  textInput.value = '';
  textInput.focus();
  form.onsubmit = function (e) {
    e.preventDefault();
    if (textInput.value) {
      callback(textInput.value);
      closeModalForm(formContainer);
    }
  };
  form.elements.cancel.onclick = document.body.onkeydown = function (e) {
    if (e.type == 'click' || e.code == 'Esc') {
      callback(null);
      closeModalForm(formContainer);
    }
  };
}

function showModalForm(formContainer) {
  formContainer.style.display = 'block';
  document.body.style.overflowY = 'hidden';
}

function closeModalForm(formContainer) {
  formContainer.style.display = 'none';
  document.body.style.overflowY = 'auto';
}
