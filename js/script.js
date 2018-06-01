(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    // setup
    let last = 0;
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = 1920;//innerWidth - 0;
    canvas.height = 1080;//innerHeight - 4;
    const c = canvas.getContext('2d');
    function random(min, max) {
      return Math.round(Math.random() * (max- min)) + min;
    }
    function clear() {
      c.fillStyle = '#000000';
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
    function Symbol(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.change = () => {
        c.fillStyle = '#00ff2f';
        c.font = '100pt Arial';
        c.shadowColor = '#00ff3f';
        c.shadowBlur = 10;
        c.fillText(String.fromCharCode(0x30A0 + random(0, 96)), this.x, this.y);
      };
      this.render = () => {

      };
    }
    (function drawLoop(timestamp) {
      draw(timestamp);
      requestAnimationFrame(drawLoop);
    })();
    // loop
    function draw(t) {
      t = Math.floor(t);
      let progress = t - last;
      console.log(progress);
      if (progress > 100) {
        clear();
        new Symbol(random(0, innerWidth), random(0, innerHeight)).change();
        last = t;
      }
    }
  });
})();
