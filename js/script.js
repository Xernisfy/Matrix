(function () {
  document.addEventListener('DOMContentLoaded', function () {
    //setup
    const html = document.documentElement;
    const body = document.body;
    const canvas = document.createElement('canvas');
    body.appendChild(canvas);
    const c = canvas.getContext('2d');
    let lines = [];
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
    // loop
    function draw() {
      // main background
      c.fillStyle = mapColor(config.bgColor);
      c.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 10; i++) {
        lines.push(new Line());
      }





      // border gradients for blur effect
      gradients();
    }
    (function drawLoop(timestamp) {
      draw();
      fps.calc(timestamp);
      requestAnimationFrame(drawLoop);
    })();
  });
  window.wallpaperPropertyListener = {
    applyUserProperties: (properties) => {
      const event = new CustomEvent('propertyChange', properties);
    }
  };
})();
