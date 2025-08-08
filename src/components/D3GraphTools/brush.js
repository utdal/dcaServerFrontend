import * as d3 from "d3";

export function setupBrush(svg, x, y, data, SetSelectedMap, margin, isSelectMode) {
  const brush = d3.brush()
    .extent([[margin.left, margin.top], [svg.attr("width") - margin.right, svg.attr("height") - margin.bottom]])
    .on("end", (event) => {
      const selection = event.selection;
      if (!selection) return;
      const [[x0, y0], [x1, y1]] = selection;

      const selected = data.filter(d => {
        const cx = x(d.step);
        const cy = y(d.hamiltonian);
        return cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1;
      });

      SetSelectedMap(prev => {
        const newSet = new Set(prev);
        for (const d of selected) newSet.add(d.step);
        return [...newSet].sort((a, b) => a - b);
      });

      svg.select(".brush").call(brush.move, null);
    });

  svg.append("g")
    .attr("class", "brush")
    .call(brush);

  svg.select(".brush").style("display", isSelectMode ? null : "none");
}