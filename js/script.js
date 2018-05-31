(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    function random(min, max) {
      return Math.round(Math.random() * (max- min)) + min;
    }
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = innerWidth - 0;
    canvas.height = innerHeight - 4;
    const c = canvas.getContext('2d');
    c.fillStyle = '#000000';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#00ff2f';
    c.font = '100pt Arial';
    c.shadowColor = '#00ff3f';
    c.shadowBlur = 16;
    c.fillText(String.fromCharCode(0x30A0 + random(0, 1)), 10, 100);
  });
})();
