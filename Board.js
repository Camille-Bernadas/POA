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
		let vh = Math.round((75/width)*100)/100;
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
						divTile.style.backgroundColor = "black";
						break;
					case EMPTY:
						divTile.style.backgroundColor = "white";
						break;
					case PLAYER:
						divTile.style.backgroundColor = "red";
						break;
					case GOAL:
						divTile.style.backgroundColor = "yellow";
						break;
					case BOX:
						divTile.style.backgroundColor = "brown";
						break;
					case BUTTON_ON:
						divTile.style.backgroundColor = "pink";
						break;
					case BUTTON_OFF:
						divTile.style.backgroundColor = "fuschia";
						break;
					default:
						break;
				}
			}
	  }
	}

}
