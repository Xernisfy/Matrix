class Line {
  constructor(c) {
    this.c = c;
    this.x = Math.floor(random(0, this.c.canvas.width));
    this.y = 0;
    this.delete = false;
    this.speed = random(1, config.maxLineSpeed);
    this.length = random(config.minLineLength, config.maxLineLength);
    this.symbolIndex = random(0, 255);
    this.characters = [];
    this.characters.push(new Character(this.x, this.y, this));
  }
  relativeSize() { // determine relative size to speed when parallax is active
    if (config.parallax) {
      return config.size * (this.speed / config.maxLineSpeed);
    } else {
      return config.size;
    }
  }
  draw(g) { // draw character on canvas
    this.c.save();
    this.characters.forEach((character) => {
      character.setColor(mapColor(config.fgColor));
      character.draw(g);
    });
    this.c.restore();
    this.y += this.relativeSize();
    if (this.y < this.c.canvas.height + config.size) {
      this.symbolIndex++;
      this.characters.push(new Character(this.x, this.y, this));
    } else if (this.y > 0) {
      this.removeFirst();
      if (this.characters.length === 0) {
        this.delete = true;
      }
    }
    if (this.characters.length > this.length) {
      this.removeFirst();
    }
  }
  removeFirst() {
    const first = this.characters[0];
    if (first === undefined) {
      console.log(this);
    }
    this.characters.shift();
  }
}
