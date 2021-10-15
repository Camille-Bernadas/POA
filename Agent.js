class Agent {

    constructor(x, y, board) {
        this.x = x
        this.y = y
        this.board = board
        this.move(0,0)
    }

    move(x, y){   
    
      if(this.x+x >= 0 && this.y + y >= 0 && this.x+x < board.x && this.y+y < board.y){
		  if(this.board.grid[this.x+x][this.y+y] == TILE_TYPE.EMPTY ){
		  	
		  	this.board.grid[this.x][this.y] = TILE_TYPE.EMPTY
		  	
			this.x += x
		    this.y += y
			
			this.board.grid[this.x][this.y] = TILE_TYPE.PLAYER
			
			this.board.updateBoard(this.board.grid)
		  	console.log(this.x + "," + this.y)
		  
		  }
		  else if(this.board.grid[this.x+x][this.y+y] == TILE_TYPE.BOX && this.board.grid[this.x+x+x][this.y+y+y] == TILE_TYPE.EMPTY){
		  	this.board.grid[this.x][this.y] = TILE_TYPE.EMPTY
		  	
			this.x += x
		    this.y += y
			
			this.board.grid[this.x][this.y] = TILE_TYPE.PLAYER
			this.board.grid[this.x+x][this.y+y] = TILE_TYPE.BOX
			
			this.board.updateBoard(this.board.grid)
		  	console.log(this.x + "," + this.y)
		  
		  }
	  }
	}
}
