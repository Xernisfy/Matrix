class Line {
  constructor(c) {
    this.c = c;
    this.x = Math.floor(random(0, this.c.canvas.width - config.size) / config.size) * config.size;
    this.y = 0;
    this.delete = false;
    this.speed = random(1, config.maxLineSpeed);
    this.length = random(config.minLineLength, config.maxLineLength);
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
  draw() { // draw character on canvas
    this.c.save();
    this.characters.forEach((character) => {
      character.setColor(mapColor(config.fgColor));
      character.draw();
    });
    this.c.restore();
    this.y += this.relativeSize();
    if (this.y < this.c.canvas.height + config.size) {
      for (let i = 0; i < solo.length; i++) {
        if (solo[i].x === this.x && solo[i].y === this.y) {
          solo.splice(i, 1);
        }
      }
      this.characters.push(new Character(this.x, this.y, this));
    } else if (this.y > 0) {
      this.removeFirst();
      if (this.characters.length === 0) {
        this.delete = true;
        if (lines.length < config.maxLines) {
          lines.push(new Line(this.c));
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
    if (first === undefined) {
      console.log(this)
    }
    /*if (first.y === 300 && ((first.x === 4 * config.size && first.symbol === 'M') || (first.x === 8 * config.size && first.symbol === 'F') || (first.x === 12 * config.size && first.symbol === 'C'))) {
      solo.push(new Character(first.x, first.y, this, first.symbol));
    }*/
    this.characters.shift();
  }
}
