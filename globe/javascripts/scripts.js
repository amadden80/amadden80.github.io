
var svg;
var proj;
var world;
var latitude;
var longitude;

var width = 1000,
    height = 500;


function refresh() {
  svg.selectAll(".land").attr("d", path);
  svg.selectAll(".point").attr("d", path);
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


window.onload = function(){

  d3.select(window)
      .on("mousemove", mousemove)
      .on("mouseup", mouseup);


  window.proj = d3.geo.orthographic()
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .scale(220);

  window.sky = d3.geo.orthographic()
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .scale(300);

  window.path = d3.geo.path().projection(window.proj).pointRadius(2);

  setInterval(function(){
    var rot = proj.rotate()
    proj.rotate([rot[0]+=0.2, rot[1]+=0.01]);
    refresh();
  }, 50)

  svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height)
          .on("mousedown", mousedown);

  d3.json("javascripts/world.json", function(data){

    world = data;

    drawGlobe(svg, world)

    var watchID = navigator.geolocation.watchPosition(function(position) {

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      place = [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [ longitude, latitude ] } }]

      svg.append("g").attr("class","points")
          .selectAll("text").data(place)
        .enter().append("path")
          .attr("class", "point")
          .attr("d", path)
          .style('fill', 'red')

    })

  })

}
