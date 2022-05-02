const student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null,
};

let json = JSON.stringify(student);

console.log(typeof json); // string
console.log(json); // {"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"wife":null}

const user = {
  sayHi() {
    // будет пропущено
    alert('Hello');
  },
  [Symbol('id')]: 123, // также будет пропущено
  something: undefined, // как и это - пропущено
};

console.log(JSON.stringify(user)); // {} (пустой объект)

let room = {
  name: 'room',
  number: 23,
};

let meetup = {
  title: 'Conference',
  participants: ['john', 'ann'],
};

let test = {
  name: 'test',
};

meetup.place = room; // meetup ссылается на room
room.occupiedBy = test; // room ссылается на meetup
test.ref = meetup;

try {
  JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в JSON
} catch (er) {
  console.error(er);
}

console.log(
  JSON.stringify(meetup, [
    'title',
    'name',
    'participants',
    'place',
    'number',
    'occupiedBy',
  ]) // нет цикла, т.к. нет ref
);
console.log('/////////');
console.log(
  JSON.stringify(
    meetup,
    function replacer(key, value) {
      console.log(key, value);
      return key == 'occupiedBy' ? undefined : value;
    },
    2
  )
);

room = {
  name: '123',
  number: 23,
  toJSON() {
    return this.name;
  },
  [Symbol.toPrimitive](hint) {
    console.log(hint);
    return hint;
  },
};

meetup = {
  title: 'Conference',
  room,
};
// Нет преобразования в строку
console.log(JSON.stringify(room)); // '123'

console.log(JSON.stringify(meetup));

json = JSON.stringify(meetup);

console.log(JSON.parse(json)); // {title: 'Conference', room: '123'}

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

meetup = JSON.parse(str);

console.log(meetup); // date - строка
try {
  console.log(meetup.date.getMonth()); // Ошибка
} catch (er) {
  console.error(er);
}

meetup = JSON.parse(str, function (key, value) {
  return key == 'date' ? new Date(value) : value;
});

console.log(meetup.date.getMonth()); // 10

/////////

console.log('///////////////');

room = {
  number: 23,
};

meetup = {
  title: 'Совещание',
  occupiedBy: [{ name: 'Иванов' }, { name: 'Петров' }],
  place: room,
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    if (value == meetup && key !== '') {
      return undefined;
    } else {
      return value;
    }
  })
);

/* в результате должно быть:
{
  "title":"Совещание",
  "occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
  "place":{"number":23}
}
*/
