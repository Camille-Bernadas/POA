class Board {

	constructor(grid) {
	  this.x = 20
	  this.y = 20
	  this.grid = grid
 	  this.updateBoard(this.grid, this.x, this.y)
	}

	updateBoard() {
	  var canvas = document.getElementById('game');
	  if (canvas.getContext) {
	    var ctx = canvas.getContext('2d');
	    ctx.clearRect(0, 0, 721, 721);

	    for (var i = 0; i < this.x; i++) {
	      for (var j = 0; j < this.y; j++) {
		      switch (this.grid[i][j]){
			case 0:
				ctx.fillStyle = "black";
				break;
			case 1:
				ctx.fillStyle = "#FFFFFC"; 
				break;
			case 2:
				ctx.fillStyle = "red";      
				break;
			case 3:
				ctx.fillStyle = "yellow";      
				break;
		      }
	          ctx.fillRect(36*j+1, 36*i+1, 35, 35);
	      }
	    }
	  }
	}

}
