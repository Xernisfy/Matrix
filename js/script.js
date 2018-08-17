(function () {
  document.addEventListener('DOMContentLoaded', function () {
    //change default config
    if (location.href.match(/\?.*/)) {
      let urlParms = location.href.match(/\?.*/)[0].substring(1).split('&');
      for (const urlParm of urlParms) {
        let tmp = urlParm.split('=');
        let value;
        if (tmp[1] === 'true') {
          value = true;
        } else if (tmp[1] === 'false') {
          value = false;
        } else if (tmp[1].includes('%')) {
          value = decodeURIComponent(tmp[1]);
        } else if (/^\d+$/.test(tmp[1])) {
          value = parseInt(tmp[1]);
        } else {
          value = tmp[1];
        }
        config[tmp[0]] = value;
      }
    }
    //setup
    const html = document.documentElement;
    const body = document.body;
    body.style.backgroundColor = mapColor(config.bgColor);
    const ghost = document.createElement('canvas');
    document.body.appendChild(ghost);
    let g = ghost.getContext('2d');
    const canvas = document.createElement('canvas');
    body.appendChild(canvas);
    const c = canvas.getContext('2d');
    const vignette = document.createElement('canvas');
    body.appendChild(vignette);
    const v = vignette.getContext('2d');
    const img = document.createElement('img');
    body.appendChild(img);
    if (config.special) {
      for (const s in specials[config.special]) {
        config[s] = specials[config.special][s];
      }
    }
    if (config.special === 'mfc') {
      img.src = 'png/MFC.png';
      img.style.position = 'absolute';
    }
    let lines = [];
    if (config.showFps) {
      fps.toggle();
    }
    function resize() {
      styleOnResize(html, body, [canvas, vignette, ghost]);
      gradients();
      ghostWriter();
      if (config.special === 'mfc') {
        img.style.top = (window.innerHeight / 3) + 'px';
        img.style.left = (window.innerWidth / 2 - 400 / 2) + 'px';
      }
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
        v.fillStyle = gradient;
        v.fillRect.apply(v, coor[1]);
      }
    }
    function ghostWriter() {
      g.font = window.innerWidth / (config.ghostText.length * (1 - 0.5 * config.ghostSize) || 1) + 'px ' + config.ghostFont;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillStyle = mapColor(config.bgColor);
      g.fillText(config.ghostText, window.innerWidth / 2, window.innerHeight / 2);
    }
    resize();
    onresize = resize;
    for (let i = 0; i < config.maxLines; i++) {
      lines.push(new Line(c));
    }
    // loop
    function draw() {
      // main background
      c.save();
      c.fillStyle = mapColor(config.bgColor) + fixLen(config.filterOpacity.toString(16), 2);
      c.fillRect(0, 0, canvas.width, canvas.height);
      c.restore();
      // draw the main text in the center
      c.save();
      c.font = window.innerWidth / (config.centerText.length * (1 - 0.5 * config.centerSize) || 1) + 'px ' + config.centerFont;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillStyle = mapColor(config.centerColor);
      c.fillText(config.centerText, window.innerWidth / 2, window.innerHeight / (config.special === 'mfc' ? 4 : 2));
      c.restore();
      // draw the characters
      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].speed; j++) {
          if (lines[i].delete) {
            lines.splice(lines.indexOf(lines[i]), 1);
            i--;
            break;
          } else {
            lines[i].draw(g, v);
          }
        }
      }
      if (lines.length < config.maxLines) {
        lines.push(new Line(c));
      }
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
