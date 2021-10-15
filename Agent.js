class Agent {

    constructor(x, y, board) {
        this.x = x
        this.y = y
        this.board = board
        this.move(0,0)
    }

    move(x, y){
      this.board.grid[this.x][this.y] = 0
      if(this.board.grid[this.x+x][this.y+y] == 0){
        this.x += x
        this.y += y
      }
      this.board.grid[this.x][this.y] = 2
      this.board.updateBoard(this.board.grid)
      console.log(this.x + "," + this.y)
    }

}