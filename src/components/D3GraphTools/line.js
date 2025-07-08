import * as d3 from "d3";

export function drawLineAndAnimate(svg, data, x, y, zoomGroup, renderGraph=false, SetRenderGraph) {
  const line = d3.line()
    .x(d => x(d.step))
    .y(d => y(d.hamiltonian));

  const defs = svg.append("defs");

  const gradient = defs.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  gradient.append("stop").attr("offset", "0%").attr("stop-color", "red");
  gradient.append("stop").attr("offset", "5%").attr("stop-color", "purple");
  gradient.append("stop").attr("offset", "50%").attr("stop-color", "blue");

  const path = zoomGroup.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "url(#line-gradient)")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  if (renderGraph) {
    const totalLength = path.node().getTotalLength();
    const animationDuration = 5000;

    path
      .attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .ease(d3.easeLinear)
      .duration(animationDuration)
      .attr("stroke-dashoffset", 0)
      .on("end", () => {
        SetRenderGraph(false);
      });
  }

  return path;
}