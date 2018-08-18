window.shared = {};

function charArray(start, length) {
  let charArray = [];
  for (let i = 0; i < length; i++) {
    charArray.push(String.fromCharCode(start + i));
  }
  return charArray;
}

shared.latin = charArray(0x0041, 26);
shared.weird = charArray(0x16A0, 80);
shared.braille = charArray(0x2800, 255);
shared.katakana = charArray(0x30A0, 95);

function decide(s, c, d) {
  return s[c] || s[d] || d;
}

function s(o, s) {
  function t(p, v) {
    for (let k in v) {
      if (v[k].constructor.name === 'Object') {
        t(p[k], v[k]);
      } else {
        p[k] = v[k];
      }
    }
  }
  t(o, s);
}

function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function createCanvas() {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const context = canvas.getContext('2d');
  return [canvas, context];
}

function styleOnResize(html, body, canvases) {
  s(html, {
    style: {
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }
  });
  s(body, {
    style: {
      height: '100%',
      width: '100%',
      margin: '0px'
    }
  });
  canvases.forEach(canvas => {
    s(canvas, {
      height: window.innerHeight,
      width: window.innerWidth,
      style: {
        position:'absolute'
      }
    });
  });
}

function mapN(v, min1, max1, min2, max2) {
  return Math.floor((v - min1) / (max1 - min1) * (max2 - min2) + min2);
}

function getUrlParameters(url) {
  const parameters = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => {
    parameters[k] = v;
  });
  return parameters;
}

function fixLen(numString, length) {
  let zeroes = '';
  for (let i = 0; i < length; i++) {
    zeroes += '0';
  }
  return (zeroes + numString).substr(-length, length);
}

function mapColor(string) {
  if (shared[string]) {
    return shared[string];
  } else {
    const values = string.split(' ');
    let hexCode = '#';
    values.map((c) => {
      hexCode += fixLen(Math.ceil(c * 255).toString(16), 2);
    });
    shared[string] = hexCode;
    return hexCode;
  }
}
