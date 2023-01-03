class State {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }
}

class DVDLogo {
  constructor(src, fps) {
    const logo = document.createElement('img');
    const field = document.getElementById('field');
    if (!field) {
      const field = document.createElement('field');
      field.id = 'field';
      document.body.append(field);
    }
    logo.src = src;
    logo.classList.add('logo');
    field.append(logo);
    this.logo = logo;
    this.fps = isFinite(fps) ? fps : 60;
    this.state = new State(0, 0);
  }

  move() {
    this.moveInterval = setInterval(() => {
      this.render(this.state.x, this.state.y);
    }, 1 / this.fps);
  }

  render(x, y) {
    this.state.x = this.state.dx + x;
    this.state.y = this.state.dy + y;
    this.logo.style.left = x + 'px';
    this.logo.style.top = y + 'px';
  }

  stop() {
    clearInterval(this.moveInterval);
  }
}

new DVDLogo('./logo.png', 60);
