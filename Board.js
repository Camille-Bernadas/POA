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
					case 0:
						divTile.style.backgroundColor = "black";
						break;
					case 1:
						divTile.style.backgroundColor = "white";
						break;
					case 2:
						divTile.style.backgroundColor = "red";
						break;
					case 3:
						divTile.style.backgroundColor = "yellow";
						break;
					default:
						break;
				}
			}
	  }
	}

}
