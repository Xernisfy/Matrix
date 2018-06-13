(function () {
  document.addEventListener('DOMContentLoaded', function () {
    //setup
    const html = document.documentElement;
    const body = document.body;
    body.style.backgroundColor = '#000000';
    const canvas = document.createElement('canvas');
    body.appendChild(canvas);
    const c = canvas.getContext('2d');
    window.c = c;
    let lines = [];
    window.lines = lines;
    let solo = [];
    window.solo = solo;
    if (config.showFps) {
      fps.toggle();
    }
    function resize() {
      styleOnResize(html, body, canvas);
    }
    function gradients() {
      const coors = [
        [
          [canvas.width, 0, canvas.width - config.edgeBlur, 0],
          [canvas.width - config.edgeBlur, 0, config.edgeBlur, canvas.height]
        ],
        [
          [0, canvas.height, 0, canvas.height - config.edgeBlur],
          [0, canvas.height - config.edgeBlur, canvas.width, config.edgeBlur]
        ],
        [
          [0, 0, config.edgeBlur, 0],
          [0, 0, config.edgeBlur, canvas.height]
        ],
        [
          [0, 0, 0, config.edgeBlur],
          [0, 0, canvas.width, config.edgeBlur]
        ]
      ];
      for (const coor of coors) {
        let gradient = c.createLinearGradient.apply(c, coor[0]);
        gradient.addColorStop(0, mapColor(config.bgColor));
        gradient.addColorStop(1, mapColor(config.bgColor) + '00');
        c.fillStyle = gradient;
        c.fillRect.apply(c, coor[1]);
      }
    }
    resize();
    onresize = resize;
    for (let i = 0; i < config.maxLines; i++) {
      lines.push(new Line(c, 5, random(5, 20)));
    }
    canvas.addEventListener('click', () => {
      //lines.pop();
      lines.push(new Line(c, 5, random(5, 20)));
    });
    // loop
    function draw() {
      // main background
      c.fillStyle = mapColor(config.bgColor);
      c.fillRect(0, 0, canvas.width, canvas.height);
      // draw the characters
      for (let i = 0; i < lines.length; i++) {
        lines[i].draw();
        if (lines[i].delete) {
          lines.splice(lines.indexOf(lines[i]), 1)
          i--;
        }
      }
      c.save();
      solo.forEach((character) => {
        if (solo.length > config.maxLines * 4) {
          solo.shift();
        } else {
          character.setColor(mapColor('1 0.5 0'));
          character.draw();
        }
      });
      c.restore();
      // border gradients for blur effect
      gradients();
    }
    (function drawLoop(timestamp) {
      draw();
      fps.calc(timestamp);
      //requestAnimationFrame(drawLoop);
      setTimeout(drawLoop, 1000 / (config.speed || 1));
    })();
  });
  window.wallpaperPropertyListener = {
    applyUserProperties: (properties) => {
      const event = new CustomEvent('propertyChange', properties);
    }
  };
})();
