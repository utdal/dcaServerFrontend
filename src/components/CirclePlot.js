import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export const CirclePlot = ({dca}) => {
    const [diCount, setDiCount] = useState(dca ? Math.floor(dca.seq_length * 1.5) : 50);
    const nodes = diCount;

    let edges = [];
    useEffect(() => {
        if (dca !== null) {
            const pairs = dca.topDiPairs(diCount);
            for (let i = 0; i < nodes; i++) {
                edges.push(pairs[i][0], pairs[i][1])
            }
        }
    }, [dca, diCount]);

    return (
        <div style={{ }}>
            <ChordDiagram nodes={nodes} edges={edges} />
        </div>
    );
};

export const ChordDiagram = ({ nodes, edges }) => {
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        const offset = Math.PI * (0.5 - 1 / nodes);
        const theta = Array.from({ length: nodes }, (_, i) => -2 * Math.PI * i / nodes + offset);

        // Define the nodes (points on the circle)
        const x = theta.map(t => Math.cos(t));
        const y = theta.map(t => Math.sin(t));

        // Plot the nodes
        const nodePlot = {
            type: 'scatter',
            mode: 'markers+lines',
            x: x,
            y: y,
            text: theta.map((_, i) => 'Residue ' + (i + 1)),
            marker: { size: 6, color: 'black' },
            showlegend: false,
            hoverinfo: 'text'
        };

        const curves = edges.map(([i, j]) => {
            const arcPoints = generateArcPoints(x[i], y[i], x[j], y[j], 8);
            return {
                type: 'scatter',
                mode: 'lines',
                x: arcPoints.x,
                y: arcPoints.y,
                line: { color: '#3B75AF', width: 2, shape: 'spline' },
                showlegend: false,
                hoverinfo: 'none'
            };
        });

        // Combine nodes and arcs in a single layout
        setPlotData([...curves, nodePlot]);
    }, [nodes, edges]);

    // Function to generate points on an arc
    // Arc connects x1, y1 and x2, y2 and is tangent to a radius at both points
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
                    range: [-1.1, 1.1],
                    showgrid: false,
                    zeroline: false,
                    showticklabels: false,
                    linewidth: 1,
                    mirror: true,
                },
                yaxis: {
                    range: [-1.1, 1.1],
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
