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
  isWork = false;
  tempPerSec = 0;
  _startTemp;

  stop() {
    this.isWork = false;
    console.log('Чайник выключился');
    clearInterval(this.timerSensor);
    super.stopHeat();
  }

  start() {
    super.startHeat();
    this.isWork = true;
    this._startTemp = this.t;

    this.timerSensor = setInterval(() => {
      if (this.t > 100) {
        this.stop();
      } else {
        this.tempPerSec = this.t - this._startTemp;
        this._startTemp = this.t;
        console.log(`${this.t}° Осталось ${this.getApproxRemainTime()}сек | ${this.getTime()}`);
      }
    }, 1e3);
  }

  getCurrentTemp() {
    return this.t;
  }

  getTime() {
    const date = new Date();
    const formatDate = (time) => (time < 10 ? `0${time}` : time);
    return `${formatDate(date.getHours())}:${formatDate(date.getMinutes())}:${formatDate(date.getSeconds())}`;
  }

  getApproxRemainTime() {
    if (this.isWork && this.t < 100) {
      return Math.round((100 - this.t) / this.tempPerSec);
    }
    return 0;
  }
}

let test = new Kettle(80);
