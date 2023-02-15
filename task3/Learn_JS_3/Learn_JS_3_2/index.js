// FormData
// глава про отправку html форм, FormData помогает с этим
// FormData - объект представляющий данные html форм

// Конструктор:
// let formData = new FormData([form]);

// Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.

// Его особенность заключается в том, что методы для работы с сетью, например fetch,
// позволяют указать объект FormData в свойстве тела запроса body

// Он будет соответствующим образом закодирован и отправлен с заголовком
// Content-Type: multipart/form-data.
// для сервера это выглядит как обычная отправка формы.

// Отправим простую форму

formElem.onsubmit = async function (e) {
  e.preventDefault();
  const response = await fetch('https://df674b3e-de26-4593-9efa-d04759e97b00.mock.pstmn.io', {
    method: 'POST',
    body: new FormData(formElem),
  });

  const result = await response.json();

  console.log(result);
};

// С помощью указанных ниже методов мы можем изменять поля в объекте FormData:

// formData.append(name, value) – добавляет к объекту поле с именем name и значением value,
// formData.append(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">,
//  третий аргумент fileName устанавливает имя файла(не имя поля формы), как будто это имя из файловой системы пользователя,
// formData.delete(name) – удаляет поле с заданным именем name,
// formData.get(name) – получает значение поля с именем name,
// formData.has(name) – если существует поле с именем name, то возвращает true, иначе false

// Технически форма может иметь много полей с одним и тем же именем name, поэтому несколько вызовов append добавят несколько полей с одинаковыми именами.

// Ещё существует метод set, его синтаксис такой же, как у append. Разница в том, что .set удаляет все уже имеющиеся поля
// с именем name и только затем добавляет новое.То есть этот метод гарантирует,
// что будет существовать только одно поле с именем name, в остальном он аналогичен.append:

// formData.set(name, value),
// formData.set(name, blob, fileName).

// Поля объекта formData можно перебирать, используя цикл for..of:

let formData = new FormData();
formData.append('key', 'value');
formData.append('key', 'value');
formData.set('key2', 'value2');

for (const [key, value] of formData) {
  console.log(key, value); // 2x key value, key2 value2
}

// Объекты FormData всегда отсылаются с заголовком Content-Type: multipart/form-data, этот способ кодировки позволяет отсылать файлы
// поля <input type="file"> тоже отправляются, как это и происходит в случае обычной формы.

// Отправка формы с Blob-данными
// В fetch можно отправлять blob, но на практике бывает удобнее отправлять изображение не отдельно, а в составе формы
// Серверы часто настроены на получение форм, а не просто бинарных данных

// В примере ниже посылается изображение из <canvas> и ещё несколько полей, как форма, используя FormData:

canvasElem.onmousemove = function (e) {
  let ctx = canvasElem.getContext('2d');
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
};

button.onclick = async function (e) {
  const imageBlob = await new Promise((resolve) => canvasElem.toBlob(resolve, 'image/png'));

  const formData = new FormData();
  formData.append('firstName', 'John');
  formData.append('image', imageBlob, 'image.png');
  // Это как если бы в форме был элемент <input type="file" name="image"> и пользователь прикрепил бы файл с именем "image.png"
  // (3-й аргумент) и данными imageBlob (2-й аргумент) из своей файловой системы.

  const response = await fetch('https://df674b3e-de26-4593-9efa-d04759e97b00.mock.pstmn.io', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  console.log(result);
};
