import * as d3 from "d3";

export function drawCircles(data, x, y, zoomGroup, tooltip, SetSelectedMap, renderGraph, colorScale) {


  const circles = zoomGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.step))
    .attr("cy", d => y(d.hamiltonian))
    .attr("r", 0)
    .attr("fill", "white")
    .attr("stroke", d => colorScale(d.hamiltonian))
    .style("opacity", 0)
    .style("cursor", "pointer");

  circles
    .on("mouseover", function(event, d) {
      d3.select(this).attr("r", 2).attr("fill", "orange");
      tooltip.innerHTML = `Step: ${d.step}<br>Hamiltonian: ${d.hamiltonian.toFixed(2)}`;
      tooltip.style.opacity = 1;
    })
    .on("mousemove", function(event) {
      tooltip.style.left = event.pageX + 1 + "px";
      tooltip.style.top = event.pageY + 1 + "px";
    })
    .on("mouseout", function() {
      d3.select(this).attr("r", 1.5).attr("fill", "white");
      tooltip.style.opacity = 0;
    })
    .on("click", function(event, d) {
      if(SetSelectedMap){
      SetSelectedMap(prev => {
        const newSet = new Set(prev);
        newSet.add(d.step);
        return [...newSet].sort((a, b) => a - b);
      });
    }
    });

  if (renderGraph) {
    const animationDuration = 3000;
    circles
      .transition()
      .delay((_, i) => (i / data.length) * animationDuration)
      .duration(200)
      .attr("r", 1.5)
      .style("opacity", 1);
  } else {
    circles
      .attr("r", 1.5)
      .style("opacity", 1);
  }
}