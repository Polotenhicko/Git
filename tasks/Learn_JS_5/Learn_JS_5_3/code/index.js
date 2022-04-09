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

// 2 задача
//В этой Ката вам будет дана строка, и ваша задача будет заключаться в том, чтобы вернуть длину самого длинного префикса, который также является суффиксом. Префикс — это начало строки, а суффикс — конец строки. Например, префиксы "abcd"строки ["a","ab","abc"]. Суффиксы есть ["bcd", "cd", "d"]. Вы не должны перекрывать префикс и суффикс.
//https://www.codewars.com/kata/5ce969ab07d4b7002dcaa7a1

function solve(string) {
  if (string.length > 1) {
    const length = string.length;
    let maxLength;
    length % 2 == 0 ? (maxLength = length / 2) : (maxLength = (length - 1) / 2);

    for (let i = maxLength; i >= 0; i--) {
      const prefix = string.slice(0, i);
      if (string.endsWith(prefix)) {
        return prefix.length;
      }
    }
    return 0;
  } else {
    return 0;
  }
}

console.log(solve('aa'));
console.log(solve('bbcb'));
console.log(solve('abcccab'));
