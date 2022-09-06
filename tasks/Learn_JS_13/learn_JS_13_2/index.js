import { months, MODULES_BECAME_STANDARD_YEAR, User, test, up } from './test.js';

console.log(months);
console.log(MODULES_BECAME_STANDARD_YEAR);
console.log(User);
console.log(test);
up();

// не оч
import * as Test from './test2.js';
// если мы подключаем как было выше, то webpack смотрит что используется, а что нет и оптимизирует
// более короткие имена вместо Test.test => test
// код тупо более понятен

console.log(Test); // Module {Symbol(Symbol.toStringTag): 'Module'}
console.log(Test.bye); // 'bye'

// можно менять имена, прям как у деструктуризации
// используется as (как)
import { bye as byeBye, hello as helloHello } from './test2.js';

console.log(byeBye); // 'bye'
console.log(helloHello); // 'hello'

// также есть и для экспорта

import { Guest } from './as.js';

// в файле передал как Guest
console.log(Guest);

// может быть модуль с библиотекой, который много чё импортирует
// а может быть импорт чего-то одного

// для последнего придумали export default чтобы экспортировать что-то одно

// теперь можно импортировать без фигурных скобок!!
// export default не больше 1
import Admin from './default.js';

console.log(new Admin('admin')); // Admin {name: 'admin'}

// нельзя без имени ипортировать
// export function(user) { }

// с export default можно
import f from './noname.js';
f(); // 'default without name'

// можно экспортировать функцию default отдельно

function def() {}

// тоже самое что и export default
export { def as default };

// импортируем дефолт с именованным

import { default as Car, say } from './defAndNone.js';

console.log(new Car('car')); // Car {name: 'car'}
say(); // 'say'

// если всё импортируем

import * as all from './defAndNone.js';

console.log(all.default); // то что default

// существует реэкспорт

// типа export ... from ...
// это чтобы если кидаю любу, чтобы пользователи не рылись в файлах

import { month as month2, User as User2 } from './test.js';
export { month2, User2 };

// либо

export { Admin2 } from './reexport.js';
