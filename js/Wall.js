class Wall extends Element {

	constructor(x, y) {
		super(x, y, "wall");
	}

	initialiser(x, y) {
		super.initialiser(x, y, "img/wall.png");
	}

}