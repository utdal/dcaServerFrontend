import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ContactMap = ({ chain, mappedDi, structureContacts }) => {
    const [diCount, setDiCount] = useState(50);

    let plotData = [];
    let maxDiCount = 100;

    const x = structureContacts.contacts[chain + '_contacts'].map(p => p[0]);
    const y = structureContacts.contacts[chain + '_contacts'].map(p => p[1]);
    plotData.push({
        x: [...x, ...y],
        y: [...y, ...x],
        type: 'scatter',
        mode: 'markers',
        name: 'Structural Contacts',
        marker: {
            size: 3,
            color: '#969696'
        },
    });

    const topPairs = mappedDi.topDiPairs(diCount);
    plotData.push({
        x: topPairs.map(p => p[0]),
        y: topPairs.map(p => p[1]),
        type: 'scatter',
        mode: 'markers',
        name: 'DI Pairs',
        text: topPairs.map(p => p[2]),
        marker: {
            size: 3,
            color: topPairs.map((r, i) => {
                return '#3788d5';
            })
        },
    });

    maxDiCount = mappedDi.mapped_di.length;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{
                fontWeight: 'bold'
            }}>DI Count:</div>
            <input
                type="range"
                min="1"
                max={maxDiCount}
                value={diCount}
                onChange={e => setDiCount(e.target.value)}
                style={{
                    width: "80%",
                    height: "8px",
                    borderRadius: "5px",
                    background: "linear-gradient(90deg, rgb(187, 222, 251) 0%, rgb(13, 71, 161) 100%)",
                    appearance: "none",
                    outline: "none",
                    transition: "background 0.3s",
                }}
            />
            <Plot
                data={plotData}
                layout={{
                    uirevision: 'true',
                    xaxis: {
                        linewidth: 1,
                        mirror: true,
                        zeroline: false
                    },
                    yaxis: {
                        linewidth: 1,
                        mirror: true,
                        zeroline: false,
                        autorange: 'reversed'
                    },
                    legend: {
                        orientation: "h"
                    },
                    margin: {
                        l: 35,
                        r: 5,
                        b: 25,
                        t: 15,
                        pad: 3
                      },
                }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                onClick={(data) => {
                    // if (onPointClick) onPointClick(data.points[0].pointIndex);
                }}
            />
        </div>
    );
};

export default ContactMap;
