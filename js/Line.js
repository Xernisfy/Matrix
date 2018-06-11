class Line {
  constructor(c, speed, length) {
    this.c = c;
    this.x = Math.floor(random(0, this.c.canvas.width - config.size) / config.size) * config.size;
    this.y = 0;
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
    console.log(this.count + ' - ' + this.speed)
    this.y += config.size;
    if ((this.y - (this.characters.length * config.size)) < this.c.canvas.height) {
      this.characters.push(new Character(this.x, this.y, this));
    } else {
      lines.shift();
      lines.push(new Line(this.c, 5, 20));
    }
    if (this.characters.length > this.length) {
      this.characters.shift();
    }
    //this.characters[0].fadeOut();
  }
}

