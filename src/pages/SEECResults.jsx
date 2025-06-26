import React from 'react';
import SEECGraph from '../components/SEECGraph';
import TopBar from '../components/TopBar';
import { Link } from 'react-router-dom';


const SEECResults = () => {
    return ( 
        <div>
            
            <TopBar>
                <li>
                <Link to="/" style={{padding: '0', margin: '0'}}>
                    Home
                </Link>
                </li>
            </TopBar>
            <div className="seec-layout">
                <div className='seec-graph'>
                    <h2>
                        Evolution of Sequence
                    </h2>
                    <SEECGraph/>
                </div>
                <div className="hmm-graph">
                    <h1>HMM graph</h1>
                </div>
                <div className="seec-analysis">
                    <h1>
                        Analaysis
                    </h1>
                </div>
            </div>
        </div>
     );
} 

export default SEECResults;