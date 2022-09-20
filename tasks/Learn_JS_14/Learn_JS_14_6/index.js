// BigInt - специальный числовой тип, который предоставляет возможность работать огромными целыми числами

// создать можно 2-мя способами
// написать числу в конце n
// или вызвать функцию BigInt

const bigint = 123333333333333333333333333333113123123213213123123123123n;
// аргументом может быть число, строка
const sameBig = BigInt('12312321312312312312312312312312312312312312123');

const bigIntFromNumber = BigInt(10); // то же самое, что и 10n

// BigInt можно использовать как обычные числа

console.log(2n + 2n); // 4n
// возвращает округлённый и всегда bigInt
console.log(5n / 2n); // 2n

// нельзя смешивать

try {
  console.log(2n + 2);
} catch (e) {
  // TypeError: Cannot mix BigInt and other types, use explicit conversions
  console.error(e);
}

// можно конвертировать

const big = 1n;
const num = 2;

console.log(big + BigInt(num)); // 3n
console.log(Number(big) + num); // 3

console.log(String(big)); // 1, не 1n

// конвертирование bigint всегда происходит неявно и без генерации ошибок
// но если значение слишком велико, то дополнительные биты будут отброшены

// к bigint нельзя применять унарный оператор
try {
  console.log(+2n);
} catch (e) {
  // TypeError: Cannot convert a BigInt value to a number
  console.error(e);
}

// операции сравнения работают с bigint и обычными числами

console.log(2n > 1); // true
console.log(2n >= 2n); // true

// bigInt и number разные типы
console.log(1 == 1n); // true
console.log(1 === 1n); // false

// в любом логическом операторе bigInt ведёт себя как обычное число

if (0n) {
  // никогда не выполнится
}

console.log(0n && undefined); // 0n

// создать полифил бигинта сложно и нет норм библиотек
// есть более-менее JSBI
