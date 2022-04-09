// Задача с codewars. Восстановить потерянную строку
// В этой задаче вам нужно восстановить строку из списка ее копий.

// Вы получите массив строк. Все они должны быть такими же, как и в оригинале, но, к сожалению, они были повреждены, что означает, что некоторые символы были заменены на звездочки ( "*").

// Вы должны восстановить исходную строку на основе имеющейся у вас неповрежденной информации. Если в некоторых случаях невозможно определить, каким был исходный символ, используйте "#"для этого символ как специальный маркер.

// Если массив пуст, вернуть пустую строку.

// https://www.codewars.com/kata/6210fb7aabf047000f3a3ad6

function assembleString(array) {
  let string = '';
  let arrayStr = [];
  array.forEach(function (str, index) {
    if (index == 0) {
      arrayStr = str.split('');
      return;
    }
    let strIndex = 0;
    for (const char of str) {
      if (index == array.length - 1) {
        if (arrayStr[strIndex] == '*') {
          char == '*'
            ? (arrayStr[strIndex] = '#')
            : (arrayStr[strIndex] = char);
        }
      } else {
        if (char == '*' && arrayStr != '*') {
          strIndex++;
          continue;
        } else {
          arrayStr[strIndex] = char;
        }
      }

      strIndex++;
    }
  });
  string = arrayStr.join('');
  return string;
}

console.log(
  assembleString(['H*llo, W*rld!', 'Hel*o, *or*d!', '*ello* World*'])
);
