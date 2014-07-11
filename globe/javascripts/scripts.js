window.onload = function(){



function flying_arc(pts) {
  var source = pts.source,
      target = pts.target;

  var mid = location_along_arc(source, target, .5);
  var result = [ proj(source),
                 sky(mid),
                 proj(target) ]
  return result;
}



function refresh() {
  svg.selectAll(".land").attr("d", path);
  svg.selectAll(".point").attr("d", path);

  svg.selectAll(".arc").attr("d", path)
    .attr("opacity", function(d) {
        return fade_at_edge(d)
    })

  svg.selectAll(".flyer")
    .attr("d", function(d) { return swoosh(flying_arc(d)) })
    .attr("opacity", function(d) {
      return fade_at_edge(d)
    })
}


var mousePostion, projRotation;
function mousedown() {
  mousePostion = [d3.event.pageX, d3.event.pageY];
  projRotation = proj.rotate();
  d3.event.preventDefault();
}
function mousemove() {
  if (mousePostion) {
    var newMousePostion = [d3.event.pageX, d3.event.pageY]
    newRotation = [projRotation[0] + (newMousePostion[0] - mousePostion[0])/2, projRotation[1] + (mousePostion[1] - newMousePostion[1])/2];
    proj.rotate(newRotation);
    sky.rotate(newRotation);
    refresh();
  }
}
function mouseup() {
  if (mousePostion) {
    mousemove();
    mousePostion = null;
  }
}



function drawGlobe(svg, world){

  svg.append("circle")
    .attr("cx", width / 2).attr("cy", height / 2)
    .attr("r", proj.scale())
    .style("fill", "lightblue");

  svg.append("path")
    .datum(topojson.object(world, world.objects.land))
    .attr("class", "land noclicks")
    .attr("d", path)
    .style("fill", "lig");

}





d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

var width = 1000,
    height = 500;

var proj = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .scale(220);

var sky = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .scale(300);


setInterval(function(){
  var rot = proj.rotate()
  proj.rotate([rot[0]+=0.2, rot[1]+=0.01]);
  refresh();
}, 50)


var path = d3.geo.path().projection(proj).pointRadius(2);

var swoosh = d3.svg.line()
      .x(function(d) { return d[0] })
      .y(function(d) { return d[1] })
      .interpolate("cardinal")
      .tension(.0);

var links = [],
    arcLines = [];



  var svg;
  var world;

  d3.json("/javascripts/world.json", function(data){

    svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .on("mousedown", mousedown);

    world = data;

    drawGlobe(svg, world)

  })


}

