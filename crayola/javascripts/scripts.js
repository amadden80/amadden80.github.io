
Array.prototype.sample = function(){
  var idx = Math.floor(Math.random() * this.length );
  return this[idx];
}

function randomCirclesData(numCircles){
  var circles = [];
  for (var i = 0; i < numCircles; i++) {
    circles.push (
      {
        r: (Math.random()*5+2) + '%',
        cx: (Math.random()*100) + '%',
        cy: (Math.random()*100) + '%',
        fill: crayola.sample().hex,
        opacity: Math.random()
      }
    );
  };
  ;
  return circles;
};

function explode(bubble){
  bubble
  .transition()
    .duration(500)
      .attr('r', '100%');
  return this;
}


function projectData(data){

  var projection = d3.select("svg")
                      .selectAll("circle")
                      .data(data);

  projection.enter()
              .append('circle')
              .style('opacity', 0)
              .style('fill', function(d){ return d.fill; })
              .on('mousedown', function(){
                                  explode(d3.select(this));
                                });

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
    var numCircles = 57;
    projectData(randomCirclesData(numCircles));
  }, 900)

};





// var colorGradient = d3.scale.linear()
//     .domain([0, 1])
//     .range([crayola.sample().hex, crayola.sample().hex]);

