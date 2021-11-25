function saveMapToFile(){
	let mapData = { "gameVersion" : version, "map" : [0], "height" : grid.length, "width" : grid[0].length};
	for(let x =0; x < grid.length; x++){
		mapData["map"][x] = [];
		for(let y =0; y < grid[0].length; y++){
			mapData["map"][x][y] = grid[x][y];
		}
	}
	let mapAsString = JSON.stringify(mapData);

	var map = new Blob([mapAsString], { type: 'application/json' });
	var a = document.createElement('a');
	a.download = 'map.json';
	a.href = window.URL.createObjectURL(map);
	a.click();
}

function loadMapToGame(){
	let filecontent;
	let file = document.getElementById("load").files[0];
	if (file) {
	    var reader = new FileReader();
	    reader.readAsText(file, "UTF-8");
	    reader.onload = function (evt) {
	    	filecontent= JSON.parse(evt.target.result);
	    	if(filecontent.height != gridSize) {
	    		alert("La taille de grille ne correspond pas")
	    	} else {
	    		for(let x =0; x < filecontent.map.length; x++){
					for(let y =0; y < filecontent.map[0].length; y++){
						grid[x][y] = filecontent.map[x][y];
					}
				}
			board.updateBoard(grid);
	    	}
	    }
	}
	console.log(grid)
	activateDragsandClicks("mapsave.js")
	
	
}


document.getElementById("save").addEventListener('click', (event) => {
  saveMapToFile();
})

document.getElementById("load").addEventListener('change', (event) => {
  loadMapToGame();
})
