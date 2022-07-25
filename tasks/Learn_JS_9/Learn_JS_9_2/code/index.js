// Реализовать на ООП прибор бытовой техники или другой девайс.
// Перед реализацией определитесь какой будет функционал у вашего устройства,
// что может в нем нажать пользователь -
// это будут публичные методы вашего объекта / класса / конструктора - можно сделать как угодно.

// Если у вашего прибора есть временные процессы: например, чайник должен сам выключиться после закипания,
// вам понадобится setTimeout или setInterval.

// Прибор должен уметь только то что он умеет.Например, чайник не может сам нагревать воду,
// он может запустить / остановить этот нагрев и считывать температуру с датчика.
// Нужно делать эмуляцию окружающей среды в отдельном объекте и при запуске чайника делать что - то типо env.startHeat().

class Environment {
  constructor(startTemperature = 0) {
    this.t = !isNaN(startTemperature) ? startTemperature : 0;
  }

  startHeat() {
    this.timerHeat = setInterval(() => this.t++, 500);
  }

  stopHeat() {
    clearInterval(this.timerHeat);
  }
}

class Kettle extends Environment {
  stop() {
    console.log('Чайник выключился');
    clearInterval(this.timerSensor);
    super.stopHeat();
  }

  start() {
    super.startHeat();
    this.timerSensor = setInterval(() => {
      console.log(`${this.t}°`);
      if (this.t > 100) {
        this.stop();
      }
    }, 1e3);
  }
}

let test = new Kettle(90);
