class Agent {

    constructor(x, y, board) {
        this.x = x
        this.y = y
        this.board = board
        this.move(0,0)
    }

    move(x, y){
      this.board.grid[this.x][this.y] = 1
      let newX = this.x+x
      let newY = this.y+y
      if(newX < 0 || newX >= this.board.x || newY < 0 || newY >= this.board.y){
        return
      }
      if(this.board.grid[newX][newY] == 1 || this.board.grid[newX][newY] == 3){
        this.x += x
        this.y += y
      }
      this.board.grid[this.x][this.y] = 2
      this.board.updateBoard(this.board.grid)
      console.log(this.x + "," + this.y)
      return
    }

}
