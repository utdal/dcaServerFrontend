import React, { useState, useRef } from 'react';
import HomeButton from '../components/HomeButton';
import { generateMsa, computeDca, MSA } from '../backend/api';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import MSAInput from '../components/MSAInput';
import PDBInput from '../components/PDBInput';
import { TextField } from '@mui/material';



const CoevolvingPairs = () => {
  
  const [selectedFileTypes, setSelectedFileTypes] = useState({ MSA: false, Seed: true }); // Use object to track file types
  const [selectedPDBTypes, setSelectedPDBTypes] = useState({ PDB: false, CIF: true });
  const [inputMSA, setInputMSA] = useState('');
  const [inputPDBID, setInputPDBID] = useState('');
  const [maxContGaps, setMaxContGaps] = useState('');
  const [ECutoff, setECutoff] = useState('');
  

  const handleFileTypeChange = (type) => {
    setSelectedFileTypes((prev) => ({
      ...prev,
      MSA: type === 'MSA' ? true : false,
      Seed: type === 'Seed' ? true : false,
    }));
  };
  const handlePDBChange = (type) => {
    setSelectedPDBTypes((prev) => ({
      ...prev,
      PDB: type === 'PDB' ? true : false,
      CIF: type === 'CIF' ? true : false,
    }));
  };

  const handleInputMSAChange = (event) => {
    setInputMSA(event.target.value);
  };

  const handleInputPDBChange = (event) => {
    setInputPDBID(event.target.value);
  };

  const handleECutoffChange = (event) => {
    if (!isNaN(event.target.value) || event.target.value === '' || event.target.value === '-')
    {
      setECutoff(event.target.value);
    }
  };

  const handleMaxContGapsChange = (event) => {
    if (((!isNaN(event.target.value)) || event.target.value === '') && !event.target.value.includes("."))
    {
      setMaxContGaps(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission logic, such as sending data to an API
    console.log("Submitted data:", { inputMSA, selectedFileTypes });
    console.log("Submitted data:", { inputPDBID, selectedPDBTypes });
    // Reset fields or provide feedback as needed
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#282c34', p: '20px', color: 'white', width: '100%'}}>
        <HomeButton />
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#d0d8e8', height: '100vh'}}>
          <form onSubmit={handleSubmit}>
            <MSAInput 
              inputMSA={inputMSA} 
              handleInputMSAChange={handleInputMSAChange} 
              handleFileTypeChange={handleFileTypeChange}
            />
            <PDBInput 
              inputPDBID={inputPDBID} 
              handleInputPDBChange={handleInputPDBChange} 
              handlePDBChange={handlePDBChange}
            />
            <Box sx={{ width: '100%', p: 2}}>
                <h3>Settings</h3>
                <TextField label="E-Value Cutoff"
                  value={ECutoff}
                  onChange={handleECutoffChange}>
                </TextField>
                <TextField
                  label = "Max Number of Continuous Gaps"
                  value={maxContGaps}
                  onChange={handleMaxContGapsChange}>
                </TextField>
            </Box>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
            </Button>
          </form>
          {/* I'll add in a settings pane. Filtering the MSA, MSAutils whatever settings are needed., Bit Score */}
        </Box>
          
      </Container>
    </React.Fragment>
  );
}



export default CoevolvingPairs;