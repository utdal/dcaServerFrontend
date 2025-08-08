import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {createScales} from "./D3GraphTools/scales";
import { drawAxes, drawGrid } from "./D3GraphTools/axes";
import {drawLineAndAnimate} from "./D3GraphTools/line";
import {drawCircles} from "./D3GraphTools/points";
import {setupZoom} from "./D3GraphTools/zoom";
import {setupBrush} from "./D3GraphTools/brush";
import {setupTooltip} from "./D3GraphTools/tooltip";
import {addUIIcons} from "./D3GraphTools/uiIcons";
import './Graphs.css';
export default function D3Graph({SetSelectedMap, data}) {
  const containerRef = useRef();
  const svgRef = useRef();
  const tooltipRef = useRef();
  const zoomRef = useRef();
  const zoomTransformRef = useRef(d3.zoomIdentity);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [renderGraph, setRenderGraph] = useState(true);
  const colorScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.hamiltonian), d3.max(data, d => d.hamiltonian)])
    .range(["blue", "red"]);


  useEffect(() => {
    if (!data.length || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const margin = { top: 40, right: 30, bottom: 60, left: 90 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height);

    svg.append("text")
      .attr("class", "graph-title")
      .attr("x", width / 2)
      .attr("y", margin.top / 2 + 10)
      .attr("text-anchor", "middle")
      .text("Evolution of Sequence");

    const { x, y } = createScales(data, width, height, margin, -100, 100, -22, 20);

    drawAxes(svg, x, y, width, height, margin);

    const gridGroup = drawGrid(svg, x, y, width, height, margin);

    const zoomGroup = svg.append("g")
      .attr("class", "zoom-group")
      .attr("clip-path", "url(#clip)");

    const path = drawLineAndAnimate(svg, data, x, y, zoomGroup, renderGraph, setRenderGraph);

    const tooltip = setupTooltip(tooltipRef);

    drawCircles(data, x, y, zoomGroup, tooltip, SetSelectedMap, renderGraph, colorScale);

    setupZoom(svg, x, y, zoomGroup, zoomTransformRef, margin, isSelectMode, zoomRef);

    setupBrush(svg, x, y, data, SetSelectedMap, margin, isSelectMode);

    addUIIcons(svg, 0, 0, width, height, margin, tooltip, zoomTransformRef, setIsSelectMode, isSelectMode, svgRef, zoomRef);

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, [data, isSelectMode, renderGraph, SetSelectedMap]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "500px", display: "flex", justifyContent: "center" }}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
