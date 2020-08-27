var snakeY = 1;
var snakeX = 1;
var snakeTail = [];
var speedX = 1;
var speedY = 0;
var snakeLength = 2;
var fruit = { x: 5, y: 7 };
//Talks to the HTML
var grid = document.getElementById("grid");
function snakePosition(snakeSegmentX, snakeSegmentY) {
  var activeSnakeSegment = document.createElement("div");
  activeSnakeSegment.className = "snake";
  activeSnakeSegment.setAttribute(
    "style",
    `grid-row: ${snakeSegmentY}; grid-column: ${snakeSegmentX}`
  );
  grid.appendChild(activeSnakeSegment);
}

//reDraws snake on a set time interval
//note for Leo "Runs the damn game"
var refreshIntervalId;
function startStartGame() {
  stopGame();
  startGame();
}
function startGame() {
  refreshIntervalId = setInterval(function () {
    grid.innerHTML = "";

    //This is calling our fruit
    fruitGenerator(fruit);

    snakeX = snakeX + speedX;
    snakeY = snakeY + speedY;

    if (snakeX == fruit.x && snakeY == fruit.y) {
      snakeLength++;
      fruit.x = Math.floor(Math.random() * 25) + 1;
      fruit.y = Math.floor(Math.random() * 25) + 1;
    }

    //border control
    if (snakeX > 25) {
      snakeX = 0;
    }

    if (snakeX < 0) {
      snakeX = 25;
    }

    if (snakeY > 25) {
      snakeY = 0;
    }

    if (snakeY < 0) {
      snakeY = 25;
    }

    snakeTail.forEach((element) => {
      snakePosition(element.x, element.y);
    });
    //part of stop function
    for (var i = 1, lend = snakeTail.length; i < lend; i++) {
      console.log("test3");
      endOfGame(snakeTail[i]);
    }

    snakeTail.push({ x: snakeX, y: snakeY });
    console.log(snakeTail);

    if (snakeTail.length > snakeLength) {
      snakeTail.shift();
    }
  }, 150);
}
//Part of stop function
function endOfGame(boof) {
  console.log("END");
  if (boof.x == snakeX && boof.y == snakeY) {
    stopGame();
  }
}

//End Game
function stopGame() {
  clearInterval(refreshIntervalId);
}
//Controls for la SNAKE

document.addEventListener("keydown", function (event) {
  if (event.code == "KeyW") {
    speedX = 0;
    speedY = -1;
  }

  if (event.code == "KeyA") {
    speedX = -1;
    speedY = 0;
  }

  if (event.code == "KeyD") {
    speedX = 1;
    speedY = 0;
  }

  if (event.code == "KeyS") {
    speedX = 0;
    speedY = 1;
  }
});

//Fruit
function fruitGenerator(fruit) {
  var activeFruit = document.createElement("div");
  activeFruit.className = "fruit";
  activeFruit.setAttribute(
    "style",
    `grid-row: ${fruit.y}; grid-column: ${fruit.x}`
  );
  grid.appendChild(activeFruit);
}
