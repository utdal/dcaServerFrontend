import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export const CirclePlot = ({ mappedDi, chain, selectedDI}) => {
    let nodes;
    const radius1 = 1.5;
    const radius2 = 1.7;
    let edges;
    if (selectedDI) {
        edges = selectedDI.map(i => mappedDi.mapped_di[i]);
        const residues = edges.flat();
        nodes = Math.max(...residues) + 1;
    } else {
        edges = mappedDi.mapped_di;
        nodes = 100;
    }
    

    return (
        <div>
            
            <ChordDiagram nodes={nodes} edges={edges} radius1={radius1} radius2={radius2} />
        </div>
    );
};

export const ChordDiagram = ({ nodes, edges, radius1, radius2 }) => {
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        const offset = Math.PI * (0.5 - 1 / nodes);
        const theta = Array.from({ length: nodes }, (_, i) => -2 * Math.PI * i / nodes + offset);

        const x1 = theta.map(t => Math.cos(t) * radius1);
        const y1 = theta.map(t => Math.sin(t) * radius1);

        const x2 = theta.map(t => Math.cos(t) * radius2);
        const y2 = theta.map(t => Math.sin(t) * radius2);

        const labelInterval = Math.ceil(nodes/5); 
        const labeledNodes = Array.from({ length: nodes }, (_, i) => (i % labelInterval === 0) ? i : null).filter(i => i !== null);

        const nodePlot1 = {
            type: 'scatter',
            mode: 'markers',
            x: x1,
            y: y1,
            marker: { size: 6, color: 'black' },
            showlegend: false,
            hoverinfo: 'text',
            text: Array.from({ length: nodes }, (_, i) => `Residue ${i+1}`),
        };

        const nodePlot2 = {
            type: 'scatter',
            mode: 'text',
            x: x2,
            y: y2,
            text: Array.from({ length: nodes }, (_, i) => labeledNodes.includes(i) ? `${i+1}` : ''),
            textposition: 'middle center',
            showlegend: false,
            hoverinfo: 'none', 
            textfont: {
                size: 12,
                color: 'black',
            },
        };

        const curves = edges.map(([i, j, w]) => {
            const arcPoints = generateArcPoints(x1[i], y1[i], x1[j], y1[j], 8);
            return {
                type: 'scatter',
                mode: 'lines',
                x: arcPoints.x,
                y: arcPoints.y,
                line: { color: '#3B75AF', width: w * w * 30, shape: 'spline' },
                showlegend: false,
                hoverinfo: 'none',
            };
        });

        // Combine both circles and edges in a single plot data
        setPlotData([...curves, nodePlot1, nodePlot2]);
    }, [nodes, edges, radius1, radius2]);

    // Function to generate points on an arc
    function generateArcPoints(x1, y1, x2, y2, n) {
        const mX = (x1 + x2) / 2;
        const mY = (y1 + y2) / 2;

        // Distance^2 from a point to mid point
        const a = ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) / 4;
        const b = mX * mX + mY * mY; // Distance^2 from midpoint to center

        // Handle opposite points or same point - a straight line
        if (a < 0.0001 || b < 0.0001) return { x: [x1, x2], y: [y1, y2] }

        // Circle center, don't ask me how
        const cX = (a * a / (b * b) + 1) * mX;
        const cY = (a * a / (b * b) + 1) * mY;

        // Angles of points
        let t1 = Math.atan2(y1 - cY, x1 - cX);
        let t2 = Math.atan2(y2 - cY, x2 - cX);

        // Normalize and make inner arc
        if (t2 < t1) [t2, t1] = [t1, t2];
        if (t2 - t1 > Math.PI) t1 += 2 * Math.PI;

        // Generate points
        const r = Math.sqrt((cX - x1) * (cX - x1) + (cY - y1) * (cY - y1));
        const theta = Array.from({ length: n + 1 }, (_, i) => (t2 - t1) * i / n + t1);
        const x = theta.map(t => r * Math.cos(t) + cX);
        const y = theta.map(t => r * Math.sin(t) + cY);

        return { x, y };
    }

    return (
        <Plot
            data={plotData}
            layout={{
                showlegend: false,
                uirevision: 'true',
                xaxis: {
                    range: [-2, 2], 
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false,
                    linewidth: 1,
                    mirror: true,
                },
                yaxis: {
                    range: [-2, 2], 
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false,
                    linewidth: 1,
                    mirror: true,
                    scaleanchor: 'x',
                    scaleratio: 1,
                },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
        />
    );
};
