class Line {
  constructor(c, x, speed, length) {
    this.c = c;
    this.x = x;
    this.y = 0;
    this.speed = speed;
    this.length = length;
    this.characters = ((line) => {
      let tmp = [];
      for (let i = 0; i < line.length; i++) {
        tmp.push(new Character(this.x, this.y, line));
      }
      return tmp;
    })(this);
  }
  draw() {
    this.characters.forEach((character) => {
      character.setColor(mapColor(config.fgColor));
      character.draw();
    });
    this.y += config.size;
    if (this.y < this.c.canvas.height) {
      this.characters.push(new Character(this.x, this.y, this));
    }
    if (this.characters.length > 0) {
      this.characters.shift();
    } else {
      new Line(this.c, 50, 5, 10);
    }
    //this.characters[0].fadeOut();
  }
}

