class Notify {
  constructor({ isMultiple = false } = {}) {
    this.isManyNotify = !!isMultiple;
    this.#notifyEl.classList.add('notify');
  }

  #notifyEl = document.createElement('div');
  // мс
  #timeoutDelay = 1e3;
  #transitionTime = 500;
  #timeoutRemoveEl;

  showNotify(text = '', typeClass = 'danger') {
    if (!this.isMultiple && document.body.contains(this.#notifyEl)) return false;
    this.#notifyEl.innerText = text;
    this.#notifyEl.classList.add(typeClass);
    document.body.append(this.#notifyEl);
    this.#notifyEl.style.transition = `opacity ${this.#transitionTime}ms ease`;
    this.#timeoutRemoveEl = setTimeout(() => this.closeNotify(), this.#timeoutDelay);
  }

  closeNotify() {
    clearTimeout(this.#timeoutRemoveEl);
    if (!this.#notifyEl) return;
    this.#notifyEl.style.opacity = 0;
    setTimeout(() => {
      if (!this.#notifyEl) return;
      this.#notifyEl.style.cssText = '';
      this.#notifyEl.remove();
    }, this.#transitionTime);
  }
}

const input = document.getElementById('input');
const notify = new Notify();

document.body.addEventListener('click', function (e) {
  const selectionText = getSelectionText()?.trim();
  if (!selectionText) return;
  navigator.clipboard
    .writeText(selectionText)
    .then(() => navigator.clipboard.readText())
    // вывожу скопированный текст
    .then(console.log);
});

input.addEventListener('paste', function (e) {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  const checkResult = checkText(text);
  if (!checkResult.isDone) {
    notify.showNotify(checkResult.notify);
    return;
  }
  e.currentTarget.value += text;
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

function checkText(text) {
  const result = {
    isDone: true,
  };
  if (text.length < 4) {
    result.notify = 'Длина должна быть больше 3 символов!';
  }
  for (const letter of text) {
    // здесь должна быть регулярка, но я их пока не изучал
    if ((letter < 'A' || letter > 'Z') && (letter < 'a' || letter > 'z') && (letter < '0' || letter > '9')) {
      result.notify = 'Разрешены только буквы и числа!';
      break;
    }
  }
  if (result.notify) result.isDone = false;
  return result;
}
