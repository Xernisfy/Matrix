class Line {
  constructor(speed, length) {
    this.speed = speed;
    this.length = 5;
    this.characters = ((line) => {
      let tmp = [];
      for (let i = 0; i < line.length; i++) {
        tmp.push(new Character(200, 200, line));
      }
    })(this);
  }
}

