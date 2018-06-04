class Character {
  constructor(x, y, line) {
    this.x = x;
    this.y = y;
    this.line = line;
    this.symbol = this.setRandomSymbol();
    this.color = config.stColor;
    setTimeout(this.change, random(0, 10000));
    this.speed = random(100, 200);
  }
  set color(color) {
    this.color = color;
  }
  draw() {
    c.fillStyle = this.color;
    c.font = config.size + ' ' + config.font;
    c.shadowColor = this.color;
    c.shadowBlur = config.charBlur;
    c.fillText(this.symbol, this.x, this.y);
  }
  setRandomSymbol() {
    this.symbol = String.fromCharCode(0x30A0 + random(0, 96));
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
