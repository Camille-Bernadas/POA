WALL = 0;
EMPTY = 1;
PLAYER = 2;
GOAL = 3;
BUTTON_OFF = 4;
BUTTON_ON = 5;
BOX = 6;

class Board {

	constructor(grid) {
	  this.x = 20
	  this.y = 20
	  this.grid = grid
 	  this.updateBoard(this.grid, this.x, this.y)
	}

	updateBoard() {
	  var gameBoard = document.getElementById('game');
		gameBoard.innerHTML = "";
		let width = grid[0].length;
		console.log("width" + width);
		let vh = Math.round((90/width)*100)/100;
		console.log("vh" + vh);
		let styleColumns = "";
		for(let i = 0; i<width; i++) {
			styleColumns += vh+"vh ";
		}
		gameBoard.style.gridTemplateColumns += styleColumns;
		for(let line of grid) {
			for(let tile of line) {
				let divTile = document.createElement("div");
				gameBoard.appendChild(divTile);
				divTile.classList.add("tile");
				divTile.style.height = vh+"vh";
				switch(tile) {
					case WALL:
						divTile.classList.add("wall");
						break;
					case EMPTY:
						break;
					case PLAYER:
						divTile.classList.add("player");
						break;
					case GOAL:
						divTile.classList.add("goal");
						break;
					case BOX:
						divTile.classList.add("box");
						break;
					case BUTTON_ON:
						divTile.classList.add("button-on");
						break;
					case BUTTON_OFF:
						divTile.classList.add("button-off");
						break;
					default:
						break;
				}
			}
	  }
	}

}
