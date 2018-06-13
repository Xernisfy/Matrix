class Character {
  constructor(x, y, line, symbol) {
    this.x = x;
    this.y = y;
    this.line = line;
    this.c = line.c;
    this.symbol = symbol || this.setRandomSymbol();
    this.color = mapColor(config.stColor);
    setTimeout(this.change, random(0, 10000));
    this.speed = random(100, 200);
    this.draw();
  }
  setColor(color) {
    this.color = color;
  }
  draw() {
    this.c.fillStyle = this.color;
    this.c.font = config.size + 'px ' + config.font;
    //this.c.shadowColor = this.color;
    //this.c.shadowBlur = config.charBlur;
    this.c.fillText(this.symbol, this.x, this.y);
  }
  setRandomSymbol() {
    //return String.fromCharCode(0x30A0 + random(0, 95)); // Katakana
    return String.fromCharCode(0x0041 + random(0, 25)); // Latin
    //return String.fromCharCode(0x2800 + random(0, 255)); // Braille
    //return String.fromCharCode(0x16A0 + random(0, 80)); // ???
  }
  change() {

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
