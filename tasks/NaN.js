// Нахождение NaN без Number.isNaN

function checkNaN(value) {
	if (!(value < Infinity) && value != -Infinity) {
		alert("Это NaN!");
	} else {
		alert("Это обычное число!");
	}
}

let value = +prompt("Введите число", 0);

checkNaN(value);

console.group();
console.log(`value: ${value}`);
console.log(`typeof: ${typeof value}`);
console.group();
