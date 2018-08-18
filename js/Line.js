class Line {
  constructor(c) {
    this.c = c;
    this.delete = false;
    this.characters = [];
    this.create();
  }
  create() {
    this.x = Math.floor(random(0, this.c.canvas.width) / config.size) * config.size;
    this.y = 0;
    this.speed = random(1, config.maxLineSpeed);
    this.symbolIndex = random(0, 255);
    this.characters.length = 0;
    this.characters.push(new Character(this.x, this.y, this));
    this.erase = false;//Boolean(random(0, 99) < 20);
  }
  relativeSize() { // determine relative size to speed when parallax is active
    if (config.parallax) {
      return config.size * (this.speed / config.maxLineSpeed);
    } else {
      return config.size;
    }
  }
  draw(g, v) { // draw character on canvas
    this.c.save();
    this.characters.forEach((character) => {
      character.setColor(mapColor(config.fgColor));
      character.draw(g, v);
    });
    this.c.restore();
    this.y += this.relativeSize();
    if (this.y < this.c.canvas.height + config.size) {
      this.symbolIndex++;
      if (this.characters.length > 1) {
        let swap = this.characters[0];
        this.characters[0] = this.characters[1];
        this.characters[1] = swap.create(this.x, this.y);
      } else {
        this.characters.push(new Character(this.x, this.y, this));
      }
      //this.removeFirst();
    } else if (this.y > 0) {
      this.removeFirst();
      if (this.characters.length === 0) {
        this.delete = true;
      }
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
