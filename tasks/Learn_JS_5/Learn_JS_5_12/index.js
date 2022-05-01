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
  JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return key == 'occupiedBy' ? undefined : value;
  })
);
