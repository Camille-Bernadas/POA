class Agent {

    constructor(x, y, board) {
        this.x = x
        this.y = y
        this.board = board
        this.move(0,0)
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

      //Box handling
      if(this.board.grid[newX][newY] == BOX) {
        if(this.board.grid[newX+x][newY+y] == EMPTY) {
          this.board.grid[newX][newY] = EMPTY;
          this.board.grid[newX+x][newY+y] = BOX;
        }
      }

      this.board.grid[this.x][this.y] = PLAYER;
      this.board.updateBoard(this.board.grid);
      console.log(this.x + "," + this.y);
      return;
    }

}
