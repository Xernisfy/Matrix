class Line {
  constructor(c, speed, length) {
    this.c = c;
    this.x = Math.floor(random(0, this.c.canvas.width - config.size) / config.size) * config.size;
    this.y = 0;
    this.delete = false;
    this.speed = speed;
    this.length = length;
    this.characters = [];
    this.characters.push(new Character(this.x, this.y, this));
  }
  draw() {
    this.c.save();
    this.characters.forEach((character) => {
      character.setColor(mapColor(config.fgColor));
      character.draw();
    });
    this.c.restore();
    this.y += config.size;
    if (this.y < this.c.canvas.height + config.size) {
      this.characters.push(new Character(this.x, this.y, this));
    } else if (this.y > 0) {
      this.removeFirst();
      if (this.characters.length === 0) {
        this.delete = true;
        if (lines.length < config.maxLines) {
          lines.push(new Line(this.c, 5, random(5, 20)));
        }
      }
    }
    if (this.characters.length > this.length) {
      this.removeFirst();
    }
    //this.characters[0].fadeOut();
  }
  removeFirst() {
    const first = this.characters[0];
    if (first.symbol === 'M' || first.symbol === 'F' || first.symbol === 'C') {
      solo.push(new Character(first.x, first.y, this, first.symbol));
    }
    this.characters.shift();
  }
}
