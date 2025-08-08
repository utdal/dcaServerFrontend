import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { startEvolutionSimulation, generateMsa, uploadMsa } from '../backend/api';
import{
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import MSAInput from '../components/SEECMsaInput';
import TopBar from '../components/TopBar';
import SequenceInput from '../components/sequence-input';
import { Link } from 'react-router-dom';
import './SEEC.css'
import TemperatureInput from '../components/TemperatureInput';
import StepsInput from '../components/StepsInput';
import {aaToNt} from '../functions/aaToNt';
import {ntToAa} from '../functions/ntToAA';
const SEEC = () => {
    const navigate = useNavigate();
    const defaultMaxGaps = 20;
    const defaultECutoff = 0.2;
    const [inputType, setInputType] = useState('AminoAcid');
    const [inputMSA, setInputMSA] = useState('');
    const [inputFile, setInputFile] = useState(null);
    const [aaSequence, setAaSequence] = useState('');
    const [selectedFileTypes, setSelectedFileTypes] = useState({ MSA: false, Seed: true });
    const [ECutoff, setECutoff] = useState(defaultECutoff);
    const [maxContGaps, setMaxContGaps] = useState(defaultMaxGaps);

    const [sequence, setSequence] = useState('');
    const [steps, setSteps] = useState(0);
    const allowed_letters= new Set(['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']);
    const [temperature, setTemperature] = useState(1.0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [ntSequence, setNtSequence] = useState('');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    useEffect(()=>{
      const cleaned = sequence.replace(/\s+/g, '');
      if(inputType === 'AminoAcid'){
        const [nt_seq, aa_filtered] = aaToNt(cleaned);
        setNtSequence(nt_seq);
        const sequenceElement = document.getElementById('sequence');
        sequenceElement.textContent = aa_filtered;
        setAaSequence(aa_filtered);
      }
      else{
        const filtered = cleaned.replace(/[^GgCcTtAa-]/g, '');
        const sequenceElement = document.getElementById('sequence');
        sequenceElement.textContent = filtered;
        setNtSequence(filtered);
        setAaSequence(ntToAa(filtered)[0]);
      }
    },[inputType, sequence]);

    useEffect(()=>{
      console.log(ntSequence);
    },[ntSequence]);


  const handleFileTypeChange = (type) => {
    setSelectedFileTypes((prev) => ({
      ...prev,
      MSA: type === 'MSA' ? true : false,
      Seed: type === 'Seed' ? true : false,
    }));
  };
  const handleInputMSAChange = (event) => {
    if (selectedFileTypes.MSA){
      setInputFile(event.target.files[0]);
      
    }
  };

  useEffect(()=>{
    if (selectedFileTypes.Seed===true){
      setInputMSA(aaSequence);
      console.log(aaSequence);
    }
  },[aaSequence, selectedFileTypes]);
  const handleMaxContGapsChange = (event) => {
    if (((!isNaN(event.target.value)) || event.target.value === '')) {
      setMaxContGaps(event.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);


    if (!sequence.trim()) {
      setError("Please enter nucleotide sequence.");
      return;
    }

    try {
      let msaId = null;
      if (selectedFileTypes.Seed) {
        const msaTask = await generateMsa({
          seed: inputMSA,
          ECutoff: Number(ECutoff) || undefined,
          maxGaps: Number(maxContGaps) || undefined
        });
        msaId = msaTask.id;
        
        if (localStorage.getItem('tasks')){
          let tasks = JSON.parse(localStorage.getItem('tasks'));
          tasks.push({id: msaTask.id, isSimulation: false});
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        else{
          localStorage.setItem('tasks', JSON.stringify([{id: msaTask.id, isSimulation: false}]));
        }
      } else {
        if (!inputFile){
          setError("Please upload an MSA file.");
          return;
        }
        const msa = await uploadMsa({ msa: inputFile });
        msaId = msa.id;
      }
      console.log("MSA ID", msaId);
      const { simulationId } = await startEvolutionSimulation({
        msa_id: msaId,
        ntSequence: ntSequence,
        steps: steps,
        temperature: temperature,
      });

      console.log(simulationId)
      console.log("Simulation ID", simulationId);
      if (localStorage.getItem('tasks')){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push({id: simulationId, isSimulation: true});
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
      else{
        localStorage.setItem('tasks', JSON.stringify([{id: simulationId, isSimulation: true}]));
      }
      navigate(`/seec-results/?resultID=${simulationId}`);
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };



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
                      <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                        <p id='sequence' style={{
                          color: prefersDarkScheme.matches ? '#fdf7f372' : '#1f1f1f72',
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-all',
                        }}></p>
                      </Box>
                    </Box>
                  </div>
                  <div className='msa-description'>
                    <h5>Upload MSA in FASTA format</h5>
                  </div>
                  <div className="cs-msa">
                    <div style={{width: '50%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <MSAInput
                      inputType={selectedFileTypes.Seed ? 'Seed' : 'MSA'}
                      handleInputMSAChange={handleInputMSAChange}
                      handleFileTypeChange={handleFileTypeChange}
                    />
                    </div>
                    <div>
                    {inputFile && (
                      <Typography fontStyle='italic' variant="body2" sx={{ marginTop: 1, color: prefersDarkScheme.matches ? '#fdf7f372' : '#1f1f1f86' }}>
                        Selected file: {inputFile.name}
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