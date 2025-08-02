
  class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 20;
    this.finished = false;
  }

  update() {
    this.radius += 2;
    if (this.radius >= this.maxRadius) {
      this.finished = true;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 165, 0, ${1 - this.radius / this.maxRadius})`;
    ctx.fill();
    ctx.closePath();
  }

  isFinished() {
    return this.finished;
  }
}

