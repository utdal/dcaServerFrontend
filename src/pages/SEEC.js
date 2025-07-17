import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { startEvolutionSimulation } from '../backend/api';
import{
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import MSAInput from '../components/MSAInput';
import TopBar from '../components/TopBar';
import SequenceInput from '../components/sequence-input';
import { Link } from 'react-router-dom';
import './SEEC.css'
import TemperatureInput from '../components/TemperatureInput';
import StepsInput from '../components/StepsInput';

const SEEC = () => {
    const navigate = useNavigate();
    const [msaFile, setMsaFile] = useState(null);
    const [inputType, setInputType] = useState('AminoAcid');
    const [sequence, setSequence] = useState('');
    const [steps, setSteps] = useState(0);
    const allowed_letters= new Set(['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']);
    const [temperature, setTemperature] = useState(1.0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setMsaFile(file);
      console.log("File uploaded:", file);
    };
    
    useEffect(()=>{
      console.log(steps);
    }, [steps]);
    
    useEffect(()=>{
      
    },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!msaFile) {
      setError("Please select an MSA file.");
      return;
    }
    if (!sequence.trim()) {
      setError("Please enter nucleotide sequence.");
      return;
    }

    try {
      const { simulationId } = await startEvolutionSimulation({
        msaFile: msaFile,
        ntSequence: sequence,
        steps: steps,
        temperature: temperature,
      });

      console.log(simulationId)
      console.log("Simulation ID", simulationId);
      navigate(`/seec-results/?resultID=${simulationId}`);
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };


  useEffect(() => {console.log(result)},[result])

    return ( 
        <Box>
        <TopBar>
            <li>
                <a href='https://morcoslaboratory.org/'>
                Morcos Lab
                </a>
            </li>
            <li>
                <Link to='/'>
                Home
                </Link>
            </li>
        </TopBar>
            <div style={{marginTop:'50px'}}>
              <Tooltip title='Simulates protein evolution using inferred epistasis from natural protein families.'>
                <Button variant='text'
                sx={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  minWidth: 0,
                  textTransform: 'none',
                  color: 'inherit',
                  boxShadow: 'none',
                  fontSize: '30px',
                  fontWeight: 'bold'
                }}
                >
                  Sequence evolution with epistatic contributions
                </Button>
              </Tooltip>
            </div>
            <Box>
              <form onSubmit={handleSubmit} >
                <Box className="container-seec">
                  <div className="cs-seq-input">
                    <Box style={{ width: '40%' }}>
                      <SequenceInput inputType={inputType} setInputType={setInputType} sequence={sequence} setSequence={setSequence}/>
                    </Box>
                  </div>
                  <div className='msa-description'>
                    <h5>Upload MSA in FASTA format</h5>
                  </div>
                  <div className="cs-msa">
                    <div>
                    <Button 
                      variant="contained" 
                      component="label" 
                      onChange={handleFileChange}
                      sx={{
                        backgroundColor:'transparent', 
                        color:'#1f1f1f',
                        '&:hover': {
                          backgroundColor: 'transparent', 
                          boxShadow: '0px 0px 10px rgba(0,0,0,0.3)'}
                      }}
                    >
                      Upload MSA
                      <input
                        type="file"
                        hidden
                      />
                    </Button>
                    </div>
                    <div>
                    {msaFile && (
                      <Typography fontStyle='italic' variant="body2" sx={{ marginTop: 1, color: '#1f1f1f86' }}>
                        Selected file: {msaFile.name}
                      </Typography>
                    )}
                    </div>
                  </div>
                  
                  <div className='temp-description'>
                    <h5>Temperature for evolving the sequence</h5>
                  </div>
                  <div className="cs-temp-input">
                    <TemperatureInput temperature={temperature} SetTemperature={setTemperature}/>
                  </div>
                  <div className='steps-description'>
                    <h5>Number of Evolutionary Steps</h5>
                  </div>
                  <div className="cs-steps">
                    <StepsInput steps={steps} SetSteps={setSteps}/>
                  </div>
                </Box>
                <Box sx={{display:'flex', justifyContent:'flex-end', m:'50px'}}>
                <Button type="submit" variant="contained" color="warning">
                  Submit
                </Button>
                </Box>
              </form>
            </Box>


        </Box>
    );
}
 
export default SEEC;