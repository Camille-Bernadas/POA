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

    static interactWithBox() {

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