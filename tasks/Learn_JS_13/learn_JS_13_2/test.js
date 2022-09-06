// экспорт массива
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// экспорт константы
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// экспорт класса
export class User {
  constructor(name) {
    this.name = name;
  }
} // без ; в конце

// точка с запятой после экспорта не ставится

// можно экспортировать отдельно

let test = 123;

// как объект
export { test, up };

// можно экспортировать выше функций
// поднятие, все дела
function up() {
  console.log('up');
}
