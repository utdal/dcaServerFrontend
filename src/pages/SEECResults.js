import * as d3 from "d3";
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import { Link } from 'react-router-dom';
import './SEECResults.css';
import {fileReader} from '../functions/fileReader'
import SEECTable from "../components/SEECTable";
import CompleteGraph from '../components/CompleteGraph';
import SelectedGraph from '../components/SelectedGraph';
import {
    Button,

    Paper
} from "@mui/material";


const SEECResults = () => {
    const [selectedMap, SetSelectedMap] = useState([]);
    const [hamiltonians, setHamiltonians] = useState([]); 
    const [aminoacids, setAminoacids] = useState([]);
    const [steps, setSteps] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(steps.map((step, i) => ({
            step,
            hamiltonian: hamiltonians[i],
        })));
    }, [steps, hamiltonians]);
    useEffect(() => {
    async function fetchAndParse() {
        try {
        const response = await fetch('precalculated-outputs.json');
        const text = await response.text();
        const parsed = fileReader(text);
        setHamiltonians(parsed[0].hamiltonians);
        setAminoacids(parsed[0].aminoacids);
        setSteps(parsed[0].steps);
        } catch (error) {
        console.error('Failed to fetch or parse file:', error);
        }

    }
    fetchAndParse();
    }, []);

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