
var stepTime = 200;

function GameBoard(boardSize){
  this.boardSize = boardSize;
  this.el = undefined;
  this.state = undefined;
}


GameBoard.prototype.initialize = function(){
  var that = this;
  this.state = new Array(this.boardSize);
  $(this.state).each(function(idx, el){
    that.state[idx] = new Array(that.boardSize);
  })
  for (var y = 0; y < this.state.length; y++) {
    for (var x = 0; x < this.state.length; x++) {
      this.state[y][x] = false;
    }
  }
}



GameBoard.prototype.update = function() {
  var that = this;

  var rows = $('.row');
  for (var y = 0; y < this.state.length; y++) {
    var columns = $(rows[y]).find('.cell');
    for (var x = 0; x < this.state[y].length; x++) {
      if (this.state[y][x]){
        $(columns[x]).addClass('alive');
        $(columns[x]).animate({
          'opacity': 0.5
        }, stepTime);
      } else{
        $(columns[x]).removeClass('alive');
      }
    };
  };

  return this;
}



GameBoard.prototype.render = function() {
  var that = this;

  var gameBoardEl = $('<div>').addClass('board');

  for (var y = 0; y < this.state.length; y++) {
    var row = $('<div>').addClass('row');
    for (var x = 0; x < this.state[y].length; x++) {
      var cell = $('<span>').addClass('cell').data('x', x).data('y', y);
      if (this.state[y][x]){
        cell.addClass('alive');
      }
      cell.on('click',function(){
        $(this).addClass('alive');
        var x = $(this).data('x');
        var y = $(this).data('y');
        that.state[y][x] = true;
      })
      row.append(cell)
    };
    gameBoardEl.append(row);
  };

  this.el = gameBoardEl;
  return this;
}


GameBoard.prototype.neighbours = function(y, x){
  var yPlusLeft, yPlus, yPlusRight, left, right, yMinusLeft, yMinus, yMinusRight;
  if (this.state[y+1] != undefined){
    yPlusLeft    = this.state[y+1][x-1];
    yPlus        = this.state[y+1][x];
    yPlusRight   = this.state[y+1][x+1];
  }
  left         = this.state[y][x-1];
  right        = this.state[y][x+1];
  if (this.state[y-1] != undefined){
    yMinusLeft   = this.state[y-1][x-1];
    yMinus       = this.state[y-1][x];
    yMinusRight  = this.state[y-1][x+1];
  }
  var friends = [yPlusLeft, yPlus, yPlusRight, left, right, yMinusLeft, yMinus, yMinusRight];
  for(var i = friends.length - 1; i >= 0; i--) {
    if((friends[i] === undefined) || (friends[i] === false)) {
       friends.splice(i, 1);
    }
  }
  return friends.length;
}

GameBoard.prototype.scatter = function(numAlive){
  for (var i = 0; i < numAlive; i++) {
    var y = Math.floor(Math.random()*this.boardSize);
    var x = Math.floor(Math.random()*this.boardSize);
    this.state[y][x] = true;
  }
};

GameBoard.prototype.step = function(callback){

  this.render().el;
  var nextStep = this.state;

  for (var y = 0; y < this.state.length; y++) {
    for (var x = 0; x < this.state.length; x++) {
      var numNeighbours = this.neighbours(y, x);
      if(this.state[y][x]){
        if (numNeighbours<2 || numNeighbours>3){
          nextStep[y][x] = false;
        }
      } else{
        if (numNeighbours==3){
          nextStep[y][x] = true;
        }
      }
    }
  }
  this.state = nextStep;
  callback()
  return this;
};


var game;
$(function(){
  game = new GameBoard(25);
  game.initialize();

  $('#game-table').html(game.render().el)

  var timer;
  $('.start').on('click', function(){
    game.scatter($(this).data('count'));
    clearInterval(timer)
    game.update();
    timer = setInterval(function(){
      game.step(function(){
        game.update();
      })
    }, stepTime);
  })

  $('.stop').on('click', function(){
    clearInterval(timer)
  })
})
