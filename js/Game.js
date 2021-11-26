let gridSize;
let title = document.getElementById("textTitle");
let form = document.getElementById("form");
let boardDiv = document.getElementById("board");
let gameHasStarted = false;
var board
var agent
let grid

let flagPosition = {flagX: null, flagY: null};

let countGoal = 0;
let countAgent = 0;
let countWall = 0;
let countButton = 0;

let buttonsWalls = new Array();

let lastButton = new Array();

let drag = false;
document.addEventListener('mouseup', () => {
  drag = false
});

const timer = ms => new Promise(res => setTimeout(res, ms))

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function incorrectInput() {
    gridSizeInput.style.animation = "0.1s ease-out 0s 3 blink"
    gridSizeInput.style.border = "4px solid #FB311D";
    gridSizeInput.style.boxShadow = "none";
}

function isCorrectInput() {
  if (gridSize === "" || isNaN(gridSize) || gridSize > 30) {
    return false
  } return true
}

function start() {
  form.style.display = "none";
  title.style.display = "none";
  boardDiv.style.display = "flex";
  boardDiv.style.display = "grid";
}


function startWithRandomMap() {
  gridSize = gridSizeInput.value;
  if (isCorrectInput()) {
    board = new Board(gridSize)
    let agentX = getRandomIntInclusive(0, gridSize-1)
    let agentY = getRandomIntInclusive(0, gridSize-1)
    agent = new Agent(agentX, agentY, board)
    grid = board.grid;
    generateRandomMap(grid, agent)
    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      react(nomTouche)
    })
    start();
    document.getElementById("goMenu").style.display = "flex";
  } else {
    incorrectInput()
  }
}

var ct = function clickTile(e) {
  drag = false;
  var x = e.clientX, y = e.clientY,
  elementMouseIsOver = document.elementFromPoint(x, y);
  fillTile(elementMouseIsOver)
}

var mt = function mousedownTile() {
  drag = true;
}

var dt = function dragTile(e) {
  if (drag) {
    var x = e.clientX, y = e.clientY,
    elementMouseIsOver = document.elementFromPoint(x, y);
    fillTile(elementMouseIsOver)
  }
}

var lw = function linkWall(e) {

  //desactivateDragsandClicks();
  let tiles = document.getElementsByClassName("tile");
  let arry = Array.from(tiles)

  console.log("e", e.target)
  console.log("lastButton", lastButton)

  if (e.target.classList.contains("wall")) {
    console.log("J'ai appuyé sur un mur");
    let i = Math.floor(arry.indexOf(e.target)/gridSize)
    let j = arry.indexOf(e.target)%gridSize
    console.log(i, j)
    let buttonWall = {wall: {i, j}, button:lastButton};
    buttonsWalls.push(buttonWall);
    alert("Le mur a été lié")
    document.removeEventListener("click", lw, true);
    setTimeout(() => {  activateDragsandClicks(); }, 200);
  } else {
    alert("Vous devez lier avec un mur");
  }

}

function activateDragsandClicks() {
  boardDiv = document.getElementById("board");
  boardDiv.addEventListener("mousemove", dt, true);
  boardDiv.addEventListener("click", ct, true);
  boardDiv.addEventListener("mousedown", mt, true);
}

function desactivateDragsandClicks() {
  boardDiv = document.getElementById("board");
  console.log(boardDiv);
  console.log(boardDiv.removeEventListener("mousemove", dt, true));
  console.log(boardDiv.removeEventListener("click", ct, true));
  console.log(boardDiv.removeEventListener("mousedown", mt, true));
}

function customMap() {
  let gridSizeInput = document.getElementById("gridSizeInput");
  gridSize = gridSizeInput.value;
  if (isCorrectInput()) {
    document.getElementById("goMenu").style.display = "flex";
    boardDiv.style.paddingLeft = "100px"
    let elements = document.getElementById("affichage");
    elements.style.display = 'flex';
    board = new Board(gridSize)
    grid = board.grid;
    start();
    activateDragsandClicks();
  } else {
    incorrectInput()
  }
}

