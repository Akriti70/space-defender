
class Game {
  constructor(canvas) {
    console.log("Game instance created");

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;

    this.player = new Player(canvas);
    this.enemies = [];
    this.lasers = [];
    this.explosions = [];

    this.enemySpawnInterval = 120;  
    this.enemySpawnTimer = 0;

    this.setupControls();
  }

  setupControls() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.player.movingLeft = true;
      if (e.key === "ArrowRight") this.player.movingRight = true;
      if (e.code === "Space") {
        // Shoot laser
        const laserX = this.player.x + this.player.width / 2 - 2;
        const laserY = this.player.y;
        this.lasers.push(new Laser(laserX, laserY));
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") this.player.movingLeft = false;
      if (e.key === "ArrowRight") this.player.movingRight = false;
    });
  }

  gameLoop = () => {
    if (this.isGameOver) return;

    // Clear canvas once at start of frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Spawn enemies periodically
    this.enemySpawnTimer++;
    if (this.enemySpawnTimer >= this.enemySpawnInterval) {
      this.enemies.push(new Enemy(this.canvas));
      this.enemySpawnTimer = 0;


    }

    // Update player and draw
    this.player.update();
    this.player.draw(this.ctx);

    // Update enemies and draw
    this.enemies.forEach(enemy => enemy.update());
    this.enemies.forEach(enemy => enemy.draw(this.ctx));

    // Update lasers and draw
    this.lasers.forEach(laser => laser.update());
    this.lasers.forEach(laser => laser.draw(this.ctx));

    // Update explosions and draw
    this.explosions.forEach(explosion => {
      explosion.update();
      explosion.draw(this.ctx);
    });
    // Remove finished explosions
    this.explosions = this.explosions.filter(explosion => !explosion.isFinished());

   
    for (let li = this.lasers.length - 1; li >= 0; li--) {
      let laser = this.lasers[li];
      for (let ei = this.enemies.length - 1; ei >= 0; ei--) {
        let enemy = this.enemies[ei];
        if (
          laser.x < enemy.x + enemy.width &&
          laser.x + laser.width > enemy.x &&
          laser.y < enemy.y + enemy.height &&
          laser.y + laser.height > enemy.y
        ) {
          // Explosion effect on enemy hit
          this.explosions.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
          explosionSound.play();
          this.enemies.splice(ei, 1);
          this.lasers.splice(li, 1);
          this.score += 10;
          break;
        }
      }
    }

 
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      let enemy = this.enemies[i];
      if (
        this.player.x < enemy.x + enemy.width &&
        this.player.x + this.player.width > enemy.x &&
        this.player.y < enemy.y + enemy.height &&
        this.player.y + this.player.height > enemy.y
      ) {
        this.lives--;
        this.explosions.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
        this.enemies.splice(i, 1);

        if (this.lives <= 0) {
          this.isGameOver = true;
          this.showEndMessage("You Lose!", "red");
          return;
        }
      }
    }

    // Remove off-screen lasers and enemies
    this.lasers = this.lasers.filter(laser => laser.y + laser.height >= 0);
    this.enemies = this.enemies.filter(enemy => enemy.y <= this.canvas.height);

    // Draw score and lives on top
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 100, 30);

    // Win condition
    if (this.score >= 100) {
      this.isGameOver = true;
      this.showEndMessage("You Win!", "lime");
      return;
    }

    // Request next animation frame
    requestAnimationFrame(this.gameLoop);
  };

  showEndMessage(text, color) {
    const overlay = document.getElementById("end-message-overlay");
    const statusEl = document.getElementById("status-message");

    statusEl.textContent = text;
    statusEl.style.color = color;
    overlay.style.display = "flex";

    setTimeout(() => {
      overlay.style.display = "none";
      this.resetGame();
      showStartScreen();
    }, 3000);
  }

  resetGame() {
    this.isGameOver = false;
    this.score = 0;
    this.lives = 3;
    this.enemies = [];
    this.lasers = [];
    this.explosions = [];
  }

  start() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.resetGame();
    document.getElementById("end-message-overlay").style.display = "none";
    showGameScreen();
    this.gameLoop();
  }
}
const explosionSound = new Audio("assets/sounds/609588__unfa__firecracker-explosion.flac");

