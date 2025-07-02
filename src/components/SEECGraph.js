import { useState, useMemo, useEffect} from "react";


import Plot from "react-plotly.js";


export default function SEECGraph({hamiltonians, steps, aminoacids, selectedMap, SetSelectedMap}) {
    
    const handleSelection = (e) => {
        if (!e || !e.points) return;

        SetSelectedMap(prev => {
        const newSet = new Set(prev);
        for (const point of e.points) {
            newSet.add(point.x);
        }
        return [...newSet].sort((a, b) => a - b);
        });

    };

    const selectAll = () => {
        SetSelectedMap(steps);
    };
    
    const selectedDataGraph = useMemo(() => {
        if (!selectedMap.length) return [];
        return [{
        x: selectedMap,
        y: selectedMap.map(p => hamiltonians[p]),
        type: "scatter",
        mode: "markers",
        marker: { color: "blue" },
        hovertemplate:'Step: %{x}'+
    '<br>Hamiltonian: %{y}<extra></extra>'
        }];
    }, [selectedMap]);
    const selectedLayoutGraph = useMemo(()=>(
        {
            width: '40%',
            height: 600,
            title: { text: "Selection" },
            uirevision: "zoomed",
            dragmode: false,             
            xaxis: { title:'Steps'},
            yaxis: { title:'Hamiltonian'},
        }), []);

    const plotData = useMemo(() => [
        {
        x: steps,
        y: hamiltonians,
        type: 'scatter',
        mode: 'markers+lines',
        marker: { color: "red" },
        hovertemplate:'Step: %{x}'+
    '<br>Hamiltonian: %{y}<extra></extra>'    
    }
    ], []);


    const plotLayout = useMemo(() => ({
        width: '50%',
        height: '600',
        uirevision: "zoomed",
        dragmode: false,             
        xaxis: {title:'Steps'},
        yaxis: {title:'Hamiltonian'},
        title: { text: 'SEEC Graph' }
    }), []);
    
    const handleReset =()=>{
        console.log(selectedMap)
        SetSelectedMap([]);
    }

    return (
        <div style={{marginTop:'40px', width:'100%', display: 'flex', flexDirection: 'column'}}>
            <div style={{display:'flex'}}>
                <div style={{flexWrap:'', marginLeft:'5px'}}>
                    <Plot data={plotData} layout={plotLayout} config={{displaylogo: false, displayModeBar:true}}useResizeHandler={true} onClick={handleSelection} onSelected={handleSelection}/> 
                    {selectedMap.length<steps.length?(
                    <button className="seec-button" onClick={selectAll}>Select All</button>
                    ):(
                    <button className="seec-unavailable">Select All</button>
                    )
                    }
                </div>
                {selectedMap.length > 0 && (
                    <div style={{flexWrap:'wrap'}}>
                    <Plot data={selectedDataGraph} layout={selectedLayoutGraph} config={{displaylogo: false, displayModeBar:true}}/>
                    <button className="seec-button" onClick={handleReset}>Reset Selection</button>
                    </div>
                )} 
            </div>

        </div>
    );
}
