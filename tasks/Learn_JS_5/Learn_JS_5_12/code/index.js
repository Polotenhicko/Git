// Найти седьмых сыновей седьмых сыновей

// https://www.codewars.com/kata/5a15b54bffe75f31990000e0

function findSeventhSonsOfSeventhSons(json) {
  const parent = JSON.parse(json);
  const seventhSons = new Set();

  function findName(parent) {
    let isBreakChild = false;

    let test = parent.find((item, index) => {
      if (index <= 6 && item.gender != 'male') isBreakChild = true;
      if (index == 6 && !isBreakChild) return true;
    });

    if (test) {
      test = test.children.find((item, index) => {
        if (index <= 6 && item.gender != 'male') isBreakChild = true;
        if (index == 6 && !isBreakChild) return true;
      });
    }

    if (test) seventhSons.add(test.name);

    parent.forEach((item) => {
      if (item.children.length) {
        findName(item.children);
      }
    });
  }

  findName(parent.children, false);

  return seventhSons;
}

const test4 = {
  name: 'A',
  gender: 'male',
  children: [
    {
      name: 'B',
      gender: 'male',
      children: [
        // This is a seventh son
        { name: 'I', gender: 'male', children: [] },
        { name: 'J', gender: 'male', children: [] },
        { name: 'K', gender: 'male', children: [] },
        { name: 'L', gender: 'male', children: [] },
        { name: 'M', gender: 'male', children: [] },
        { name: 'N', gender: 'male', children: [] },
        {
          name: 'S',
          gender: 'male',
          children: [
            // This is a seventh son
            { name: 'I', gender: 'male', children: [] },
            { name: 'J', gender: 'male', children: [] },
            { name: 'K', gender: 'male', children: [] },
            { name: 'L', gender: 'male', children: [] },
            { name: 'M', gender: 'male', children: [] },
            { name: 'N', gender: 'male', children: [] },
            { name: 'SS', gender: 'male', children: [] },
          ],
        },
      ],
    },
    { name: 'Cc', gender: 'male', children: [] },
    { name: 'Dd', gender: 'male', children: [] },
    { name: 'Ee', gender: 'male', children: [] },
    { name: 'Ff', gender: 'male', children: [] },
    { name: 'Gg', gender: 'male', children: [] },
    {
      name: 'Hh',
      gender: 'male',
      children: [
        // This is a seventh son
        { name: 'Ii', gender: 'male', children: [] },
        { name: 'Jj', gender: 'male', children: [] },
        { name: 'Kk', gender: 'male', children: [] },
        { name: 'Ll', gender: 'male', children: [] },
        { name: 'Mm', gender: 'male', children: [] },
        { name: 'Nn', gender: 'male', children: [] },
        { name: 'Oo', gender: 'male', children: [] }, // The seventh son of a seventh son is in fact a daughter!
      ],
    },
  ],
};

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

const test3 = {
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

console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test1))); // {'O'}
console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test2))); // {}
console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test3))); // {}
console.log(findSeventhSonsOfSeventhSons(JSON.stringify(test4))); // {'Oo', 'SS'}
