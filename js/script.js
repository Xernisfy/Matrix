(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    // "global" variable declaration
    let lines, currentMaxLines, date, time;
    //change default config
    if (location.href.match(/\?.*/)) {
      let urlParms = location.href.match(/\?.*/)[0].substring(1).split('&');
      for (const urlParm of urlParms) {
        let tmp = urlParm.split('=');
        if (tmp[1] === 'true') {
          config[tmp[0]] = true;
        } else if (tmp[1] === 'false') {
          config[tmp[0]] = false;
        } else if (tmp[1].includes('%')) {
          config[tmp[0]] = decodeURIComponent(tmp[1]);
        } else if (/^\d+$/.test(tmp[1])) {
          config[tmp[0]] = parseInt(tmp[1]);
        } else {
          config[tmp[0]] = tmp[1];
        }
        //overwrite with preset config
        if (tmp[0] === 'special') {
          for (const s in specials[tmp[1]]) {
            config[s] = specials[tmp[1]][s];
          }
        }
      }
    }
    //setup
    document.body.style.backgroundColor = mapColor(config.bgColor);
    const [ghost, g] = createCanvas(false);
    const [canvas, c] = createCanvas();
    const [display, d] = createCanvas();
    const [vignette, v] = createCanvas();
    const img = new Image();
    if (config.ghostImage) {
      img.onload = () => {
        ghostWriter();
      };
      img.src = config.ghostImage;
    }
    lines = [];
    currentMaxLines = 0;
    function resize() {
      styleOnResize(document.documentElement, document.body, [ghost, canvas, display, vignette]);
      gradients();
      ghostWriter();
      writeCenter();
      lines.length = 0;
      currentMaxLines = config.minLines;
      for (let i = 0; i < currentMaxLines; i++) {
        lines.push(new Line(c));
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
      if (config.ghostImage) {
        g.drawImage(img, window.innerWidth / 2 - img.width * window.innerHeight / img.height / 2, window.innerHeight / 2 - img.height * window.innerHeight / img.height / 2, img.width * window.innerHeight / img.height, img.height * window.innerHeight / img.height);
      } else {
        g.font = window.innerWidth / (config.ghostText.length * (1 - 0.5 * config.ghostSize) || 1) + 'px ' + config.ghostFont;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillStyle = mapColor(config.bgColor);
        g.fillText(config.ghostText, window.innerWidth / 2, window.innerHeight / 2);
      }
    }
    function writeCenter() {
      d.save();
      d.font = window.innerWidth / (config.centerText.length * (1 - 0.5 * config.centerSize) || 1) + 'px ' + config.centerFont;
      d.textAlign = 'center';
      d.textBaseline = 'middle';
      d.fillStyle = mapColor(config.centerColor);
      d.fillText(config.centerText, window.innerWidth / 2, window.innerHeight / (config.special === 'mfc' ? 1.2 : 2));
      d.restore();
    }
    function writeTime() {
      date = new Date();
      time = fixLen(date.getHours(), 2) + ':' + fixLen(date.getMinutes(), 2) + ':' + fixLen(date.getSeconds(), 2);
      g.putImageData(g.createImageData(g.canvas.width, g.canvas.height), 0, 0);
      g.font = window.innerWidth / (time.length * (1 - 0.5 * config.ghostSize) || 1) + 'px ' + config.ghostFont;
      g.fillText(time, window.innerWidth / 2, window.innerHeight / 2);
    }
    resize();
    onresize = resize;
    if (config.special === 'time') {
      setInterval(writeTime, 1000);
    }
    // loop
    function draw() {
      // main background
      c.save();
      c.fillStyle = mapColor(config.bgColor) + fixLen(config.filterOpacity.toString(16), 2);
      c.fillRect(0, 0, canvas.width, canvas.height);
      c.restore();
      // draw the characters
      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].speed; j++) {
          if (lines[i].delete) {
            lines[i].create();
            break;
          } else {
            lines[i].draw(g, d);
          }
        }
      }
      if (config.forceMaxLines) { // create lines until maximum is reached
        for (let i = 0; i < currentMaxLines - lines.length; i++) {
          lines.push(new Line(c));
        }
      } else { // create only one line per frame; stop at maximum
        if (currentMaxLines - lines.length > 0) {
          lines.push(new Line(c));
        }
      }
      if (currentMaxLines < config.maxLines && random(0, 99) < config.spawnRate) {
        currentMaxLines++;
      }
      // draw center text
      writeCenter();
    }
    (function drawLoop(timestamp) {
      draw();
      //requestAnimationFrame(drawLoop);
      setTimeout(drawLoop, 1000 / (config.speed || 1));
    })();
  });
  let thread = new Thread([
    'addEventListener(\'message\', (e) => {',
      'console.log(e.data);',
      'postMessage([\'receive\']);',
    '});'
  ]);
  thread.addEventListener('message', (e) => {
    console.log(e.data);
  });
  thread.postMessage('[send]');
  window.wallpaperPropertyListener = {
    applyUserProperties: (properties) => {
      const event = new CustomEvent('propertyChange', properties);
    }
  };
})();
