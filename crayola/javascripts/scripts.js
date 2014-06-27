
Array.prototype.sample = function(){
  var idx = Math.floor(Math.random() * this.length );
  return this[idx];
}

function randomCirclesData(numCircles){
  var circles = [];
  for (var i = 0; i < numCircles; i++) {
    circles.push (
      {
        r: ['5%', '25%', '50%', '75%'].sample(),
        cx: ['5%', '25%', '50%', '75%'].sample(),
        cy: ['5%', '25%', '50%', '75%'].sample(),
        fill: crayola.sample().hex,
        opacity: '0.5'
      }
    );
  };
  ;
  return circles;
};


function projectData(data){

  var projection = d3.select("svg")
                      .selectAll("circle")
                      .data(data);

  projection.enter().append('circle');

  var projection = d3.select("svg")
                      .selectAll("circle")
                      .data(data);

  projection
            .transition()
              .duration(1000)
            .attr('r', function(d){ return d.r; })
            .attr('cx', function(d){ return d.cx; })
            .attr('cy', function(d){ return d.cy; })
            .style('fill', function(d){ return d.fill; })
            .style('opacity', function(d){ return d.opacity; });

  projection.exit()
              .remove();

};


window.onload=function(){

  d3.select("svg")
    .attr("width", '100%')
    .attr("height", '75%')
    .style("border", "1px solid black")

  setInterval(function(){
    var numCircles = 5;
    projectData(randomCirclesData(numCircles));
  }, 1000)

};
