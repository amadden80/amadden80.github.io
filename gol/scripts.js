
var Game = function (width, height) {

  this.gameHeightCount = height;
  this.gameWidthCount = width;
  this.state = [];

  this.state = [];
  for (var x = 0; x < this.gameHeightCount; x++) {
    this.state[x] = [];
    for (var y = 0; y < this.gameWidthCount; y++) {
      this.state[x][y] = 0;
    }
  }

  this.zeroState = this.twoDimensionClone(this.state);

};

Game.prototype.twoDimensionClone = function (array) {
  var clone = [];
  for (var i = 0; i < array.length; i++) {
    clone[i] = array[i].slice(0);
  }
  return clone;
};


Game.prototype.randomLife = function () {
  for (var x = 0; x < this.gameHeightCount; x++) {
    for (var y = 0; y < this.gameWidthCount; y++) {
      this.state[x][y] = Math.round(Math.random());
    }
  }
};


Game.prototype.uniq = function(array) {
  return array.filter(function(value, index){
    return array.indexOf(value) === index;
  });
};

Game.prototype.neighborCordinates = function (xCord, yCord) {
  var cordiantes = [];
  for (var x = this.confineIndex(xCord-1, this.gameHeightCount); x < this.confineIndex(xCord+2, this.gameHeightCount); x++) {
    for (var y = this.confineIndex(yCord-1, this.gameWidthCount); y < this.confineIndex(yCord+2,this.gameWidthCount); y++) {
      cordiantes.push([x, y]);
    }
  }
  return this.uniq(cordiantes);
};

Game.prototype.neighborCount = function (xCord, yCord) {
  var total = 0;
  var cordinates = this.neighborCordinates(xCord, yCord);
  for (var i = 0; i < cordinates.length; i++) {
    total += this.state[cordinates[i][0]][cordinates[i][1]];
  }
  return total - this.state[xCord][yCord];
};


Game.prototype.confineIndex = function(index, limit){
  if (index < 0) {
    return 0;
  } else if (index > limit) {
    return limit;
  } else {
    return index;
  }
};


Game.prototype.step = function (callback) {
  callback = callback || function(){};
  var stateClone = this.twoDimensionClone(this.zeroState);
  var xyNeighborCount, currentCell;

  for (var x = 0; x < this.gameHeightCount; x++) {
    for (var y = 0; y < this.gameWidthCount; y++) {
      xyNeighborCount = this.neighborCount(x, y);
      currentCell = this.state[x][y];

      // Any live cell with two or three live neighbours lives on to the next generation.
      if (currentCell ===1 ){
        if ( xyNeighborCount === 2 || xyNeighborCount === 3) {
          stateClone[x][y] = 1;
        }
      } else {
      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if ( xyNeighborCount === 3 ) {
          stateClone[x][y] = 1;
        }
      }

    }
  }

  this.state = this.twoDimensionClone(stateClone);
  callback();

};



function GameView( game, boardElement){
  this.game = game;
  this.boardElement = boardElement;
}


GameView.prototype.draw = function(){
  this.boardElement.innerHTML = '';
  var rowChild, cellElement;

  for (var x = 0; x < this.game.gameHeightCount; x++) {
    rowChild = document.createElement('div');
    rowChild.className = 'row';
    for (var y = 0; y < this.game.gameWidthCount; y++) {
      cellElement = document.createElement('span');
      cellElement.className = 'cell';
      rowChild.appendChild(cellElement);
      if ( this.game.state[x][y] === 1) {
        cellElement.className += ' alive';
      }

    }
    this.boardElement.appendChild(rowChild);
  }

};


GameView.prototype.update = function(){

  var cells, cellElement;
  var rows = this.boardElement.childNodes;

  for (var x = 0; x < this.game.gameHeightCount; x++) {
    cells = rows[x].childNodes;
    for (var y = 0; y < this.game.gameWidthCount; y++) {
      cellElement = cells[y];
      if ( this.game.state[x][y] === 1) {
        cellElement.className = 'cell alive';
      } else {
        cellElement.className = 'cell';
      }
    }
  }

};








// ****************************************
// ***************** Launch ***************
// ****************************************

var game = new Game(100, 100);
game.randomLife();

var gameView = new GameView(game, document.querySelector(".board"));


gameView.draw();

setInterval(function(){
  game.step(function(){
    gameView.update();
  });
}, 250);
