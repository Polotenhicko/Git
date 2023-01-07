class State {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.timeStamp;
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class DVDLogo {
  constructor(fps) {
    const logo = document.getElementById('logo');
    this.logo = logo;
    this._fps = isFinite(fps) ? fps : 60;
    this.state = new State(0, 0, 2, 2);
    this.properties = {
      width: this.logo.clientWidth,
      height: this.logo.clientHeight,
    };
  }

  #startIntervalRender() {
    this.moveInterval = setInterval(() => {
      this.render();
    }, 1e3 / this._fps);
  }

  set fps(value) {
    clearInterval(this.moveInterval);
    this._fps = isFinite(value) ? value : 60;
    if (this.moveInterval) this.#startIntervalRender();
  }

  move() {
    this.state.timeStamp = Date.now();
    this.#startIntervalRender();
  }

  calcTrajectory() {
    const rightX = this.state.x + this.properties.width;
    const bottomY = this.state.y + this.properties.height;
    let countAngle = 0;
    if (this.state.x <= 0) {
      this.state.x = 0;
      this.state.dx = -this.state.dx;
      countAngle += 1;
    }
    if (this.state.y <= 0) {
      this.state.y = 0;
      this.state.dy = -this.state.dy;
      countAngle += 1;
    }
    if (rightX >= this.logo.offsetParent.clientWidth) {
      this.state.x = Math.floor(this.logo.offsetParent.clientWidth - this.properties.width);
      this.state.dx = -this.state.dx;
      countAngle += 1;
    }
    if (bottomY >= this.logo.offsetParent.clientHeight) {
      this.state.y = Math.floor(this.logo.offsetParent.clientHeight - this.properties.height);
      this.state.dy = -this.state.dy;
      countAngle += 1;
    }
    if (countAngle > 0) this.changeColor();
  }

  changeColor() {
    this.logo.style.fill = getRandomColor();
  }

  render() {
    this.calcTrajectory();
    const diffTime = Date.now() - this.state.timeStamp;
    this.state.x = this.state.dx * (diffTime / 10) + this.state.x;
    this.state.y = this.state.dy * (diffTime / 10) + this.state.y;
    this.logo.style.left = this.state.x + 'px';
    this.logo.style.top = this.state.y + 'px';
    this.state.timeStamp = Date.now();
  }

  stop() {
    clearInterval(this.moveInterval);
  }
}

const dvd = new DVDLogo(60);
dvd.move();
// setInterval(() => {
//   dvd.fps = dvd._fps == 240 ? 15 : 240;
// }, 1500);
