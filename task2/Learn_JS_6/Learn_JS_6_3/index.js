// Событийный цикл: микрозадачи и макрозадачи
// Event Loop

// Идея событийного цикла очень проста. Есть бесконечный цикл, в котором движок JavaScript ожидает задачи,
//  исполняет их и снова ожидает появления новых.

// Примеры задач:
// Когда загружается внешний скрипт <script src="...">, то задача – это выполнение этого скрипта.
// Когда пользователь двигает мышь, задача – сгенерировать событие mousemove и выполнить его обработчики.
// Когда истечёт таймер, установленный с помощью setTimeout(func, ...), задача – это выполнение функции func
// И так далее.

// Очередь, которую формируют такие задачи, называют «очередью макрозадач» (macrotask queue, термин v8).

// Отметим две детали:

// Рендеринг (отрисовка страницы) никогда не происходит во время выполнения задачи движком.
// Не имеет значения, сколь долго выполняется задача.Изменения в DOM отрисовываются только после того, как задача выполнена.

// Если задача выполняется очень долго, то браузер не может выполнять другие задачи, обрабатывать пользовательские события,
//  поэтому спустя некоторое время браузер предлагает «убить» долго выполняющуюся задачу.
// Такое возможно, когда в скрипте много сложных вычислений или ошибка, ведущая к бесконечному циклу.

// Если создать ресурсоёмкую задачу, то event loop будет ждать её выполнение, а только потом выполнит некст задачи

function count() {
  // делаем тяжёлую работу
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  console.log('Done in ' + (Date.now() - start) + 'ms');
}
// count();
// document.body.innerText = 'Текст после цикла';

// Давайте разобьём задачу на части, воспользовавшись вложенным setTimeout:

let i = 0;

let start = Date.now();

function count() {
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    console.log('Done in ' + (Date.now() - start) + 'ms');
  } else {
    console.log(i);
    setTimeout(count); // планируем новый вызов (**)
  }
}

// count();
// document.body.innerText = 'Текст после цикла';

// Будет цикл до 1e6, потом планируем таймаут, а в это время другие задачи могут выполняться
// Потом снова цикл до 2e6 и снова таймаут, и так до 1e9

// ещё улучшим
i = 0;

start = Date.now();

function count() {
  // перенесём планирование очередного вызова в начало
  if (i < 1e9 - 1e6) {
    setTimeout(count); // запланировать новый вызов
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    console.log('Done in ' + (Date.now() - start) + 'ms');
  }
}

// count();
// document.body.innerText = 'Текст после цикла';

// эта функция работает быстрее предыдущей, т.к. мы сначала планируем таймаут, а потом выполняем процессы
// минимальная задержка для таймаута - 4мс, в пред примере мы в конце планировали, а тут в начале
// так что какое-о время да проходит пока мы выполняем цикл

// Итак, мы разбили ресурсоёмкую задачу на части – теперь она не блокирует пользовательский интерфейс,
//  причём почти без потерь в общем времени выполнения.

// Пример 2: индикация прогресса
// Ещё одно преимущество разделения на части крупной задачи в браузерных скриптах – это возможность показывать индикатор выполнения.

// Обычно браузер отрисовывает содержимое страницы после того, как заканчивается выполнение текущего кода
// С одной стороны, это хорошо, потому что наша функция может создавать много элементов,
//  добавлять их по одному в документ и изменять их стили – пользователь не увидит «промежуточного», незаконченного состояния

function testElement() {
  const div = document.createElement('div');
  div.innerText = '123123123123123';
  document.body.append(div);
  let i = 0;
  while (i != 1e6) {
    i++;
    progress.innerText = i;
  }
  div.remove();
  console.log('remove()');
}

// я не увижу div и изменения счётчика progress, хотя while долгий
// testElement();

// Но, возможно, мы хотим что-нибудь показать во время выполнения задачи, например, индикатор выполнения.
// Если мы разобьём тяжёлую задачу на части, используя setTimeout, то изменения индикатора будут отрисованы в промежутках между частями.
const progress = document.getElementById('progress');

i = 0;
function count() {
  do {
    i++;
    progress.innerText = i;
  } while (i % 1e3 != 0);

  if (i < 1e7) {
    setTimeout(count);
  }
}
// count();

// Теперь <div> показывает растущее значение i – это своего рода индикатор выполнения.

// Пример 3: делаем что-нибудь после события

// В обработчике события мы можем решить отложить некоторые действия, пока событие не «всплывёт» и не будет обработано
//  на всех уровнях.Мы можем добиться этого, обернув код в setTimeout с нулевой задержкой.

menu.onclick = function () {
  // ...

  // создадим наше собственное событие с данными пункта меню, по которому щёлкнули мышью
  let customEvent = new CustomEvent('menu-open', {
    bubbles: true,
  });

  // сгенерировать наше событие асинхронно
  setTimeout(() => menu.dispatchEvent(customEvent));
};

// Делать через таймер чтобы событие click полностью обработалось

// Макрозадачи и Микрозадачи
// Микрозадачи приходят только из кода. Обычно они создаются промисами: выполнение обработчика .then/catch/finally становится микрозадачей.
//  Микрозадачи также используются «под капотом» await, т.к.это форма обработки промиса.

// Также есть специальная функция queueMicrotask(func), которая помещает func в очередь микрозадач.

// !!!
// Сразу после каждой макрозадачи движок исполняет все задачи из очереди микрозадач перед тем,
//  как выполнить следующую макрозадачу или отобразить изменения на странице, или сделать что - то ещё.

// Все микрозадачи завершаются до обработки каких-либо событий или рендеринга, или перехода к другой макрозадаче.

// Это важно, так как гарантирует, что общее окружение остаётся одним и тем же между микрозадачами – не изменены координаты мыши,
// не получены новые данные по сети и т.п.

// пример с индикатором выполнения, похожий на предыдущий, но в этот раз использована функция queueMicrotask вместо setTimeout
// отрисовка страницы происходит только в самом конце. Как и в случае обычного синхронного кода.

i = 0;

function count() {
  // делаем часть крупной задачи (*)
  do {
    i++;
    progress.innerHTML = i;
  } while (i % 1e3 != 0);

  if (i < 1e6) {
    queueMicrotask(count);
  }
}

count();
// нет рендера

// Для длительных тяжёлых вычислений, которые не должны блокировать событийный цикл, мы можем использовать Web Workers.
// Web Workers не имеют доступа к DOM, поэтому основное их применение – вычисления. Они позволяют задействовать несколько ядер процессора одновременно.
