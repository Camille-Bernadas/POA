let grid = [
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0],
[1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1],
[1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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



function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var board = new Board(grid)
var agent = new Agent(0, 0, board)

var graph = new Graph(grid);
var start = graph.grid[0][0];
var end = graph.grid[10][10];
var result = astar.search(graph, start, end);


function play(){
  result = astar.search(graph, start, end);
  console.log(result)
  for(let i = 0; i < result.length; i++){
    agent.move(result[i].x - agent.x, result[i].y - agent.y)
    sleep(1000)
  }
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
}

document.addEventListener('keydown', (event) => {
  const nomTouche = event.key;
  react(nomTouche)
})
