import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Zoom from './zoom-in.png';
import Select from './selection.png';
import Click from './hand-pointer.png';
import Reset from './reset.png';
import Download from './download.png';
import './D3Graph.css';

export default function App({ selectedMap, SetSelectedMap, hamiltonians, steps}) {
  const containerRef = useRef();
  const svgRef = useRef();
  const tooltipRef = useRef();
  const zoomTransformRef = useRef(d3.zoomIdentity);
  const [data, setData] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [renderGraph, SetRenderGraph] = useState(true);

  useEffect(() => {
      const combined = steps.map((step, i) => ({
        step,
        hamiltonian: hamiltonians[i],
      }));

      setData(combined);
    
  }, []);

  useEffect(() => {
    if (!data.length || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const margin = { top: 40, right: 30, bottom: 60, left: 90 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.append("text")
      .attr("class", "graph-title")
      .attr("x", width / 2)
      .attr("y", margin.top / 2 +10)
      .attr("text-anchor", "middle")
      .text("Evolution of Sequence");
    const gridGroup = svg.append("g").attr("class", "grid-group");

    svg.attr("width", width).attr("height", height);
    
    svg.append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .style("font-size", "50px");
    
    const x = d3.scaleLinear()
      .domain([
        Math.min(-500, d3.min(data, d => d.step)),
        d3.max(data, d => d.step) + 300
      ])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.hamiltonian) - 22,
        d3.max(data, d => d.hamiltonian) + 20
      ])
      .range([height - margin.bottom, margin.top]);
    function makeXGridlines(scale) {
      return d3.axisBottom(scale)
        .tickValues(d3.range(
          Math.ceil(scale.domain()[0] / 100) * 100,
          Math.floor(scale.domain()[1] / 100) * 100 + 1,
          100
        ));
    }

    function makeYGridlines(scale) {
      return d3.axisLeft(scale)
        .tickValues(d3.range(
          Math.ceil(scale.domain()[0] / 20) * 20,
          Math.floor(scale.domain()[1] / 20) * 20 + 1,
          20
        ));
    }

    gridGroup.append("g")
      .attr("class", "grid-x")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(makeXGridlines(x)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat("")
      );

    gridGroup.append("g")
      .attr("class", "grid-y")
      .attr("transform", `translate(${margin.left},0)`)
      .call(makeYGridlines(y)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat("")
      );
    const zoomGroup = svg.append("g")
      .attr("class", "zoom-group")
      .attr("clip-path", "url(#clip)");

    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "scale-graph");

    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "scale-graph");

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height-10)
      .attr("class", "axis")
      .text("Steps");


    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("class", "axis")
      .text("Hamiltonian");

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
    const minStep = d3.min(data, d => d.step);
    const maxStep = d3.max(data, d => d.step);
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "red");

    gradient.append("stop")
      .attr("offset", "5%")
      .attr("stop-color", "purple");

    gradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "blue");


    const path = zoomGroup.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    const totalLength = path.node().getTotalLength();
    const animationDuration = 5000;

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

    const colorScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.hamiltonian), d3.max(data, d => d.hamiltonian)])
      .range(["blue", "red"]);

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
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 2).attr("fill", "orange");
        tooltip.innerHTML = `Step: ${d.step}<br>Hamiltonian: ${d.hamiltonian.toFixed(2)}`;
        tooltip.style.opacity = 1;
      })
      .on("mousemove", function (event) {
        tooltip.style.left = event.pageX + 1 + "px";
        tooltip.style.top = event.pageY + 1 + "px";
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 1.5).attr("fill", "white");
        tooltip.style.opacity = 0;
      })
      .on("click", function (event, d) {
        SetSelectedMap(prev => {
          const newSet = new Set(prev);
          newSet.add(d.step);
          return [...newSet].sort((a, b) => a - b);
        });
      });
      if (renderGraph){
      path
        .attr("stroke-dasharray", totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .ease(d3.easeLinear)
        .duration(animationDuration+2000)
        .attr("stroke-dashoffset", 0)
        .on("end", ()=>{SetRenderGraph(false); console.log("penesote")});
      circles
        .transition()
        .delay((_, i) => (i / data.length) * animationDuration)
        .duration(200)
        .attr("r", 1.5)
        .style("opacity", 1);    
    } else{
      circles
        .attr("r", 1.5)
        .style("opacity", 1)
        .on("end", ()=>{console.log("penesin")});
    }

    function zoomed(event) {
      const transform = event.transform;
      zoomTransformRef.current = transform;

      const zx = transform.rescaleX(x);
      const zy = transform.rescaleY(y);
      xAxisGroup.call(d3.axisBottom(zx));
      yAxisGroup.call(d3.axisLeft(zy));
      gridGroup.selectAll("*").remove();


      gridGroup.append("g")
        .attr("class", "grid-x")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(makeXGridlines(zx)
          .tickSize(-(height - margin.top - margin.bottom))
          .tickFormat("")
        );

      gridGroup.append("g")
        .attr("class", "grid-y")
        .attr("transform", `translate(${margin.left},0)`)
        .call(makeYGridlines(zy)
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat("")
        );

      zoomGroup.selectAll("path")
        .attr("d", d3.line()
          .x(d => zx(d.step))
          .y(d => zy(d.hamiltonian)));

      zoomGroup.selectAll("circle")
        .attr("cx", d => zx(d.step))
        .attr("cy", d => zy(d.hamiltonian));

    }

    const zoom = d3.zoom()
      .scaleExtent([1, 10000])
      .translateExtent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .filter((event) => !isSelectMode)
      .on("zoom", zoomed)

    svg.call(zoom).call(zoom.transform, zoomTransformRef.current);
    
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
        svg.select(".brush").call(brush.move, null);

      });
    svg.append("g")
      .attr("class", "brush")
      .call(brush);

    svg.select(".brush").style("display", isSelectMode ? null : "none");

    const resetX = width - margin.right - 20;
    const resetY = margin.top + 20;

    const uiGroup = svg.append("g").attr("class", "ui-icons");

    uiGroup.append("circle")
      .attr("cx", resetX)
      .attr("cy", resetY)
      .attr("r", 10)
      .attr("fill", "transparent")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
        zoomTransformRef.current = d3.zoomIdentity;
      })
      .on("mouseover", ()=>{
        const svgRect = svg.node().getBoundingClientRect();
        tooltip.innerHTML = `Reset Zoom`;
        tooltip.style.opacity = 0.5;
        tooltip.style.left = `${window.scrollX + svgRect.left + resetX + 10}px`;
        tooltip.style.top = `${window.scrollY + svgRect.top + resetY -30}px`;
      })
      .on("mouseout", () => {
        tooltip.style.opacity = 0;
      });
    uiGroup.append("image")
      .attr("x", resetX - 7.5)
      .attr("y", resetY - 7.5)
      .attr("width", 15)
      .attr("height", 15)
      .attr("pointer-events", "none")
      .attr("href", Reset);
      
    const downloadX = resetX - 80;
    const downloadY = resetY;
    function downloadPNG() {
      const svgElement = svgRef.current;
      if (!svgElement) return;

      const uiGroup = svgElement.querySelector(".ui-icons");
      if (uiGroup) uiGroup.style.display = "none";

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

        if (uiGroup) uiGroup.style.display = null;
      };

      img.src = url;
    }
    uiGroup.append("circle")
      .attr("cx", downloadX)
      .attr("cy", downloadY)
      .attr("r", 10)
      .attr("fill", "transparent")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", downloadPNG)
      .on("mouseover", ()=>{
        const svgRect = svg.node().getBoundingClientRect();
        tooltip.innerHTML = `Download Image`;
        tooltip.style.opacity = 0.5;
        tooltip.style.left = `${window.scrollX + svgRect.left + downloadX + 10}px`;
        tooltip.style.top = `${window.scrollY + svgRect.top + downloadY -30}px`;
      })
      .on("mouseout", () => {
        tooltip.style.opacity = 0;
      });

    uiGroup.append("image")
      .attr("x", downloadX - 7.5)
      .attr("y", downloadY - 7.5)
      .attr("width", 15)
      .attr("height", 15)
      .attr("pointer-events", "none")
      .attr("href", Download);

    const toggleX = resetX - 40;
    const toggleY = resetY;

    uiGroup.append("circle")
      .attr("cx", toggleX)
      .attr("cy", toggleY)
      .attr("r", 10)
      .attr("fill", "transparent")
      .attr("stroke", "#333")
      .style("cursor", "pointer")
      .on("click", () => setIsSelectMode(prev => !prev))
      .on("mouseover", ()=>{
        const svgRect = svg.node().getBoundingClientRect();
        tooltip.innerHTML = isSelectMode? `Move Around` : `Select Points`;
        tooltip.style.opacity = 0.5;
        tooltip.style.left = `${window.scrollX + svgRect.left + toggleX + 10}px`;
        tooltip.style.top = `${window.scrollY + svgRect.top + toggleY -30}px`;
      })
      .on("mouseout", () => {
        tooltip.style.opacity = 0;
      });

    uiGroup.append("image")
      .attr("x", toggleX - 7.5)
      .attr("y", toggleY - 7.5)
      .attr("width", 15)
      .attr("height", 15)
      .attr("pointer-events", "none")
      .attr("href", isSelectMode ? Click : Select);

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, [data, isSelectMode, renderGraph]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: '500px', display:'flex', justifyContent:"center"}}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%"}} />
    </div>
  );
}
