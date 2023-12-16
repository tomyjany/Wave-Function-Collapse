let cross = 1;
let downleft = 2;
let start = 3;
let upleft = 4;
let upright = 5;
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex > 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function connections(grid,x,y){
    const width = grid.length;
    const height = grid[0].length;
    //console.log(width, height)

    //0 there can be no connection, 1 there must be connection, 2 there can or does not have to be a connection
    //var connections = [0,0,0,0]; // up down left right
    var connections = [2,2,2,2]; // up down left right

    if(x-1 >= 0){
        var e = grid[x-1][y];
        switch(e){
            case -1:
                connections[0] = 2;
                break;
            case 1:
                connections[0] = 1;
                break;
            case 2:
                connections[0] = 1;
                break;
            default:
                connections[0] = 0;
        }
    }
    if(x+1 < width){
        var e = grid[x+1][y];
        switch(e){
            case -1:
                connections[1] = 2;
                break;
            case 1:
                connections[1] = 1;
                break;
            case 4:
                connections[1] = 1;
                break;
            case 5:
                connections[1] = 1;
                break;
            default:
                connections[1] = 0;
        }
    }
    if(y-1 >= 0){
        var e = grid[x][y-1];
        switch(e){
            case -1:
                connections[2] = 2;
                break;
            case 1:
                connections[2] = 1;
                break;
            case 5:
                connections[2] = 1;
                break;
            case 3:
                connections[2] = 1;
                break;
            default:
                connections[2] = 0;
        }
        
    }
    if(y+1 < height){
        var e = grid[x][y+1];
        switch(e){
            case -1:
                connections[3] = 2;
                break;
            case 1:
                connections[3] = 1;
                break;
            case 4:
                connections[3] = 1;
                break;
            case 2:
                connections[3] = 1;
                break;
                
            default:
                connections[3] = 0;
        }
    }
    return connections;
}
function eql(b,a){
    return((a[0]==b[0]||b[0]==2)&&(a[1]==b[1]||b[1]==2)&&(a[2]==b[2]||b[2]==2)&&(a[3]==b[3]||b[3]==2));
}

function getFreeNeighbours(array,pos){
  const width = array.length;
  const height = array[0].length;
  var nb = [];

  if(pos[0]-1 >= 0){
    if(array[pos[0]-1][pos[1]] == -1)
    nb.push([pos[0]-1,pos[1]]);
  }
  if(pos[0]+1 < width){
    if(array[pos[0]+1][pos[1]] == -1)
    nb.push([pos[0]+1,pos[1]]);
  }
  if(pos[1]-1 >= 0){
    if(array[pos[0]][pos[1]-1] == -1)
    nb.push([pos[0],pos[1]-1]);
  }
  if(pos[1]+1 < height){
    if(array[pos[0]][pos[1]+1] == -1)
    nb.push([pos[0],pos[1]+1]);
  }
  return nb;
  
}
function waveFunctionCollapse(grid) {
    const width = grid.length;
    const height = grid[0].length;
   const maxAttempts = 10000;
    function getPossibleValues(x, y) {
        var possibilites = [];
        var c = connections(grid,x,y);
        var crossP = [1,1,1,1];
        var downleftP = [0,1,1,0];
        var startP = [0,0,0,1];
        var upleftP = [1,0,1,0];
        var uprightP = [1,0,0,1];

        if (eql(c,crossP)){possibilites.push(cross)}
        if (eql(c,downleftP)){possibilites.push(downleft)}
        if (eql(c,startP)){possibilites.push(start)}
        if (eql(c,upleftP)){possibilites.push(upleft)}
        if (eql(c,uprightP)){possibilites.push(upright)}




        
      return shuffle(possibilites);
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (grid[x][y] == 0) {
          grid[x][y] = -1;
        }
      }
    }
    
 function isComplete() {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (grid[x][y] == -1) {
          return false;
        }
      }
    }
    return true;
  }

function collapse(pos){
  var nb = getFreeNeighbours(grid,pos);
  
  if(grid[pos[0]][pos[1]]===-1){
    const possibleValues = getPossibleValues(pos[0],pos[1]);
    if(!possibleValues.length){
      grid[pos[0]][pos[1]] = -1;
      return false;
    }
    for(const val of possibleValues){
      grid[pos[0]][pos[1]]=val;
      for(const n of nb){
        if(!collapse(n)){
          break;
        }
      }
      if(isComplete()){
        return true;
      }else{
        return false;
      }

    }
  }
}


    result = collapse([width-1,height-1])
    return grid;
  }
  
 