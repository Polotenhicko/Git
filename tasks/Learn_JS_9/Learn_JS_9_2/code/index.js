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
  constructor(temp) {
    this.t = !isNaN(temp) ? temp : 0;
  }

  startHeat() {
    this.timerHeat = setInterval(() => this.t++, 500);
  }

  stopHeat() {
    clearInterval(this.timerHeat);
  }
}

class Kettle {
  constructor(startTemperature = 0) {
    this.env = new Environment(startTemperature);
  }

  _startTemp;
  _isWork = false;
  _tempPerSec = 0;
  _maxTemp = 100;
  #criticalMaxTemp = 200;

  stop() {
    if (this._isWork) {
      this._isWork = false;
      console.log('Чайник выключился');
      clearInterval(this.timerSensor);
      this._tempPerSec = 0;
      this.env.stopHeat();
    } else {
      console.error('Чайник не включён');
    }
  }

  start() {
    if (!this._isWork) {
      this.env.startHeat();
      this._isWork = true;
      this._startTemp = this.env.t;

      this.timerSensor = setInterval(() => {
        if (this.env.t > this._maxTemp) {
          this.stop();
        } else {
          this._tempPerSec = this.env.t - this._startTemp;
          this._startTemp = this.env.t;
          console.log(`${this.env.t}° Осталось ${this.getApproxRemainTime()}сек | ${this.getTime()}`);
        }
      }, 1e3);
    } else {
      console.error('Чайник уже включён');
    }
  }

  getCurrentTemp() {
    return this.env.t;
  }

  getTime() {
    const date = new Date();
    const formatDate = (time) => (time < 10 ? `0${time}` : time);
    return `${formatDate(date.getHours())}:${formatDate(date.getMinutes())}:${formatDate(date.getSeconds())}`;
  }

  getApproxRemainTime() {
    if (this._isWork && this.env.t < this._maxTemp) {
      return Math.round((this._maxTemp - this.env.t) / this._tempPerSec);
    }
    return 0;
  }

  incMaxTemp() {
    if (this._maxTemp < this.#criticalMaxTemp) {
      this._maxTemp++;
      console.log('Чайник выключится при ' + this._maxTemp);
    } else {
      console.error('Максимальная температура выключения чайника: ' + this.#criticalMaxTemp + '°');
    }
  }

  decMaxTemp() {
    if (this._maxTemp > 2) {
      this._maxTemp--;
      console.log('Чайник выключится при ' + this._maxTemp);
    } else {
      console.error('Минимальная температура выключения чайника: 2°');
    }
  }
}

let test = new Kettle(80);
