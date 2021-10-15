function setGround(grid, x, y) {
  var canvas = document.getElementById('game');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 501, 501);

    for (var i = 0; i < x; i++) {
      for (var j = 0; j < y; j++) {
        if(grid[i][j] == 0){
          ctx.fillStyle = "#FFFFFC";
          ctx.fillRect(25*j+1, 25*i+1, 24, 24);
        }
        if(grid[i][j] == 1){
          ctx.fillStyle = "#964B00";
          ctx.fillRect(25*j+1, 25*i+1, 24, 24);
        }
        if(grid[i][j] == 2){
          ctx.fillStyle = "red";
          ctx.fillRect(25*j+1, 25*i+1, 24, 24);
        }
        
      }
    }
  }
}

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
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

let player = [4,8];
move(0,0)
setGround(grid, 20,20)

function move(x, y){
  grid[player[0]][player[1]] = 0
  if(grid[player[0]+x][player[1]+y] == 0){
    player[0] += x
    player[1] += y
  }
  grid[player[0]][player[1]] = 2
  setGround(grid, 20,20)
  console.log(player[0] + "," + player[0])
}

function react(nomTouche){
  if (nomTouche === 'z' || nomTouche === 'ArrowUp') {
    move(-1,0)
  }
  
  if (nomTouche === 's' || nomTouche === 'ArrowDown') {
    move(1,0)
  }
  
  if (nomTouche === 'q' || nomTouche === 'ArrowLeft') {
    move(0,-1)
  }
  
  if (nomTouche === 'd' || nomTouche === 'ArrowRight') {
    move(0, 1)
  }
}

document.addEventListener('keydown', (event) => {
  console.log("clic")
  const nomTouche = event.key;
  react(nomTouche)
})


