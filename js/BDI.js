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

    static howManyBoxesBlockingGoal(customGrid, agent) {
      var graph = new Graph(customGrid);
      var start = graph.grid[agent.x][agent.y];

      var end = graph.grid[flagPosition.flagX][flagPosition.flagY];
      //Look for the path to the goal ignoring boxes
      let result = astar.search(graph, start, end, {}, false);
      let nbBox = 0;
      for(let node of result) {
        if(node.weight==BOX) nbBox++;
      }
      console.log("Number of boxes : " + nbBox);
      //No solution possible, either press more buttons or give up
      if(result.length==0) return -1;
      return nbBox;
    }

    static findNearestButtonInteractable() {
        var graph = new Graph(grid);
        var start = graph.grid[agent.x][agent.y];

        let nearestInteractable = [];

        for(let i = 0; i<board.x; i++) {
            for(let j = 0; j<board.y; j++) {
                if(grid[i][j] == BUTTON_OFF) {
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
        if(nearestInteractable.length == 0) return [];
        else {
            //Find shortest array in path
            return nearestInteractable.reduce((prev, next) => prev.length > next.length ? next : prev);
        }
    }

    static findAllBoxInteractable() {
        var graph = new Graph(grid);
        var start = graph.grid[agent.x][agent.y];

        let nearestInteractable = [];
        let boxes = []

        for(let i = 0; i<board.x; i++) {
            for(let j = 0; j<board.y; j++) {
                if(grid[i][j] == BOX) {
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
                        boxes.push([i, j]);
                    }
                }
            }
        }

        //If there is no interactable, we return null
        if(boxes.length == 0) return [];
        else {
            //Find shortest array in path
            return boxes;
        }
    }

    //Return true if by moving boxes we found a way to the goal (TODO : or to a new interactable)
    //x, y are the coordinates of the box
    static interactWithBox(x, y, newGrid, newAgent, step, boxesToGoal) {
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
                let futureAgent = new Agent(newAgent.x, newAgent.y, board);
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

      //If we unlocked a path to the goal we go for it
      for(let move of possibleMovements) {
        if(BDI.isGoalAccessible(move[1], move[2].x, move[2].y)) {
          console.log("SOLUTION!!!");
          grid = move[1];
          board.grid = move[1];
          agent = move[2];
          board.updateBoard();
          return true;
        }
      }

      //If there is no immediate solutions, we look ahead in the future by 1 and see if we moved a box out of the goal way
      for(let move of possibleMovements) {
        if(BDI.howManyBoxesBlockingGoal(move[1], move[2])<boxesToGoal) {
          console.log("We managed to move a box out of the way!");
          grid = move[1];
          board.grid = move[1];
          agent = move[2];
          board.updateBoard();
          return true;
        }
        BDI.interactWithBox(move[3][0], move[3][1], move[1], move[2], step-1, boxesToGoal);
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
        let path = this.findNearestButtonInteractable();
        for(let node of path){
            console.log(node.x - agent.x, node.y - agent.y)
            agent.move(node.x - agent.x, node.y - agent.y)
            await timer(69);
        };
        agent.interact();
        if(path.length!==0) {
          console.log(path);
          console.log("Path is not empty");
          return true;
        }

        //If we activate all buttons and we still can't access the goal then we can't win
        if(BDI.howManyBoxesBlockingGoal(grid, agent)==-1) {
          console.log("There are no ways to win this game");
        }

        let boxes = this.findAllBoxInteractable();
        for(let box of boxes) {
          console.log("Entered box in deliberate");
          let res = BDI.interactWithBox(box[0], box[1], board.grid, agent, 5, BDI.howManyBoxesBlockingGoal(board.grid, agent));
          if(res!==undefined) return true;
        }

        //If we didn't move any boxes because it couldn't help us we are stuck, the agent is not intelligent enough to go further
    }
}
