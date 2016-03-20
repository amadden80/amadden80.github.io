
var heartBot = {};

heartBot.animateFlyAndDisolve = function($node, rate){
  $node.animate({
    top: (Math.random() * 200)-50 + '%',
    left: (Math.random() * 200)-50 + '%',
    opacity: 0
  },
  rate,
  'linear',
  function(){
    $(this).remove();
  });
};

heartBot.generateHeart = function(){
  var newheart = $("<h1>");
  newheart.addClass('heart');
  newheart.html('&hearts;');
  newheart.css({
    position: 'absolute',
    top: this.currentMousePos.y + 'px',
    left: this.currentMousePos.x + 'px',
  });
  return newheart;
};


heartBot.setTrackMouseHandler = function(){
  var scope = this;
  scope.currentMousePos = {x: null, y: null};
  $(document).mousemove(function(e) {
      scope.currentMousePos.x = e.pageX;
      scope.currentMousePos.y = e.pageY;
  });
};

heartBot.appendAnimatedHeart = function($parentNode, rate){
  var heart = this.generateHeart();
  $parentNode.append(heart);
  this.animateFlyAndDisolve(heart, rate);
};



$(function(){

  heartBot.setTrackMouseHandler();

  setInterval(function(){
    heartBot.appendAnimatedHeart( $('#heart-home'), 2000 );
  }, 100);

});
