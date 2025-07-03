import React, { useEffect, useState } from 'react';
import SEECGraph from '../components/SEECGraph';
import TopBar from '../components/TopBar';
import { Link } from 'react-router-dom';
import './SEECResults.css';
import {fileReader} from '../functions/fileReader'
import SEECTable from "../components/SEECTable";
import D3Graph from '../components/D3Graph';


const SEECResults = () => {
    const [selectedMap, SetSelectedMap] = useState([]);
    const [hamiltonians, setHamiltonians] = useState([]); 
    const [aminoacids, setAminoacids] = useState([]);
    const [steps, setSteps] = useState([]);

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
                <div className='seec-graph'>
                    <h3>
                        Evolution of Sequence
                    </h3>
                    <div>
                        {steps.length > 0 && (
                            <>
                                <D3Graph selectedMap={selectedMap} SetSelectedMap={SetSelectedMap}/>

                        {/*<SEECGraph
                            hamiltonians={hamiltonians}
                            steps={steps}
                            aminoacids={aminoacids}
                            selectedMap={selectedMap}
                            SetSelectedMap={SetSelectedMap}
                        />*/}
                        <div style={{justifyContent:'center', alignItems:'center', margin:'40px'}}>
                                <SEECTable hamiltonians={hamiltonians} selectedMap={selectedMap} aminoacids={aminoacids}></SEECTable>
                        </div>
                        </>
                        )}
                        
                    </div>


                </div>
                <div className="seec-analysis">
                    <h2>
                        Analysis
                    </h2>
                </div>
            </div>
        </div>
        
     );
}
export default SEECResults;