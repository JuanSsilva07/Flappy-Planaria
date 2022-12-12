document.addEventListener("DOMContentLoaded", () => {
  const planaria = document.querySelector(".planaria");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  let planariaLeft = 220;
  let planariaBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;

  function startGame() {
    planariaBottom -= gravity;
    planaria.style.bottom = planariaBottom + "px";
    planaria.style.left = planariaLeft + "px";
  }
  let gameTimerId = setInterval(startGame, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (planariaBottom < 500) {
      planariaBottom += 50;
    }
    planaria.style.bottom = planariaBottom + "px";
  }

  document.addEventListener("keyup", control);

  function generationObstacles() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      topObstacle.classList.add("topObstacle");
      obstacle.classList.add("obstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacle === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          planariaLeft === 220 &&
          (planariaBottom < obstacleBottom + 151 || planariaBottom > obstacleBottom + gap - 200)) ||
        planariaBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generationObstacles, 3000);
  }
  generationObstacles();

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("Game Over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }
});
