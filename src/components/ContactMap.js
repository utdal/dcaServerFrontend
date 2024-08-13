import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ContactMap = ({ dca, highlightPoint = null, onPointClick = null }) => {
    const [diCount, setDiCount] = useState(dca ? dca.seq_length * 1.5 : 50);
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        if (dca !== null) {
            const pairs = dca.topDiPairs(diCount);
            setPlotData({
                x: pairs.map(p => p[0]),
                y: pairs.map(p => p[1])
            });
        } else {
            setPlotData(null);
        }
    }, [dca, diCount]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {plotData === null ? undefined : <>
                <b>Count: </b>
                <input
                    type="range"
                    min="1"
                    max={dca.ranked_di.length}
                    value={diCount}
                    onChange={e => setDiCount(e.target.value)}
                />
                <Plot
                    data={[
                        {
                            x: plotData.x,
                            y: plotData.y,
                            type: 'scatter',
                            mode: 'markers',
                            marker: {
                                color: dca.ranked_di.map((r, i) => {
                                    return (i === highlightPoint) ? 'red' : '#3B75AF';
                                })
                            },
                        },
                    ]}
                    layout={{
                        title: 'Top ' + diCount + ' DI Pairs',
                        uirevision: 'true',
                        xaxis: {
                            range: [-1, dca.seq_length],
                        },
                        yaxis: {
                            range: [-1, dca.seq_length],
                        }
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    onClick={(data) => {
                        if (onPointClick) onPointClick(data.points[0].pointIndex);
                    }}
                />
            </>}
        </div>
    );
};

export default ContactMap;
