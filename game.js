let grid = [
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0],
[1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
[1,1,0,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,1],
[1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,3,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

var board = new Board(grid)
var agent = new Agent(0, 0, board)

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function generateRandomMap(grid, agent){
  let flagFound = 0;
  for (var i = 19; i >= 0; i--) {
    for (var j = 19; j >= 0; j--) {
      let wallRandom = getRandomIntInclusive(0,3)
      let flagRandom = getRandomIntInclusive(0,100)
      if (wallRandom == 0) {
        grid[i][j] = 0
      }
      else{
        grid[i][j] = 1;
      }
      if (flagRandom == 2 && flagFound == 0) {
        flagFound = 1;
        grid[i][j] = 3;
        flagX = i
        flagY = j

      }
    }
  }

  if(flagFound == 0){
    grid[19][19] = 3;
    flagX = 19
    flagY = 19
  }
  grid[agent.x][agent.y] = 2;

  board.updateBoard();
  return {flagX, flagY}
}




let flagX;
let flagY;
let flagPosition = generateRandomMap(grid, agent)
function restart(){
  flagPosition = generateRandomMap(grid, agent)
}

async function play(){
  var graph = new Graph(grid);
  var start = graph.grid[agent.x][agent.y];

  var end = graph.grid[flagPosition.flagX][flagPosition.flagY];

  const timer = ms => new Promise(res => setTimeout(res, ms))

  var result = astar.search(graph, start, end);
  console.log(result)
  for(let i = 0; i < result.length; i++){
    console.log(result[i].x - agent.x, result[i].y - agent.y)
    agent.move(result[i].x - agent.x, result[i].y - agent.y)
    await timer(69);
  }
}

function toggleWall(){
  if(grid[12][9] == 0){
      grid[12][9] = 1
  }
  else{
    grid[12][9] = 0
  }
  board.updateBoard(grid)

}

function react(nomTouche){
  if (nomTouche === 'z' || nomTouche === 'ArrowUp') {
      agent.move(-1,0)
  }

  if (nomTouche === 's' || nomTouche === 'ArrowDown') {
      agent.move(1, 0)
  }

  if (nomTouche === 'q' || nomTouche === 'ArrowLeft') {
    agent.move(0,-1)
  }

  if (nomTouche === 'd' || nomTouche === 'ArrowRight') {
    agent.move(0,1)
  }

  if (nomTouche === 'p'){
    play()
  }
  if (nomTouche === 'r'){
    restart()
  }

  if (nomTouche === 'w'){
    toggleWall()
  }
}

document.addEventListener('keydown', (event) => {
  const nomTouche = event.key;
  react(nomTouche)
})
