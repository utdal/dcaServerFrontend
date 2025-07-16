import * as d3 from "d3";
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import { Link, useParams, useLocation} from 'react-router-dom';
import './SEECResults.css';
import {fileReader} from '../functions/fileReader'
import SEECTable from "../components/SEECTable";
import CompleteGraph from '../components/CompleteGraph';
import SelectedGraph from '../components/SelectedGraph';
import {
    Button,
    Box,
    Typography, 
    CircularProgress,
    Paper
} from "@mui/material";
const API_BASE = "http://localhost:8000/api/evolution-simulations/";


const SEECResults = () => {
    const [selectedMap, SetSelectedMap] = useState([]);
    const [hamiltonians, setHamiltonians] = useState([]); 
    const [aminoacids, setAminoacids] = useState([]);
    const [steps, setSteps] = useState([]);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const resultID = query.get('resultID');
    useEffect(() => {console.log(resultID)}, [resultID]);
    useEffect(() => {
        setData(steps.map((step, i) => ({
            step,
            hamiltonian: hamiltonians[i],
        })));
    }, [steps, hamiltonians]);


    useEffect(() => {
    const poll = setInterval(async () => {
        try {
        const res = await fetch(`${API_BASE}${resultID}/`);
        if (!res.ok) throw new Error("Failed to fetch simulation results.");
        const fetchedData = await res.json();

        if (fetchedData.completed) {
            setResult(fetchedData);
            try {
            const response = await fetch(`http://localhost:8000/files/evolution_simulations/${resultID}/result.json`);
            const text = await response.text();
            const parsed = fileReader(text);
            setHamiltonians(parsed[0].hamiltonians);
            setAminoacids(parsed[0].aminoacids);
            setSteps(parsed[0].steps);
            clearInterval(poll);

            } catch (error) {
            console.error('Failed to fetch or parse file:', error);
            clearInterval(poll);
            }
        }
        } catch (e) {
        setError(e.message);
        clearInterval(poll);
        }
    }, 3000);

    return () => clearInterval(poll);
    }, [resultID]);
    useEffect(() => {
        console.log(data);
    }, [data]);

    if (error) {
        return (
            <div>             
            <TopBar>
                <li>
                <Link to="/" style={{padding: '0', margin: '0'}}>
                    Home
                </Link>
                </li>
            </TopBar>
            <Typography color="error">Error: {error}</Typography>
            </div>
    );
    }

    if (!result) {
        return(
            <div>             
                <TopBar>
                    <li>
                    <Link to="/" style={{padding: '0', margin: '0'}}>
                        Home
                    </Link>
                    </li>
                </TopBar><Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /><Typography>Waiting for results...</Typography></Box>
            </div>
            )
    }
    return ( 
        <div>
            <div style={{marginBottom:'50px'}}>
            <TopBar>
                <li>
                <Link to="/" style={{padding: '0', margin: '0'}}>
                    Home
                </Link>
                </li>
            </TopBar>
            </div>
            <div className="seec-layout">
                <div className="seec-title">
                    <h1>SEEC Results</h1>

                </div>
                <div className=''>
                    <div>
                        {steps.length > 0 && (
                            <>
                                <div style={{width:'100%', display:'flex', justifyContent:'center'}} >
                                <Paper elevation={3} sx={{width:'90%', marginTop:'30px'}}>
                                    <div style={{width:'100%'}}>
                                        <CompleteGraph SetSelectedMap={SetSelectedMap} hamiltonians={hamiltonians} steps={steps} data={data}/>
                                    </div>
                                    {selectedMap.length>0&&(
                                    <div style={{width:'100%', marginTop: '30px'}}> 
                                        <SelectedGraph rawData={data} selectedMap={selectedMap}/>
                                    </div>
                                    )}
                                    {console.log(selectedMap.length)}
                                </Paper>
                                </div>
                        
                        <div style={{marginTop:'15px'}}>                        
                            <Button color="warning" onClick={()=>{console.log(selectedMap); SetSelectedMap([])}}>
                            Reset Selection
                            </Button>                        
                        </div>
                        <div style={{justifyContent:'center', alignItems:'center', margin:'30px'}}>
                                <SEECTable hamiltonians={hamiltonians} selectedMap={selectedMap} aminoacids={aminoacids}></SEECTable>
                        </div>
                        </>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
        
     );
}
export default SEECResults;