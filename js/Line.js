class Line {
  constructor(c) {
    this.c = c;
    this.characters = [];
    this.create();
  }
  create() { // set default values; main use is the re-use of an old object as a new one
    this.speed = random(1, config.maxLineSpeed);
    this.size = this.relativeSize();
    this.x = random(1, Math.floor(this.c.canvas.width / this.size)) * this.size + this.size / 2;
    this.y = 0;
    this.symbolIndex = random(0, 255);
    this.characters.length = 0;
    this.characters.push(new Character(this.x, this.y, this));
    this.delete = false;
    this.erase = false;//Boolean(random(0, 99) < 20);
  }
  relativeSize() { // determine relative size to speed when parallax is active
    if (config.parallax) {
      return config.size * (this.speed / config.maxLineSpeed);
    } else {
      return config.size;
    }
  }
  draw(g, d) { // draw character on canvas
    this.c.save();
    this.characters.forEach((character) => {
      character.setColor(mapColor(config.fgColor));
      character.draw(g, d);
    });
    this.c.restore();
    this.y += this.size;
    if (this.y < this.c.canvas.height + this.size) {
      this.symbolIndex++;
      if (this.characters.length > 1) {
        let swap = this.characters[0];
        this.characters[0] = this.characters[1];
        this.characters[1] = swap.create(this.x, this.y);
      } else {
        this.characters.push(new Character(this.x, this.y, this));
      }
    } else if (this.y > 0) {
      this.characters.shift();
      if (this.characters.length === 0) {
        this.delete = true;
      }
    }
  }
}
