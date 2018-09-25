'use strict';
const defaultConfig = {
  fgColor: '0 1 0',
  bgColor: '0 0 0',
  stColor: '0.9 1 0.9',
  filterOpacity: 16,
  chars: 'katakana',
  randomChars: true,
  font: 'Consolas',
  centerText: '',
  centerFont: 'Hacked, sans-serif',
  centerColor: '0 1 0',
  centerSize: 1,
  ghostText: '',
  ghostFont: 'sans-serif',
  ghostColor: '0 1 0',
  ghostSize: 1,
  ghostImage: '',
  size: 30,
  screens: 1,
  edgeBlur: 160,
  charBlur: 0,
  parallax: true,
  minLines: 10,
  maxLines: 30,
  forceMaxLines: true,
  eraseRate: 0,
  overwrite: true,
  spawnRate: 50,
  minLineSpeed: 1,
  maxLineSpeed: 10,
  speed: 60,
  special: 'holoeup',
  free: false
};
let config = defaultConfig;
let specials = {
  eup: {
    ghostImage: 'png/E+P.png',
    size: 10,
    chars: 'E+P',
    randomChars: false,
    parallax: false
  },
  holodeck: {
    filterOpacity: 31,
    maxLines: 40,
    chars: 'HOLODECK',
    randomChars: false,
    ghostText: 'HOLODECK',
    ghostSize: 0.5,
    ghostColor: '0 1 0',
    maxLineSpeed: 5,
    size: 10,
    parallax: false,
    eraseRate: 50
  },
  holoeup: {
    filterOpacity: 20,
    screens: 4,
    size: 4,
    speed: 20,
    chars: 'EUP',
    parallax: false,
    edgeBlur: 0,
    maxLines: 40,
    overwrite: true,
    ghostImage: 'png/E+P.png'
  },
  mfc: {
    centerText: 'MARC FRIEDRICH CLEMENS',
    centerFont: 'Consolas',
    centerSize: 0.8,
    chars: 'MFC',
    randomChars: false,
    maxLineSpeed: 2,
    ghostImage: 'MFC',
    parallax: false,
    size: 4,
    maxLines: 100
  },
  mosaic: {
    chars: '▮ ',
    parallax: false,
    size: 8
  },
  time: {
    size: 20,
    chars: '0123456789',
    parallax :  false,
    maxLines :  10,
    ghostColor: '0 1 0',
    minLineSpeed: 10,
    maxLineSpeed: 10,
    fgColor: '0 0 0',
    stColor: '0 0 0',
    ghostFont: 'Consolas',
    ghostSize: 0.8
  }
};
