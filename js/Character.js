'use strict';
class Character {
  constructor(x, y, line) {
    this.line = line;
    this.c = line.c;
    this.create(x, y);
  }
  create(x, y) {
    this.x = x;
    this.y = y;
    this.color = mapColor(config.stColor);
    this.symbol = this.setSymbol();
    this.draw();
    return this;
  }
  setColor(color) {
    this.color = color;
  }
  draw(g, d) {
    this.c.fillStyle = this.color;
    this.c.font = this.line.size + 'px ' + config.font;
    if (config.charBlur > 0) {
      this.c.shadowColor = this.color + 'ff';
      this.c.shadowBlur = config.charBlur;
    }
    this.c.textAlign = 'center';
    this.c.fillText(this.symbol, this.x, this.y);
    this.c.shadowColor = '#00000000';
    if (g && (config.ghostText || config.ghostImage || config.special === 'time')) {
      let imgData = g.getImageData(this.x, this.y - (this.line.size / 2), 1, 1).data;
      d.putImageData(d.createImageData(this.line.size, this.line.size), this.x - this.line.size / 2, this.y - this.line.size);
      if (imgData[3] !== 0 && !this.line.erase) {
        d.fillStyle = mapColor(config.ghostColor);
        d.font = this.line.size + 'px ' + config.font;
        d.textAlign = 'center';
        d.fillText(this.symbol, this.x, this.y);
      }
    }
  }
  setSymbol() {
    return decide({
      'latin': this.getSymbolByIndex(shared.latin),
      'futhark': this.getSymbolByIndex(shared.futhark),
      'braille': this.getSymbolByIndex(shared.braille),
      'katakana': this.getSymbolByIndex(shared.katakana)
    }, config.chars, this.getSymbolByIndex(config.chars.toString().split('')));
  }
  getSymbolByIndex(chars) {
    if (!config.randomChars) {
      return chars[this.line.symbolIndex % chars.length];
    } else {
      return chars[random(0, chars.length - 1)];
    }
  }
}
