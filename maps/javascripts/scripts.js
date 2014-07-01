
window.onload= function(){

  var width = window.screen.availWidth,
      height = window.screen.availHeight;

  var projection = d3.geo.albersUsa()
      .scale(1000);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.insert("path")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path")
        .datum(topojson.mesh(us, us.objects.states))
        .attr("class", "state")
        .attr("d", path);

    d3.select('body')
      .on("click", function() {

        var x = d3.mouse(this)[0];
        var y = d3.mouse(this)[1];

        svg.append('circle')
          .attr('r', '25px')
          .style('fill',' red')
          .style('opacity',0.1)
          .attr('cx', x)
          .attr('cy', y)
          .transition()
            .duration(1000)
            .attr('r', '0px')
          .transition()
            .duration(1000)
            .attr('r', '10px')
            .style('opacity', 0.5)
          .transition()
            .duration(1000)
            .attr('r', '0px')
            .remove()

        svg.append('circle')
          .attr('r', '30px')
          .style('stroke', 'blue')
          .style('opacity','0.2')
          .attr('cx', x)
          .attr('cy', y)
          .transition()
            .duration(1250)
            .attr('r', '0px')
            .remove()

        svg.append('circle')
          .attr('r', '35px')
          .style('stroke', 'white')
          .style('opacity','0.3')
          .attr('cx', x)
          .attr('cy', y)
          .transition()
            .duration(1500)
            .attr('r', '0px')
            .remove()
      });

}

