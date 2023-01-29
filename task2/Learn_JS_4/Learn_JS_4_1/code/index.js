// Выведите значение и текст выбранного пункта.
// Добавьте пункт: <option value="classic">Классика</option>.
// Сделайте его выбранным.

const genres = document.getElementById('genres');

const selectedOption = genres.options[genres.selectedIndex];
console.log(selectedOption.value, selectedOption.text); // blues Блюз

const classicOption = new Option('Классика', 'classic');
genres.append(classicOption);

// Сделать выбранным:
// 1
classicOption.selected = true;

console.log(genres.value); // 'Classic'

// 2
classicOption.selected = false;

genres.selectedIndex = 2;
console.log(genres.value); // 'Classic'
