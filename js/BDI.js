class BDI {
    static pathToGoal = "";

    static isGoalAccessible(customGrid, agentX, agentY) {
        var graph = new Graph(customGrid);
        var start = graph.grid[agentX][agentY];

        var end = graph.grid[flagPosition.flagX][flagPosition.flagY];

        let result = astar.search(graph, start, end, {}, true);
        let sizeResult = result.length;

        BDI.pathToGoal = result;

        return sizeResult!==0;
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
    static interactWithBox(x, y, newGrid, newAgent, step) {
      console.log(step);
      if (step == 0) return false;
      //We check which directions we can move the box to
      var graph = new Graph(newGrid);
      var start = graph.grid[newAgent.x][newAgent.y];
      let posInter = [[x-1, y, x+1, y], [x+1, y, x-1, y], [x, y-1, x, y+1], [x, y+1, x, y-1]];

      let possibleMovements = []

      //If there is a space for the player to go there
      //Check if no coordinates are out of bound
      for(let pos of posInter) {
        if(pos[0]>=0 && pos[0]<board.x && pos[2]>=0 && pos[2]<board.x && pos[1]>=0 && pos[1]<board.y && pos[3]>=0 && pos[3]<board.y) {
          if(newGrid[pos[0]][pos[1]]==EMPTY || newGrid[pos[0]][pos[1]]==PLAYER) {
            //If the box can be moved
            if(newGrid[pos[2]][pos[3]]==EMPTY) {
              //If there is a way for the player to go there
              let end = graph.grid[pos[2]][pos[3]];
              let result = astar.search(graph, start, end, {}, true);
              if(result.length!==0 || newGrid[pos[2]][pos[3]]==PLAYER) {
                let futureGrid = JSON.parse(JSON.stringify(newGrid));
                let futureAgent = JSON.parse(JSON.stringify(newAgent));
                futureGrid[x][y] = EMPTY;
                futureGrid[pos[0]][pos[1]] = BOX;
                futureGrid[newAgent.x][newAgent.y] = EMPTY;
                futureAgent.x = pos[2];
                futureAgent.y = pos[3];
                futureGrid[futureAgent.x][futureAgent.y] = PLAYER;
                let boxPos = [pos[0], pos[1]];

                possibleMovements.push([result, futureGrid, futureAgent, boxPos]);
              }
            }
          }
        }
      }

      for(let move of possibleMovements) {
        if(BDI.isGoalAccessible(move[1], move[2].x, move[2].y)) {
          console.log("SOLUTION!!!");
          return true;
        }
      }

      //If there is no immediate solutions, we look ahead in the future by 1
      for(let move of possibleMovements) {
        BDI.interactWithBox(move[3][0], move[3][1], move[1], move[2], step-1);
      }
    }

    static async deliberate() {
        const timer = ms => new Promise(res => setTimeout(res, ms))
        if(BDI.isGoalAccessible(grid, agent.x, agent.y)) {
          for(let node of BDI.pathToGoal) {
            console.log(node.x - agent.x, node.y - agent.y)
            agent.move(node.x - agent.x, node.y - agent.y)
            await timer(69);
          }
        }
        let path = this.findNearestInteractable();
        for(let node of path){
            console.log(node.x - agent.x, node.y - agent.y)
            agent.move(node.x - agent.x, node.y - agent.y)
            await timer(69);
        }
        agent.interact();
    }
}
