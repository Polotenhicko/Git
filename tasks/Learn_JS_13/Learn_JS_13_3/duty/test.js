export let test = 123;

export const obj = {
  test: 'test',
};

let a = 'test';

console.log(obj);

export function fn() {
  console.log(a);
  console.log(obj);
}
