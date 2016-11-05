/* Graph visualization with d3 */

function visualizeNet(){

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
	console.log("Link Source: " + link.source + " Link Target: " + link.target);
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});


 force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(100)
    .charge(-50000)
    .on("tick", tick)
    .start();

 svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["link"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 26)
    .attr("markerHeight", 26)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5");

rect = svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#ffaa00");

path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var drag = force.drag()
    .on("dragstart", dragstart);

circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 30)
      .on("dblclick", dblclick)
      .call(drag);
//    .call(force.drag);

text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .style("font-size", "30px")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.name; });

    return force;
}

// Use elliptical arc path segments to doubly-encode directionality.
/*function tick() {
  path.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  circle.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}
*/

function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}


function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}
