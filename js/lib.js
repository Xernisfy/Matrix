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
      width: window.innerWidth
    });
  });
}

function mapN(v, min1, max1, min2, max2) {
  return Math.floor((v - min1) / (max1 - min1) * (max2 - min2) + min2);
}

function l(text) {
  console.clear();
  console.log(text);
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
  const values = string.split(' ');
  let hexCode = '#';
  values.map((c) => {
    hexCode += fixLen(Math.ceil(c * 255).toString(16), 2);
  });
  return hexCode;
}
