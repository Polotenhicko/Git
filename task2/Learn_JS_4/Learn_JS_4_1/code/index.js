// Выведите значение и текст выбранного пункта.
// Добавьте пункт: <option value="classic">Классика</option>.
// Сделайте его выбранным.

const genres = document.getElementById('genres');

const selectedOption = genres.options[genres.selectedIndex];
console.log(selectedOption);
