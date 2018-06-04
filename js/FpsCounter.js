class FpsCounter {
  constructor() {
    this.lastTime = 0;
    this.lastFps = [];
    this.fps = 0;
    this.overlay = (() => {
      const div = document.createElement('div');
      s(div, {
        style: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          backgroundColor: '#000000'
        }
      });
      const span = document.createElement('span');
      div.appendChild(span);
      const box = document.createElement('div');
      div.appendChild(box);
      box.style.width = '60px';
      box.style.border = '1px solid #ffffff';
      return div;
    })();
  }
  calc(time) {
    time = Math.floor(time) % 1000;
    if (time > this.lastTime) {
      this.fps++;
    } else {
      this.lastFps.unshift(this.fps);
      if (this.lastFps.length > 10) {
        this.lastFps.pop();
      }
      this.fps = 1;
      this.history();
    }
    this.lastTime = time;
    this.display();
  }
  toggle() {
    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    } else {
      document.body.appendChild(this.overlay);
    }
  }
  ftc(fps) {
    return fixLen(mapN(fps, 0, 60, 0, 255).toString(16), 2);
  }
  bar(bar, fps) {
    const box = this.overlay.children[1];
    bar.style.height = '4px';
    bar.style.width = fps + 'px';
    bar.style.backgroundColor = '#ff' + this.ftc(fps) + this.ftc(fps);
  }
  history() {
    const box = this.overlay.children[1];
    box.style.height = '0px';
    box.innerHTML = '';
    for (const fps of this.lastFps) {
      const bar = document.createElement('div');
      box.appendChild(bar);
      box.style.height = (parseInt(box.style.height.replace('px', '')) + 4) + 'px';
      this.bar(bar, fps);
    }
  }
  display() {
    const text = this.overlay.children[0];
    const bar = this.overlay.children[1].children[0];
    text.innerText = 'FPS: ' + this.lastFps[0];
    text.style.color = '#ff' + this.ftc(this.lastFps[0]) + this.ftc(this.lastFps[0]);
    this.bar(bar, this.fps);
  }
}
const fps = new FpsCounter();
