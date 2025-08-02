
 


 class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = 60;
    this.height = 80;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - this.height - 10;

    this.speed = 3;
    this.movingLeft = false;
    this.movingRight = false;
    this.image = new Image();
    this.image.src = "assets/images/spaceship.png"; 
    this.imageLoaded = false;
    this.image.onload = () => { this.imageLoaded = true; };
    
  }

  update() {
    if (this.movingLeft) {
      this.x -= this.speed;
      if (this.x < 0) this.x = 0;
    }
    if (this.movingRight) {
      this.x += this.speed;
      if (this.x + this.width > this.canvas.width) {
        this.x = this.canvas.width - this.width;
      }
    }
  }

  draw() {
    if (this.imageLoaded) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

