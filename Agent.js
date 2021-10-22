class Agent {

    constructor(x, y, board) {
        this.x = x
        this.y = y
        this.board = board
        this.move(0,0)
    }

    findPath(){
	//Construire un arbre de recherche avec une heuristique (distance à vol d'oiseau / Manathan entre le spawn et la case de sortie ou la prochaine étape), on doit pouvoir visiter deux fois une même case si la grille à changé entre temps, donc faire attention à ne pas boucler indéfiniement, (faire un tableau de cases visitées que l'on vide quand un élément de la carte à changer(box, interupteur))
	//Si on ne parvient pas à trouver un chemin direct vers la sortie, trouver un checkpoint (interupteur, boite) à actionner et trouver le chemin le plus rapide vers celui-ci, puis le chemin de celui-ci à la sortie/prochain checkpoint)	
	//Retourne le chemin le plus rapide pour le stocker dans une variable
    }

    act(){
	//Prend le prochain noeud dans le chemin retourné par findPath et appliquer l'action
	//Attendre un peu pour que l'on voit ce que l'IA a fait
	//On pourrait également afficher le chemin entier à l'écran
    }

    move(x, y){   
        if(this.x+x >= 0 && this.y + y >= 0 && this.x+x < board.x && this.y+y < board.y){
	    if(this.board.grid[this.x+x][this.y+y] == TILE_TYPE.EMPTY ){
		  	
	        this.board.grid[this.x][this.y] = TILE_TYPE.EMPTY
		  	
	        this.x += x
	        this.y += y
			
	        this.board.grid[this.x][this.y] = TILE_TYPE.PLAYER
			
	        this.board.updateBoard(this.board.grid)
	        console.log(this.x + "," + this.y)
	        return true;
		  
	    }
	    else if(this.board.grid[this.x+x][this.y+y] == TILE_TYPE.BOX && this.board.grid[this.x+x+x][this.y+y+y] == TILE_TYPE.EMPTY){
	        this.board.grid[this.x][this.y] = TILE_TYPE.EMPTY
		  	
	        this.x += x
	        this.y += y
			
	        this.board.grid[this.x][this.y] = TILE_TYPE.PLAYER
	        this.board.grid[this.x+x][this.y+y] = TILE_TYPE.BOX
	        this.board.updateBoard(this.board.grid)
	        console.log(this.x + "," + this.y)
	        return true;
	    }
        }
	return false;
    }
}
