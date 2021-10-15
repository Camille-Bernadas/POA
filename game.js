let grid = [
[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1],
[0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,5,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,4,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0],
]

var board = new Board(grid)
var agent = new Agent(4, 8, board)

function react(nomTouche){
  if (nomTouche === 'z' || nomTouche === 'ArrowUp') {
    agent.move(-1,0)
  }
  
  if (nomTouche === 's' || nomTouche === 'ArrowDown') {
    agent.move(1,0)
  }
  
  if (nomTouche === 'q' || nomTouche === 'ArrowLeft') {
    agent.move(0,-1)
  }
  
  if (nomTouche === 'd' || nomTouche === 'ArrowRight') {
    agent.move(0, 1)
  }
}

document.addEventListener('keydown', (event) => {
  console.log("clic")
  const nomTouche = event.key;
  react(nomTouche)
})
