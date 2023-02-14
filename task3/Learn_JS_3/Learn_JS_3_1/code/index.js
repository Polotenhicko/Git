// Создайте асинхронную функцию getUsers(names), которая получает на вход массив логинов пользователей GitHub,
//  запрашивает у GitHub информацию о них и возвращает массив объектов - пользователей.

// Информация о пользователе GitHub с логином USERNAME доступна по ссылке:
// https://api.github.com/users/USERNAME.

async function getUsers(names) {
  return await Promise.all(
    names.map((name) =>
      fetch(`https://api.github.com/users/${name}`).then((response) => (response.ok ? response.json() : null))
    )
  );
}
