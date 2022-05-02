function findSeventhSonsOfSeventhSons(json) {
  const family = JSON.parse(json);
  const seventhSon = new Set();
  const arr = [];

  let breakChild = false;

  family.children.forEach((itemDad, indexDad) => {
    if (indexDad == 6 && itemDad.gender == 'male') {
      arr.push(
        itemDad.children.find((itemSon, indexSon) => {
          if (indexSon == 6 && itemSon.gender == 'male' && !breakChild) {
            return true;
          } else if (itemSon.gender != 'male') {
            breakChild = true;
          }
        })
      );
    } else if (itemDad.gender != 'male') {
      breakChild = true;
    }
  });
  arr.map((item) => {
    if (item) seventhSon.add(item.name);
  });
  return seventhSon;
}

const test1 = {
  name: 'A',
  gender: 'male',
  children: [
    { name: 'B', gender: 'male', children: [] },
    { name: 'C', gender: 'male', children: [] },
    { name: 'D', gender: 'male', children: [] },
    { name: 'E', gender: 'male', children: [] },
    { name: 'F', gender: 'male', children: [] },
    { name: 'G', gender: 'male', children: [] },
    {
      name: 'H',
      gender: 'male',
      children: [
        // This is a seventh son
        { name: 'I', gender: 'male', children: [] },
        { name: 'J', gender: 'male', children: [] },
        { name: 'K', gender: 'male', children: [] },
        { name: 'L', gender: 'male', children: [] },
        { name: 'M', gender: 'male', children: [] },
        { name: 'N', gender: 'male', children: [] },
        { name: 'O', gender: 'male', children: [] }, // This is a sventh son of a seventh son
      ],
    },
  ],
};

const test2 = {
  name: 'A',
  gender: 'male',
  children: [
    { name: 'B', gender: 'male', children: [] },
    { name: 'C', gender: 'male', children: [] },
    { name: 'D', gender: 'male', children: [] },
    { name: 'E', gender: 'male', children: [] },
    { name: 'F', gender: 'male', children: [] },
    { name: 'G', gender: 'male', children: [] },
    {
      name: 'H',
      gender: 'male',
      children: [
        // This is a seventh son
        { name: 'I', gender: 'male', children: [] },
        { name: 'J', gender: 'male', children: [] },
        { name: 'K', gender: 'male', children: [] },
        { name: 'L', gender: 'male', children: [] },
        { name: 'M', gender: 'male', children: [] },
        { name: 'N', gender: 'male', children: [] },
        { name: 'O', gender: 'female', children: [] }, // The seventh son of a seventh son is in fact a daughter!
      ],
    },
  ],
};

const test3 = [
  {
    name: 'A',
    gender: 'male',
    children: [
      { name: 'B', gender: 'male', children: [] },
      { name: 'C', gender: 'male', children: [] },
      { name: 'D', gender: 'male', children: [] },
      { name: 'E', gender: 'male', children: [] },
      { name: 'F', gender: 'male', children: [] },
      { name: 'G', gender: 'male', children: [] },
      {
        name: 'H',
        gender: 'male',
        children: [
          // This is a seventh son
          { name: 'I', gender: 'male', children: [] },
          { name: 'J', gender: 'male', children: [] },
          { name: 'K', gender: 'male', children: [] },
          { name: 'L', gender: 'male', children: [] },
          { name: 'M', gender: 'male', children: [] },
          { name: 'N', gender: 'male', children: [] },
          { name: 'O', gender: 'female', children: [] }, // The seventh son of a seventh son is in fact a daughter!
        ],
      },
    ],
  },
  {
    name: 'A',
    gender: 'male',
    children: [
      { name: 'B', gender: 'male', children: [] },
      { name: 'C', gender: 'male', children: [] },
      { name: 'D', gender: 'male', children: [] },
      { name: 'E', gender: 'male', children: [] },
      { name: 'F', gender: 'male', children: [] },
      { name: 'G', gender: 'male', children: [] },
      {
        name: 'H',
        gender: 'male',
        children: [
          // This is a seventh son
          { name: 'I', gender: 'male', children: [] },
          { name: 'J', gender: 'male', children: [] },
          { name: 'K', gender: 'male', children: [] },
          { name: 'L', gender: 'male', children: [] },
          { name: 'M', gender: 'male', children: [] },
          { name: 'N', gender: 'male', children: [] },
          { name: 'O', gender: 'female', children: [] }, // The seventh son of a seventh son is in fact a daughter!
        ],
      },
    ],
  },
];

console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test1)));
console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test2)));
// console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test3)));
