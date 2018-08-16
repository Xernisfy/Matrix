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
  ghostColor: '1 0 0',
  ghostSize: 1,
  changeFreq: 100,
  size: 30,
  edgeBlur: 160,
  charBlur: 0,
  showFps: false,
  parallax: true,
  maxLines: 30,
  maxLineSpeed: 10,
  minLineLength: 1,
  maxLineLength: 1,
  speed: 20,
  special: false
};
let config = defaultConfig;
let specials = {
  mfc: {
    centerText: 'Marc Friedrich Clemens'
  },
  holodeck: {
    filterOpacity: '1f',
    maxLines: 50,
    chars: 'HOLODECK',
    randomChars: false,
    ghostText: 'HOLODECK',
    ghostSize: 0.5,
    ghostColor: '0 1 0',
    speed: 60,
    maxLineSpeed: 4,
    size:10
  }
}
