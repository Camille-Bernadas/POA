const TILE_TYPE = {
	EMPTY: 0,
	WALL: 1,
	PLAYER: 2,
	BUTTON_ON: 3,
	BUTTON_OFF: 4,
	BOX: 5,
	DOOR: 6
}

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
		  	
		  	switch(grid[i][j]){
		  	
		  		case TILE_TYPE.EMPTY:
		  			ctx.fillStyle = "#FFFFFC";
			  		break;
			  		
		  		case TILE_TYPE.WALL:
		  			ctx.fillStyle = "#964B00";
			  		break;
			  		
			  	case TILE_TYPE.PLAYER:
		  			ctx.fillStyle = "red";
			  		break;
		  		
				case TILE_TYPE.DOOR:
					ctx.fillStyle = "black";
					break;
		  			
		  		case TILE_TYPE.BUTTON_ON:
		  			ctx.fillStyle = "purple";
		  			break;
		  			
		  		case TILE_TYPE.BUTTON_OFF:
		  			ctx.fillStyle = "blue";
		  			break;
		  			
		  		case TILE_TYPE.BOX:
		  			ctx.fillStyle = "#B67B40";
		  			break;

		  		default:
		  			ctx.fillStyle = "#00FF00";
		  			break;
		  	} 
		  	 ctx.fillRect(25*j+1, 25*i+1, 24, 24);
		  }
		}
	  }
	}

}
