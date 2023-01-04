class State {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }
}

class DVDLogo {
  constructor(fps) {
    const logo = document.getElementById('logo');
    this.logo = logo;
    this.fps = isFinite(fps) ? fps : 60;
    this.state = new State(0, 0, 10, 10);
    this.properties = {
      width: this.logo.clientWidth,
      height: this.logo.clientHeight,
    };
  }

  move() {
    this.moveInterval = setInterval(() => {
      this.calcTrajectory();
      this.render();
    }, 1 / this.fps);
  }

  calcTrajectory() {
    const rightX = this.state.x + this.properties.width;
    const bottomY = this.state.y + this.properties.height;
    if (this.state.x <= 0) {
      this.state.x = 0;
      this.state.dx = -this.state.dx;
    }
    if (this.state.y <= 0) {
      this.state.y = 0;
      this.state.dy = -this.state.dy;
    }
    if (rightX >= this.logo.offsetParent.clientWidth) {
      this.state.x = this.logo.offsetParent.clientWidth - this.properties.width;
      this.state.dx = -this.state.dx;
    }
    if (bottomY >= this.logo.offsetParent.clientHeight) {
      this.state.y = this.logo.offsetParent.clientHeight - this.properties.height;
      this.state.dy = -this.state.dy;
    }
  }

  render() {
    this.state.x = this.state.dx + this.state.x;
    this.state.y = this.state.dy + this.state.y;
    this.logo.style.left = this.state.x + 'px';
    this.logo.style.top = this.state.y + 'px';
  }

  stop() {
    clearInterval(this.moveInterval);
  }
}

const dvd = new DVDLogo(60);
dvd.move();
setTimeout(() => dvd.stop(), 5e3);
