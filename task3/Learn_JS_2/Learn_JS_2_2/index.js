// TextDecoder и TextEncoder
// Что если бинарные данные фактически являются строкой? Например, мы получили файл с текстовыми данными.

// Встроенный объект TextDecoder позволяет декодировать данные из бинарного буфера в обычную строку.

// let decoder = new TextDecoder([label], [options]);

// label – тип кодировки, utf-8 используется по умолчанию, но также поддерживаются big5, windows-1251 и многие другие.
// options – объект с дополнительными настройками:
//   fatal – boolean, если значение true, тогда генерируется ошибка для невалидных (не декодируемых) символов,
//     в ином случае(по умолчанию) они заменяются символом \uFFFD.
//   ignoreBOM – boolean, если значение true, тогда игнорируется BOM (дополнительный признак, определяющий порядок следования байтов),
//     что необходимо крайне редко.

// После нужно использовать его метод decode:

// let str = decoder.decode([input], [options]);

// input – бинарный буфер (BufferSource) для декодирования.
// options – объект с дополнительными настройками:
//   stream – true для декодирования потока данных, при этом decoder вызывается вновь и вновь для каждого следующего
//   фрагмента данных.В этом случае многобайтовый символ может иногда быть разделён и попасть в разные фрагменты данных.
//   Это опция указывает TextDecoder запомнить символ, на котором остановился процесс, и декодировать его со следующим фрагментом.

// Пример:
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
console.log(new TextDecoder().decode(uint8Array)); // Hello

uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);
console.log(new TextDecoder().decode(uint8Array));

// Мы можем декодировать часть бинарного массива, создав подмассив:
uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);
// Возьмём строку из середины массива
let binaryString = uint8Array.subarray(1, -1);
console.log(new TextDecoder().decode(binaryString)); // Hello

// TextEncoder поступает наоборот – кодирует строку в бинарный массив.
// let encoder = new TextEncoder();

// Поддерживается только кодировка «utf-8».

// Кодировщик имеет следующие два метода:

// encode(str) – возвращает бинарный массив Uint8Array, содержащий закодированную строку.
// encodeInto(str, destination) – кодирует строку (str) и помещает её в destination, который должен быть экземпляром Uint8Array.

let encoder = new TextEncoder();

uint8Array = encoder.encode('Hello');
console.log(uint8Array); // Uint8Array 72,101,108,108,111
