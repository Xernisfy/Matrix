(function () {
  document.addEventListener('DOMContentLoaded', function () {
    //setup
    const html = document.documentElement;
    const body = document.body;
    body.style.backgroundColor = mapColor(config.bgColor);
    const canvas = document.createElement('canvas');
    body.appendChild(canvas);
    const c = canvas.getContext('2d');
    window.c = c;
    const vignette = document.createElement('canvas');
    body.appendChild(vignette);
    const v = vignette.getContext('2d');
    let lines = [];
    window.lines = lines;
    let solo = [];
    window.solo = solo;
    if (config.showFps) {
      fps.toggle();
    }
    function resize() {
      styleOnResize(html, body, [canvas, vignette]);
      solo.splice(1, 999999);
      gradients();
    }
    function gradients() {
      const coors = [
        [
          [vignette.width, 0, vignette.width - config.edgeBlur, 0],
          [vignette.width - config.edgeBlur, 0, config.edgeBlur, vignette.height]
        ],
        [
          [0, vignette.height, 0, vignette.height - config.edgeBlur],
          [0, vignette.height - config.edgeBlur, vignette.width, config.edgeBlur]
        ],
        [
          [0, 0, config.edgeBlur, 0],
          [0, 0, config.edgeBlur, vignette.height]
        ],
        [
          [0, 0, 0, config.edgeBlur],
          [0, 0, vignette.width, config.edgeBlur]
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
      lines.push(new Line(c));
    }
    canvas.addEventListener('click', () => {
      //lines.pop();
      lines.push(new Line(c));
    });
    // loop
    function draw() {
      // main background
      c.fillStyle = mapColor(config.bgColor) + '10';
      c.fillRect(0, 0, canvas.width, canvas.height);
      // draw the characters
      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].speed; j++) {
          if (lines[i].delete) {
            lines.splice(lines.indexOf(lines[i]), 1)
            i--;
            break;
          } else {
            lines[i].draw();
          }
        }
      }
      c.save();
      solo.forEach((character) => {
        if (solo.length > 500) {
          solo.shift();
        } else {
          character.setColor(mapColor('1 0.5 0'));
          character.draw();
        }
      });
      c.restore();
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
