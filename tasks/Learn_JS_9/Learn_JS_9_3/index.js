// мы можем присвоить метод самому классу, такие методы называются статическими

let User = class {
  static method() {
    console.log(this === User);
  }
};

User.method(); // true

// это тоже самое что и присвоить метод напрямую как свойство функции

User = class {};

User.method = function method() {
  console.log(this === User);
};

User.method(); // true

// пример использования

class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }

  static createTodays() {
    // помним, что this = Article
    return new this('Сегодняшний дайджест', new Date());
  }
}

let articles = [
  new Article('HTML', new Date(2019, 1, 1)),
  new Article('CSS', new Date(2019, 0, 1)),
  new Article('JavaScript', new Date(2019, 11, 1)),
];

articles.sort(Article.compare);

console.log(articles);

console.log(Article.createTodays().title); // Сегодняшний дайджест

// Существуют статические свойства, но работают только в последнем хроме

class Article2 {
  static name = 'Илья';
}

console.log(Article2.name); // "Илья"

// Статические методы и свойства наследуются

class Animal {
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} прячется!`);
  }
}

let rabbits = [new Rabbit('Белый кролик', 10), new Rabbit('Чёрный кролик', 5)];

// использование родительского статического метода
rabbits.sort(Rabbit.compare);

console.log(rabbits); // отсортировался массив по скоростям

// extends даёт Rabbit ссылку [[Prototype]] на Animal

console.log(Rabbit.__proto__ === Animal); // true
console.log(Rabbit.prototype.__proto__ === Animal.prototype); // true
