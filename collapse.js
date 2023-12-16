let cross = 1;
let downleft = 2;
let start = 3;
let upleft = 4;
let upright = 5;
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
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
    // Funkce pro získání možných hodnot dlaždice na dané pozici
    function getPossibleValues(x, y) {
        ////console.log(grid);
        var possibilites = [];
        var c = connections(grid,x,y);
        ////console.log(c);
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
    /*
  
    // Funkce pro aplikaci wave function collapse na mřížku
    function collapse() {
      for (let x = 0; x <width ; x++) {
        for (let y = 0; y <height; y++) {
          if (grid[x][y] === -1) {
            const possibleValues = getPossibleValues(x, y);
            //console.log("possible for ",x,y)
            //console.log(possibleValues)
            const selectedValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
            //console.log("value");
            //console.log(selectedValue);
            grid[x][y] = selectedValue;
          }
        }
      }
    }
  
  */
    // Inicializace mřížky - předpokládám, že -1 značí nepřiřazenou dlaždici
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
    //console.log("complet")
    return true;
  }

 // ...
/*
function collapse() {
      var nb = getFreeNeighbours(array,x,y)

      if (grid[x][y] === -1) {
        const possibleValues = getPossibleValues(x, y);
          for(const val of possibleValues){
              grid[x][y] = val;
              if(isComplete()||collapse()){
                return true;
              }
          }
        //console.log("vracim se")
        grid[x][y] = -1;

        return false;
      }
  if(isComplete()){

    
    return true; // Při úspěšném dokončení všech kroků vracíme true
  }
  else{
    grid[x][y] = -1;
  }
}
*/
function collapse(pos){
  //console.log("pos")
  //console.log(pos)
  var nb = getFreeNeighbours(grid,pos);
  //console.log(nb)
  
  if(grid[pos[0]][pos[1]]===-1){
    const possibleValues = getPossibleValues(pos[0],pos[1]);
    if(!possibleValues.length){
      //console.log("to je ale otrava")
      grid[pos[0]][pos[1]] = -1;
      return false;
    }
    for(const val of possibleValues){
      grid[pos[0]][pos[1]]=val;
      for(const n of nb){
        //console.log("doing n")
        //console.log(n)
        if(!collapse(n)){
          break;
        }
      }
      if(isComplete()){
        //console.log("nasel jsem pravdu");
       // console.table(grid);
        return true;
      }else{
        return false;
      }

    }
  }
}


  
  // ...
  




    // Provedení wave function collapse
    /*
  for (var i = 0; i < width; i++) {
    //console.log("Provadim")
    if (isComplete()) {
      //console.log("je to komplet")
      break;
    }
    for (var j = 0; j < height; j++) {
      //console.log("zkousim");
      var result = collapse([i, j]);
      if (isComplete()) {
        break;
      } else {

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            if (grid[x][y] == 0) {
              grid[x][y] = -1;
            }
          }
        }
      }

    }
  }
  */
    //result = collapse([0,0])
    result = collapse([width-1,height-1])

    //console.log(result);
    //console.log(isComplete());
    //console.log(maxAttempts);
  
    return grid;
  }
  
  // Příklad použití
 