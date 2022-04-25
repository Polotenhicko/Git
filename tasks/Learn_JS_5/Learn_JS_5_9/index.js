let user = {
  name: 'John',
  age: 30,
};

// Object.keys(user) = ["name", "age"]
// Object.values(user) = ["John", 30]
// Object.entries(user) = [ ["name","John"], ["age",30] ]

for (let value of Object.values(user)) {
  console.log(value); // John, 30
}

let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

console.log(doublePrices); // {banana: 2, orange: 4, meat: 8}
