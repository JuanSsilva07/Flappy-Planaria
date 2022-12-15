document.addEventListener("DOMContentLoaded", () => {
  const planaria = document.querySelector(".planaria");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  let planariaLeft = 220;
  let planariaBottom = 250;
  let gravity = 3;
  let isGameOver = false;
  let gap = 430;
  let timerVelocity = 1;

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
    let obstacleLeft = 1250;
    let randomHeight = Math.random() * 80;
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
        (obstacleLeft > 140 &&
          obstacleLeft < 220 &&
          planariaLeft === 220 &&
          (planariaBottom < obstacleBottom + 200 ||
            planariaBottom > obstacleBottom + gap - 108)) ||
        planariaBottom === 80
      ) {
        gameOver();
        clearInterval(timerId);
        showAlert();
      }
    }

    let timerId = setInterval(moveObstacle, timerVelocity);

    if (!isGameOver) setTimeout(generationObstacles, 2000);
  }
  generationObstacles();

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("Game Over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }

  function restartPress() {
    window.location.reload();
  }

  function showAlert() {
    var result = confirm(
      "Você perdeu, mas pode tentar novamente! :) Pressione OK para recomeçar"
    );
    if (result) {
      restartPress();
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "R" || event.key === "r") {
      window.location.reload();
    }
  });
});
