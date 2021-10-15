class Board {

	constructor(grid) {
	  this.x = 20
	  this.y = 20
	  this.grid = grid
 	  this.updateBoard(this.grid, this.x, this.y)
	}

	updateBoard(grid) {
		console.log("x" + this.x)
		console.log("y" + this.y)
		console.log("grid" + grid)
	  var canvas = document.getElementById('game');
	  if (canvas.getContext) {
	    var ctx = canvas.getContext('2d');
	    ctx.clearRect(0, 0, 501, 501);

	    for (var i = 0; i < this.x; i++) {
	      for (var j = 0; j < this.y; j++) {
	        if(grid[i][j] == 0){
	          ctx.fillStyle = "#FFFFFC";
	          ctx.fillRect(25*j+1, 25*i+1, 24, 24);
	        }
	        if(grid[i][j] == 1){
	          ctx.fillStyle = "black";
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

}