function fillTile(e) {
  let eventType = e.type
  var tile;
  if(eventType === "mousemove") {
    var x = event.clientX, y = event.clientY
    let element = document.elementFromPoint(x, y)
    if (element !== undefined) {
      if(element.classList.contains("tile")) {
        tile = element;
      }
    }
  } else {
    tile = e
  }
  let wallInput = document.getElementById("wallInput")
  let boxInput = document.getElementById("boxInput")
  let buttonInput = document.getElementById("buttonInput")
  let agentInput = document.getElementById("agentInput")
  let goalInput = document.getElementById("goalInput")
  let removeInput = document.getElementById("removeInput")

  let tiles = document.getElementsByClassName("tile");
  let arry = Array.from(tiles)
  let i = Math.floor(arry.indexOf(tile)/gridSize)
  let j = arry.indexOf(tile)%gridSize

  if(tile !== undefined) {
    if(wallInput.checked) {
      countWall++;
      grid[i][j] = WALL
      tile.classList = "tile wall"
    } else if (boxInput.checked) {
      grid[i][j] = BOX
      tile.classList = "tile box"
    } else if (buttonInput.checked) {
      if(countWall <= countButton) {
        alert("Vous devez placer un mur avant")
        drag = false;
      } else {
        console.log(boardDiv)
        desactivateDragsandClicks();
        countButton++;
        grid[i][j] = BUTTON_OFF
        tile.classList = "tile button-off"
        lastButton = {i, j}
        console.log(lastButton)
        alert("Choisissez un mur à lier")
        document.addEventListener("click", lw, true);
      }
    } else if (agentInput.checked) {
      if(countAgent === 0) {
        grid[i][j] = PLAYER
        tile.classList = "tile agent"
        countAgent++;
      } else {
        alert("Vous ne pouvez placer qu'un seul agent")
        drag = false;
      }
    } else if (goalInput.checked) {
      if(countGoal === 0) {
        grid[i][j] = GOAL
        tile.classList = "tile goal";
        countGoal++;
      } else {
        alert("Vous ne pouvez placer qu'une seule arrivée")
        drag = false;
      }
    } else if (removeInput.checked) {
      if(grid[i][j] === PLAYER) {
        countAgent = 0;
      }
      if(grid[i][j] === GOAL) {
        countGoal = 0;
      }
      if(grid[i][j] === WALL) {
        countWall--;
      }
      if(grid[i][j] === BUTTON_OFF) {
        countButton--;
      }
      grid[i][j] = EMPTY
      tile.classList = "tile";
    }
  }
}

function startCustomedMap() {
  let playerX, playerY, goalX, goalY
  for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
      if(grid[i][j] === PLAYER) {
        playerX = i;
        playerY = j;
      } else if(grid[i][j] === GOAL) {
        goalX = i;
        goalY = j;
      }
    }
  }
  if(playerX === undefined) {
    alert("Vous devez placer un agent !")
  }
  else if(goalX === undefined) {
    alert("Vous devez placer une arrivée !")
  } else {
    desactivateDragsandClicks();
    agent = new Agent(playerX, playerY, board)
    flagPosition.flagX = goalX;
    flagPosition.flagY = goalY;
    let affichage = document.getElementById("affichage");
    affichage.style.display = "none"

    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      react(nomTouche)
    })
  }
}

function generateRandomMap(grid, agent){
  let flagFound = 0;
  for (var i = gridSize-1; i >= 0; i--) {
    for (var j = gridSize-1; j >= 0; j--) {
      let wallRandom = getRandomIntInclusive(0,3)
      let flagRandom = getRandomIntInclusive(0,100)
      let boxRandom = getRandomIntInclusive(0,100)
      if (wallRandom == 0) {
        grid[i][j] = WALL
      }
      else{
        if(boxRandom == 0){
          grid[i][j] = BOX;
        }
        else{
          grid[i][j] = EMPTY;
        }
      }
      if (flagRandom == 2 && flagFound == 0) {
        flagFound = 1;
        grid[i][j] = 3;
        flagPosition.flagX = i
        flagPosition.flagY = j

      }
    }
  }

  if(flagFound == 0){
    grid[gridSize-1][gridSize-1] = GOAL;
    flagPosition.flagX = gridSize-1
    flagPosition.flagY = gridSize-1
  }
  grid[agent.x][agent.y] = PLAYER;

  board.updateBoard();
  return flagPosition
}


function restart(){
  flagPosition = generateRandomMap(grid, agent)
}

async function play(){
  var graph = new Graph(grid);
  var start = graph.grid[agent.x][agent.y];

  var end = graph.grid[flagPosition.flagX][flagPosition.flagY];

  var result = astar.search(graph, start, end);
  for(let i = 0; i < result.length; i++){
    agent.move(result[i].x - agent.x, result[i].y - agent.y)
    await timer(69);
  }
}

function getWallCoords(buttonCoords){
  
  for(let i = 0; i < buttonsWalls.length; i++ ) {
    if (buttonsWalls[i].button.i == buttonCoords.i &&
      buttonsWalls[i].button.j == buttonCoords.j) {
      return buttonsWalls[i].wall
    }
  }
  //board.updateBoard(grid);
}

function react(nomTouche){
  if (nomTouche === 'z' || nomTouche === 'ArrowUp') {
      agent.move(-1,0);
  }

  if (nomTouche === 's' || nomTouche === 'ArrowDown') {
      agent.move(1, 0);
  }

  if (nomTouche === 'q' || nomTouche === 'ArrowLeft') {
    agent.move(0,-1);
  }

  if (nomTouche === 'd' || nomTouche === 'ArrowRight') {
    agent.move(0,1);
  }

  if (nomTouche === 'p'){
    BDI.deliberate();
  }
  if (nomTouche === 'r'){
    restart()
  }

  if (nomTouche === ' ') {
    agent.interact();
  }
}
