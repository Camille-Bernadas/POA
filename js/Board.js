WALL = 0;
EMPTY = 1;
PLAYER = 2;
GOAL = 3;
BUTTON_OFF = 4;
BUTTON_ON = 5;
BOX = 6;

class Board {

	constructor(size) {
	  this.x = size
	  this.y = size
	  this.grid = this.initializeGrid();
 	  this.updateBoard()
	}

	initializeGrid() {
		let grid;
		let gridSize = this.x;
	  	grid = new Array(gridSize);
	  	for (var i = 0; i < gridSize; i++) {
	  		grid[i] = new Array(gridSize);
	  		for (var j = 0; j < gridSize; j++) {
	  			grid[i][j] = EMPTY;
	  		}
	  	}
	  	return grid;
	}

	updateBoard() {
		let grid = this.grid;
	  var gameBoard = document.getElementById('board');
		gameBoard.innerHTML = "";
		let width = grid[0].length;
		let vh = Math.round((80/width)*100)/100;
		let styleColumns = "";
		for(let i = 0; i<width; i++) {
			styleColumns += vh+"vh ";
		}
		gameBoard.style.gridTemplateColumns += styleColumns;
		gameBoard.style.paddingLeft = 0;
		for(let line of grid) {
			for(let tile of line) {
				let divTile = document.createElement("div");
				gameBoard.appendChild(divTile);
				divTile.classList.add("tile");
				divTile.style.height = vh+"vh";
				//divTile.style.width = vh+"vh";
				divTile.style.border = "1.5px solid #fff";
				switch(tile) {
					case WALL:
						divTile.classList.add("wall");
						break;
					case EMPTY:
						//divTile.style.backgroundColor = "white";
						break;
					case PLAYER:
						divTile.classList.add("agent");
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
