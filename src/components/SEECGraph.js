import { useState, useMemo, useEffect} from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";


import Plot from "react-plotly.js";


const hammiltonians = Array.from({length:100},(_,i)=>Math.sin(i/10 ));
const steps = Array.from({length:100}, (_, i)=>(i));
const ids = Array.from({length:100}, (_,i)=>`sequence ${i}`)
export default function SEECGraph() {
    const [selectedMap, SetSelectedMap] = useState([]);

    const handleSelection = (e) => {
        if (e && e.points){
            const points = e.points.map(point=>({id:point.customdata, x:point.x, y:point.y}));
            SetSelectedMap((prev) => {
                const merged = [...prev];
                for (const p of points) {
                const exists = merged.some(existing => existing.x === p.x && existing.y === p.y);
                if (!exists) merged.push(p);
            }
        merged.sort((a, b) => a.x - b.x);
        return merged;
      });
            console.log(plotData)
        }
    }
    const selectAll = () => {
        const allPoints = steps.map((x, i) => ({
            id: ids[i],
            x,
            y: hammiltonians[i]
        }));
        SetSelectedMap(allPoints);
    };
    const selectedDataGraph = useMemo(() => {
        if (!selectedMap.length) return [];
        return [{
        x: selectedMap.map(p => p.x),
        y: selectedMap.map(p => p.y),
        type: "scatter",
        mode: "markers",
        marker: { color: "blue" }
        }];
    }, [selectedMap]);
    const selectedLayoutGraph = useMemo(()=>(
        {
            width: 400,
            height: 400,
            title: { text: "Selection" },
            uirevision: "zoomed",
            dragmode: false,             
            xaxis: { fixedrange: true },
            yaxis: { fixedrange: true }
        }), []);

    const plotData = useMemo(() => [
        {
        x: steps,
        y: hammiltonians,
        type: 'scatter',
        mode: 'markers+lines',
        customdata: ids,
        marker: { color: "red" }
        }
    ], []);

    const plotLayout = useMemo(() => ({
        width: 500,
        height: 400,
        uirevision: "zoomed",
        dragmode: false,             
        xaxis: { fixedrange: true },
        yaxis: { fixedrange: true },
        title: { text: 'SEEC Graph' }
    }), []);
    
    const handleReset =()=>{
        console.log(selectedMap)
        SetSelectedMap([]);
    }
    const importTable =()=>{
        const headers = ["Hamiltonian", "Step", "Sequence"];
        const rows = selectedMap.map(entry => [entry.y, entry.x, entry.id]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "table_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div style={{marginTop:'40px', width:'40%', alignItems:'center'}}>
            <div style={{display:'flex'}}>
                <div style={{flexWrap:'wrap', marginLeft:'5px'}}>
                    <Plot data={plotData} layout={plotLayout} config={{displaylogo: false}}useResizeHandler={true} onClick={handleSelection} onSelected={handleSelection}/> 
                    {selectedMap.length<steps.length?(
                    <button className="seec-button" onClick={selectAll}>Select All</button>
                    ):(
                    <button className="seec-unavailable">Select All</button>
                    )
                    }
                </div>
                {selectedMap.length > 0 && (
                    <div style={{flexWrap:'wrap'}}>
                    <Plot data={selectedDataGraph} layout={selectedLayoutGraph} config={{displayModeBar: false, scrollZoom: false,}}/>
                    <button className="seec-button" onClick={handleReset}>Reset Selection</button>
                    </div>
                )} 
            </div>
            <div style={{justifyContent:'center', alignItems:'center', margin:'40px'}}>
            <Paper elevation={5} style={{maxHeight: '300px', overflow: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Hamiltonian</TableCell>
                        <TableCell>Step</TableCell>
                        <TableCell>Sequence</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            selectedMap.map((entry, idx)=>(
                                <TableRow key={idx}>
                                    <TableCell>{entry.y}</TableCell>
                                    <TableCell>{entry.x}</TableCell>
                                    <TableCell>{entry.id}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                  </Table>
            </Paper>
            {selectedMap.length>0&&(
                <button className='seec-button' onClick={importTable}>Import Table</button>)
            }
            </div>
        </div>
    );
}
