import * as d3 from "d3";
import React from 'react';
import { useEffect, useState, useRef} from 'react';
import {createScales} from "./D3GraphTools/scales";
import { drawAxes, drawGrid } from "./D3GraphTools/axes";
import {drawLineAndAnimate} from "./D3GraphTools/line";
import {setupTooltip} from "./D3GraphTools/tooltip";
import {drawCircles} from "./D3GraphTools/points";
import {setupZoom} from "./D3GraphTools/zoom";
import {addUIIcons} from "./D3GraphTools/uiIcons";

const SelectedGraph = ({selectedMap, rawData}) => {
    const colorScale = d3.scaleLinear()
        .domain([d3.min(rawData, d => d.hamiltonian), d3.max(rawData, d => d.hamiltonian)])
        .range(["blue", "red"]);
    const data = selectedMap.map((idx, position)=>(
        rawData[idx]
    ));
    const containerRef = useRef();
    const svgRef = useRef();
    const tooltipRef = useRef();
    const zoomRef = useRef();
    const zoomTransformRef = useRef(d3.zoomIdentity);    
    useEffect(()=>{
        console.log(data);
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const margin = { top: 40, right: 30, bottom: 60, left: 90 };
    
        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();
    
        svg.attr("width", width).attr("height", height);
        const { x, y } = createScales(data, width, height, margin, -200, 200, -20, 20);
            
        drawAxes(svg, x, y, width, height, margin);

        svg.append("text")
            .attr("class", "graph-title")
            .attr("x", width / 2)
            .attr("y", margin.top / 2 + 10)
            .attr("text-anchor", "middle")
            .text("Selected Sequences");

        const gridGroup = drawGrid(svg, x, y, width, height, margin);
    
        const zoomGroup = svg.append("g")
            .attr("class", "zoom-group")
            .attr("clip-path", "url(#clip)");
        const tooltip = setupTooltip(tooltipRef);
        drawCircles(data, x, y, zoomGroup, tooltip, null, false, colorScale);
        setupZoom(svg, x, y, zoomGroup, zoomTransformRef, margin, null, zoomRef);
        addUIIcons(svg, 0, 0, width, height, margin, tooltip, zoomTransformRef, null, null, svgRef, zoomRef);
        
        
    }, [selectedMap])
    return ( 
        <div ref={containerRef} style={{ width: "100%", height: "500px", display: "flex", justifyContent: "center" }}>
            <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
        </div>
     );
}
 
export default SelectedGraph;