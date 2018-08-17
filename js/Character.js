class Character {
  constructor(x, y, line) {
    this.x = x;
    this.y = y;
    this.line = line;
    this.c = line.c;
    this.symbol = this.setSymbol();
    this.color = mapColor(config.stColor);
    setTimeout(this.change, random(0, 10000));
    this.draw();
  }
  setColor(color) {
    this.color = color;
  }
  relativeSize() {
    if (config.parallax) {
      return config.size * (this.line.speed / config.maxLineSpeed);
    } else {
      return config.size;
    }
  }
  draw(g, v) {
    this.c.fillStyle = this.color;
    this.c.font = this.relativeSize() + 'px ' + config.font;
    if (config.charBlur > 0) {
      this.c.shadowColor = this.color + 'ff';
      this.c.shadowBlur = config.charBlur;
    }
    this.c.textAlign = 'center';
    this.c.fillText(this.symbol, this.x, this.y);
    this.c.shadowColor = '#00000000';
    if (g && config.ghostText) {
      let imgData = g.getImageData(this.x, this.y, 1, 1).data;
      if (imgData[3] !== 0) {
        v.fillStyle = mapColor(config.ghostColor);
        v.font = this.relativeSize() + 'px ' + config.font;
        v.textAlign = 'center';
        v.fillText(this.symbol, this.x, this.y);
      }
    }
  }
  setSymbol() {
    return decide({
      'latin': this.getSymbolByIndex(window.latin),
      'weird': this.getSymbolByIndex(window.weird),
      'braille': this.getSymbolByIndex(window.braille),
      'katakana': this.getSymbolByIndex(window.katakana)
    }, config.chars, this.getSymbolByIndex(config.chars.toString().split('')));
  }
  getSymbolByIndex(chars) {
    if (!config.randomChars) {
      return chars[this.line.symbolIndex % chars.length];
    } else {
      return chars[random(0, chars.length - 1)];
    }
  }
  fadeOut() {
    let hexCode = '#';
    for (let i = 1; i < 6; i += 2) {
      let tmp = parseInt(this.color.substr(i, 2), 16);
      hexCode += tmp > 0 ? fixLen((tmp - 1).toString(16), 2) : '00';
    }
    if (hexCode === '#000000') {
      this.list.remove(this);
    } else {
      this.color = hexCode;
    }
  }
}
