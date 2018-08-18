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
  centerColor: '0 0.75 0',
  centerSize: 1,
  ghostText: '',
  ghostFont: 'sans-serif',
  ghostColor: '0 1 0',
  ghostSize: 1,
  changeFreq: 100,
  size: 30,
  edgeBlur: 160,
  charBlur: 0,
  showFps: false,
  parallax: true,
  minLines: 10,
  maxLines: 30,
  spawnRate: 50,
  maxLineSpeed: 10,
  speed: 20,
  special: false
};
let config = defaultConfig;
let specials = {
  mfc: {
    centerText: 'Marc Friedrich Clemens'
  },
  holodeck: {
    filterOpacity: 31,
    maxLines: 80,
    chars: 'HOLODECK',
    randomChars: false,
    ghostText: 'HOLODECK',
    ghostSize: 0.5,
    ghostColor: '0 1 0',
    speed: 30,
    maxLineSpeed: 5,
    size: 10,
    parallax: false
  }
};
