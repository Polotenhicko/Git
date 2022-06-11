// Сортируйте и упорядочивайте людей по возрасту с помощью стрелочных функций

// https://www.codewars.com/kata/559f3e20f4f29869cf0000ea

const orderPeople = function orderPeople(people) {
  return people.sort((personA, personB) => personA.age - personB.age); //complete this function
};

console.log(
  orderPeople([
    { age: 83, name: 'joel' },
    { age: 46, name: 'roger' },
    { age: 99, name: 'vinny' },
    { age: 26, name: 'don' },
    { age: 74, name: 'brendan' },
  ])
);
