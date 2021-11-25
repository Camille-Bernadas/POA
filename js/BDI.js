class BDI {
    static isGoalAccessible() {
        var graph = new Graph(grid);
        var start = graph.grid[agent.x][agent.y];

        var end = graph.grid[flagPosition.flagX][flagPosition.flagY];

        var result = astar.search(graph, start, end, {}, true);
        console.log(result);

        return result==[];
    }

    static findNearestInteractable() {
        var graph = new Graph(grid);
        var start = graph.grid[agent.x][agent.y];

        let nearestInteractable = [];

        for(let i = 0; i<board.x; i++) {
            for(let j = 0; j<board.y; j++) {
                if(grid[i][j] == BUTTON_OFF || grid[i][j] == BOX) {
                    let posInter = [[i-1, j], [i+1, j], [i, j-1], [i, j+1]];
                    let paths = [];
                    for(let pos of posInter) {
                        var end = graph.grid[pos[0]][pos[1]];
                        var result = astar.search(graph, start, end, {}, true);
                        //Add path if it exists
                        if(result.length) paths.push(result);
                    }
                    //If there is exist a path to an interactable, we go for the closest one
                    if(paths.length) {
                        //Find shortest array in path
                        nearestInteractable.push(paths.reduce((prev, next) => prev.length > next.length ? next : prev));
                    }
                }
            }
        }

        //If there is no interactable, we return null
        if(nearestInteractable.length == 0) return null;
        else {
            //Find shortest array in path
            return nearestInteractable.reduce((prev, next) => prev.length > next.length ? next : prev);
        }
    }

    //Return true if by moving boxes we found a way to the goal (TODO : or to a new interactable)
    //x, y are the coordinates of the box
    static interactWithBox(x, y) {
      //We check which directions we can move the box to
      var graph = new Graph(grid);
      var start = graph.grid[agent.x][agent.y];
      let posInter = [[x-1, y, x+1, y], [x+1, y, x-1, y], [x, y-1, x, y+1], [x, y+1, x, y-1]];

      //If there is a space for the player to go there
      //Check if no coordinates are out of bound
      for(pos of posInter) {
        if(pos[0]>=0 && pos[0]<board.x && pos[2]>=0 && pos[2]<board.x && pos[1]>=0 && pos[1]<board.y && pos[3]>=0 && pos[3]<board.y) {
          if(grid[pos[0]][pos[1]]==EMPTY || grid[x-1][y]==PLAYER) {
            //If the box can be moved
            if(grid[x+1][y]==EMPTY) {
              //If there is a way for the player to go there
              let end = graph.grid[x-1][y];
              let result = astar.search(graph, start, end, {}, true);
              if(result.length!==0) {
                console.log(result);
              }
            }
          }
        }
      }
    }

    static async deliberate() {
        const timer = ms => new Promise(res => setTimeout(res, ms))
        let path = this.findNearestInteractable();
        for(let node of path){
            console.log(node.x - agent.x, node.y - agent.y)
            agent.move(node.x - agent.x, node.y - agent.y)
            await timer(69);
        }
        agent.interact();
    }
}
