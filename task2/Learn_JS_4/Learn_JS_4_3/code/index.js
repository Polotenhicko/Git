// Создайте интерфейс, позволяющий ввести сумму банковского вклада и процент,
//  а затем рассчитать, какая это будет сумма через заданный промежуток времени.
const form = document.forms.calculator;
const diagram = document.getElementById('diagram');
const moneyBefore = document.getElementById('money-before');
const moneyAfter = document.getElementById('money-after');
const heightAfter = document.getElementById('height-after');

for (const item of form.elements) {
  item.oninput = calcDeposit;
}

function calcDeposit(e) {
  const initial = +form.elements.money.value;
  const interest = +form.elements.interest.value / 100;
  const years = +form.elements.months.value / 12;

  const result = Math.round(initial * (1 + interest) ** years);
  if (result <= 0 || isNaN(result)) return;
  moneyBefore.innerText = initial;
  moneyAfter.innerText = result;

  const height = (result * 100) / initial;

  heightAfter.style.height = height + 'px';
}
