class Agent extends Element {

	constructor(x, y, board) {
		super(x, y);
		this.board = board
    //this.move(0,0)
	}

	initialiser(x) {
		super.initialiser(x, y, "img/agent.png");
	}

	move(x, y){
      this.board.grid[this.x][this.y] = EMPTY;
      let newX = this.x+x;
      let newY = this.y+y;

      //Out of bound
      if(newX < 0 || newX >= this.board.x || newY < 0 || newY >= this.board.y) {
        return;
      }

      //Movable
      if(this.board.grid[newX][newY] == EMPTY || this.board.grid[newX][newY] == GOAL) {
        this.x += x;
        this.y += y;
      }

      if(this.board.grid[newX][newY] == GOAL) {
        alert("YOU WON");
        location.reload();
        //restart();
      }

      //Box handling
      if(this.board.grid[newX][newY] == BOX) {
        if(this.board.grid[newX+x][newY+y] == EMPTY) {
          this.board.grid[newX][newY] = EMPTY;
          this.board.grid[newX+x][newY+y] = BOX;
        }
      }

      this.board.grid[this.x][this.y] = PLAYER;
      this.board.updateBoard(this.board.grid);
      return;
    }


		interact(){
      //Interactable
        let x = this.x;
        let y = this.y;
        let posInter = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]];

        for(let pos of posInter) {
            let i = pos[0];
            let j = pos[1];
            let wallCoords;
            let wallI;
            let wallJ;
            //Check all nearby interactable, we either do something that'll make the path shorter or that will make the goal available
						//First we activate all the buttons
            if (i >= 0 && i < this.board.x && j >= 0 && j < this.board.y) {
                switch(this.board.grid[i][j]) {
                    case BUTTON_OFF:
                        console.log(i, j)
                        this.board.grid[i][j] = BUTTON_ON;
                        wallCoords = getWallCoords({i: i, j: j});
                        wallI = wallCoords.i
                        wallJ = wallCoords.j
                        this.board.grid[wallI][wallJ] = EMPTY;
                        this.board.updateBoard(this.board.grid);

                        //TODO : Delete wall
                        break;
                    case BUTTON_ON:
                        console.log(i, j)
                        this.board.grid[i][j] = BUTTON_OFF;
                        wallCoords = getWallCoords({i: i, j: j});
                        wallI = wallCoords.i
                        wallJ = wallCoords.j
                        this.board.grid[wallI][wallJ] = WALL;
                        this.board.updateBoard(this.board.grid);
                        //TODO : Re-add wall
                        break;
                    case BOX:
                        //If I find a box, I'd like to move it out of the way so that it won't block my path to the goal
                        //But I can only look one space ahead unless I want the complexity to explode
                        //If we looked ahead it would mean a complexity of O(4^n) where n is how far we want to look, typically the width of the map
                        //TODO : Do this function anyway and see it fry your computer

                }
            }
        }
        return;
    }

}
