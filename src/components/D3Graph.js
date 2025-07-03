import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Zoom from './zoom-in.png';
import Select from './selection.png';
import Click from './hand-pointer.png';
import Reset from './reset.png';
import Download from './download.png'

export default function App({ selectedMap, SetSelectedMap }) {
  const containerRef = useRef();
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [data, setData] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  useEffect(() => {
    async function fetchJSON() {
      const response = await fetch("precalculated-outputs.json");
      const json = await response.json();
      const { steps, hamiltonians } = json[0];

      const combined = steps.map((step, i) => ({
        step,
        hamiltonian: hamiltonians[i],
      }));

      setData(combined);
    }
    fetchJSON();
  }, []);

  useEffect(() => {
    if (!data.length) return;
    if (!containerRef.current) return;
    function zoomed(event) {
      const transform = event.transform;
      const zx = transform.rescaleX(x);
      const zy = transform.rescaleY(y);

      const [x0] = zx.domain();
      if (x0 < -200) return;

      xAxisGroup.call(d3.axisBottom(zx));
      yAxisGroup.call(d3.axisLeft(zy));

      zoomGroup.selectAll("path")
        .attr("d", d3.line()
          .x(d => zx(d.step))
          .y(d => zy(d.hamiltonian)));

      zoomGroup.selectAll("circle")
        .attr("cx", d => zx(d.step))
        .attr("cy", d => zy(d.hamiltonian));
    }
    function downloadPNG() {
      const svgElement = svgRef.current;
      if (!svgElement) return;

      const svgString = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const scale = 5;
        const canvas = document.createElement("canvas");
        canvas.width = svgElement.clientWidth * scale;
        canvas.height = svgElement.clientHeight * scale;

        const context = canvas.getContext("2d");
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "graph.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      };

      img.src = url;
    }

  
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;    
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);

    svg.append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

    const x = d3.scaleLinear()
      .domain([
        Math.min(-200, d3.min(data, d => d.step)),
        d3.max(data, d => d.step)+100
      ])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.hamiltonian) -10,
        d3.max(data, d => d.hamiltonian) + 10
      ])
      .range([height - margin.bottom, margin.top]);

    const zoomGroup = svg.append("g")
      .attr("class", "zoom-group")
      .attr("clip-path", "url(#clip)");

    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`);

    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .text("Steps")
      .style("font-family", "'Helvetica', monospace")
      .style("font-size", "10px")
      .style("color", "rgba(0,0,0,0.5)");

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", 15)
      .text("Hamiltonian")
      .style("font-family", "'Helvetica', monospace")
      .style("font-size", "10px")
      .style("color", "rgba(0,0,0,0.5)");

    const line = d3.line()
      .x(d => x(d.step))
      .y(d => y(d.hamiltonian));

    zoomGroup.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    let tooltip = tooltipRef.current;
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.style.position = "absolute";
      tooltip.style.pointerEvents = "none";
      tooltip.style.background = "rgba(0,0,0,0.7)";
      tooltip.style.color = "white";
      tooltip.style.padding = "6px 10px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.opacity = 0;
      tooltip.style.transition = "opacity 0.2s ease";
      document.body.appendChild(tooltip);
      tooltipRef.current = tooltip;
    }

    zoomGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.step))
      .attr("cy", d => y(d.hamiltonian))
      .attr("r", 2)
      .attr("fill", "white")
      .attr("stroke", "black")
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 3).attr("fill", "orange");
        tooltip.innerHTML = `Step: ${d.step}<br>Hamiltonian: ${d.hamiltonian.toFixed(2)}`;
        tooltip.style.opacity = 1;
      })
      .on("mousemove", function (event) {
        tooltip.style.left = event.pageX + 1 + "px";
        tooltip.style.top = event.pageY + 1 + "px";
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 2).attr("fill", "white");
        tooltip.style.opacity = 0;
      })
      .on("click", function (event, d) {
        SetSelectedMap(prev => {
          const newSet = new Set(prev);
          newSet.add(d.step);
          return [...newSet].sort((a, b) => a - b);
        });
      });

    const zoom = d3.zoom()
      .scaleExtent([0.5, 10000])
      .translateExtent([[x(-200), margin.top], [width - margin.right, height - margin.bottom]])
      .on("zoom", zoomed);

    svg.call(zoom);



    const brush = d3.brush()
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
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
      });

    svg.append("g")
      .attr("class", "brush")
      .call(brush);

    if (!isSelectMode) {
      svg.select(".brush").style("display", "none");
    } else {
      svg.select(".brush").style("display", null);
    }

    const resetX = width - margin.right - 20;
    const resetY = margin.top + 20;

    svg.append("circle")
      .attr("cx", resetX)
      .attr("cy", resetY)
      .attr("r", 15)
      .attr("fill", "#eee")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", () => svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity));

    svg.append("image")
      .attr("x", resetX-10)
      .attr("y", resetY-10)
      .attr("width", 20)
      .attr("height", 20)
      .attr("pointer-events", "none")
      .attr("href", Reset)
      .style("background-color", "transparent");

    const downloadX = resetX - 80;
    const downloadY = resetY;

    svg.append("circle")
      .attr("cx", downloadX)
      .attr("cy", downloadY)
      .attr("r", 15)
      .attr("fill", "#eee")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", downloadPNG);

    svg.append("image")
      .attr("x", downloadX - 10)
      .attr("y", downloadY - 10)
      .attr("width", 20)
      .attr("height", 20)
      .attr("pointer-events", "none")
      .attr("href", Download);
    const toggleX = resetX - 40;

    svg.append("circle")
      .attr("cx", toggleX)
      .attr("cy", resetY)
      .attr("r", 15)
      .attr("fill", "#eee")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", () => setIsSelectMode(prev => !prev));

    svg.append("image")
      .attr("x", toggleX - 10)
      .attr("y", resetY - 10)
      .attr("width", 20)
      .attr("height", 20)
      .attr("pointer-events", "none")
      .attr("href", isSelectMode ? Click : Select)
      .append("title")
      .text("Selection Mode");

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, [data, SetSelectedMap, isSelectMode]);

  return (
    <div ref={containerRef} style={{ width: "50%", height: '500px'}}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%"}} />
    </div>
  );
}
