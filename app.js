document.addEventListener("DOMContentLoaded", () => {
  const planaria = document.querySelector(".planaria");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  let planariaLeft = 220;
  let planariaBottom = 100;
  let gravity = 2;

  function startGame() {
    planariaBottom -= gravity;
    planaria.style.bottom = planariaBottom + "px";
    planaria.style.left = planariaLeft + "px";
  }
  let timerId = setInterval(startGame, 20);

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
    let obstacleBottom = 150;
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    gameDisplay.appendChild(obstacle);
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
  }
  generationObstacles();
});
