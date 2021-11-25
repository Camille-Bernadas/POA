class Button extends Element {

	constructor(x, y) {
		super(x, y, "button");
	}

	initialiser(x, y) {
		super.initialiser(x, y, "img/button.png");
	}

	activate(wall) {
		const board = document.getElementById('board');
		index = board.children.length/2
 		//board.children[]
	}	
}