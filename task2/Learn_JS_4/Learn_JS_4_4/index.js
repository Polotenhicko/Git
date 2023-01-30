// при отправке формы срабатывает событие submit
// обычно используется для валидации формы перед отправкой или отменой отправки

// есть метод form.submit() для отправки формы

// Событие: submit
// Есть два основных способа отправить форму:

// Первый – нажать кнопку <input type="submit"> или <input type="image">.
// Второй – нажать Enter, находясь на каком-нибудь поле.

// Оба действия сгенерируют событие submit на форме

// Обработчик может проверить данные, и если есть ошибки, показать их и вызвать event.preventDefault(),
//  тогда форма не будет отправлена на сервер.

// При отправке формы по нажатию Enter в текстовом поле, генерируется событие click на кнопке <input type="submit">.

// Это довольно забавно, учитывая что никакого клика не было.

// чтобы отправить форму на сервер самостоятельно на нативщине, можно вызвать метод form.submit();
// При этом событие submit не генерируется

// Иногда это используют для генерации формы и отправки её вручную

const form = document.createElement('form');
document.body.append(form);

form.action = location.origin + location.pathname;
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

form.onsubmit = () => console.log('была отправка');

// form.submit(); // убрал, иначе бесконечная перезагрузка
