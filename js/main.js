// Screen toggle functions
function showStartScreen() {
  document.getElementById("start-screen").classList.add("active-screen");
  document.getElementById("game-screen").classList.remove("active-screen");
}

function showGameScreen() {
  document.getElementById("start-screen").classList.remove("active-screen");
  document.getElementById("game-screen").classList.add("active-screen");
}

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");

 
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas);

  // Start button event: start game AND switch screen
  document.getElementById("start-button").addEventListener("click", () => {
    showGameScreen();  
    game.start();
  });

  // Show start screen initially
  showStartScreen();
});









