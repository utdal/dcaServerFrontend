import React, { useState, useRef } from 'react';
import HomeButton from '../components/HomeButton';
import { generateMsa, computeDca, MSA, mapResidues, generateContacts, uploadMsa, uploadPDB } from '../backend/api';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import MSAInput from '../components/MSAInput';
import PDBInput from '../components/PDBInput';
import MFDCASettings from '../components/MFDCASettings';
import { TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import PDBSettings from '../components/PDBSettings';


const CoevolvingPairs = () => {
  const defaultTheta = '0.2'; //Cast to numbers ar submit
  const defaultMaxGaps = 20;
  const [selectedFileTypes, setSelectedFileTypes] = useState({ MSA: false, Seed: true }); // Use object to track file types
  const [selectedPDBTypes, setSelectedPDBTypes] = useState({ PDB: false, CIF: true });
  const [inputMSA, setInputMSA] = useState('');
  const [inputFile, setInputFile] = useState(null);
  const [inputPDBID, setInputPDBID] = useState('');
  const [inputPDBFile, setInputPDBFile] = useState(null);
  const [chain1, setChain1] = useState('');
  const [chain2, setChain2] = useState('');
  const [isAuthChain, setIsAuthChain] = useState(true);
  const [isOffAuthChain, setIsOffAuthChain] = useState();
  const [maxContGaps, setMaxContGaps] = useState(defaultMaxGaps);
  const [ECutoff, setECutoff] = useState('');
  const [distThresh, setDistThresh] = useState('8')
  const [caOnly, setCaOnly] = useState(false)
  const [theta, setTheta] = useState(defaultTheta);
  const [analysisMethod, setAnalysisMethod] = useState('mfDCA');

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
    if (selectedFileTypes.Seed) setInputMSA(event.target.value);
    else setInputFile(event.target.files[0]);
  };

  const handleInputPDBChange = (event) => {
    const pdbFile = event.target.files ? event.target.files[0] : null;
    if (pdbFile) {
      setInputPDBFile(event.target.files[0]);
      setInputPDBID('');
    }
    else{
      setInputPDBID(event.target.value);
      setInputPDBFile(null);
    }
  };

  const handleChain1Change = (event) => {
    setChain1(event.target.value);
  };

  const handleChain2Change = (event) => {
    setChain2(event.target.value);
  };

  const handleIsAuthChainChange = (event) => {
    setIsAuthChain(event.target.checked);
  };

  const handleIsOffAuthChainChange = (event) => {
    setIsOffAuthChain(event.target.checked);
  };

  const handleECutoffChange = (event) => {
    if (!isNaN(event.target.value) || event.target.value === '' || event.target.value === '-') {
      setECutoff(event.target.value);
    }
  };

  const handleThetaChange = (event) => {
    setTheta(event.target.value);
  }

  const handleMaxContGapsChange = (event) => {
    if (((!isNaN(event.target.value)) || event.target.value === '')) {
      setMaxContGaps(event.target.value);
    }
  };

  const handleDistThreshChange = (event) => {
    if (!isNaN(event.target.value) || event.target.value === '' || event.target.value === '-') {
      setDistThresh(event.target.value);
    }
  };

  const handleCaOnlyChange = (event) => {
    setCaOnly(event.target.checked);
  };

  const handleAnalysisMethodChange = (event) => {
    setAnalysisMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can handle the submission logic, such as sending data to an API
    // console.log("Submitted data:", { inputMSA, selectedFileTypes });
    // console.log("Submitted data:", { inputPDBID, selectedPDBTypes });
    // console.log("CA ONLY: " + caOnly);
    // console.log("THETA: " + theta);
    // console.log("THRESHOLD: " + distThresh);
    // console.log("E: " + ECutoff)
    // console.log("Max Gaps: " + maxContGaps)

    // console.log(chain1);
    // console.log(chain2);
    // console.log(isAuth);
    // Reset fields or provide feedback as needed
    //const msaTask = await generateMsa(inputValue);
    //const dcaTask = await computeDca(msaTask.id);

    //No error checking yet...

    let msaId = null;
    if (selectedFileTypes.Seed) {
      const msaTask = await generateMsa({
        seed: inputMSA,
        ECutoff: Number(ECutoff) || undefined,
        maxGaps: Number(maxContGaps) || undefined
      });
      msaId = msaTask.id;
    } else {
      const msa = await uploadMsa({ msa: inputFile });
      msaId = msa.id;
    }

    let pdbId = null;
    if (inputPDBFile) {
      if (selectedPDBTypes.CIF === true) {
        const pdb = await uploadPDB({ pdbFile: inputPDBFile, pdbFileType: "cif"});
        pdbId = pdb.id;
      }
      else {
        const pdb = await uploadPDB({ pdbFile: inputPDBFile, pdbFileType: "pdb"});
        pdbId = pdb.id;
      }
    }
    else {
      pdbId = inputPDBID;
    }

    const dcaTask = await computeDca({
      msaId: msaId,
      theta: Number(theta)
    });

    const residuesTask = await mapResidues({
      dcaId: dcaTask.id,
      pdbId: pdbId,
      chain1: chain1,
      chain2: chain2 || chain1,
      authChainIdSupplied: isAuthChain,
    });

    const contactsTask = await generateContacts({
      pdbId: pdbId,
      caOnly: caOnly,
      distThresh: Number(distThresh),
      isCIF: selectedPDBTypes.CIF
    });

    const url = '/coevolving-pairs-results/?structure_contacts=' + contactsTask.id + '&mapped_di=' + residuesTask.id;
    window.open(url, '_blank');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#282c34', p: '20px', color: 'white', width: '100%' }}>
        <HomeButton />
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#d0d8e8' }}>
          <form onSubmit={handleSubmit}>
            <MSAInput
              inputType={selectedFileTypes.Seed ? 'Seed' : 'MSA'}
              inputMSA={selectedFileTypes.Seed ? inputMSA : inputFile}
              handleInputMSAChange={handleInputMSAChange}
              handleFileTypeChange={handleFileTypeChange}
            />
            <PDBInput
              inputPDBID={inputPDBID}
              inputPDBFile={inputPDBFile}
              handleInputPDBChange={handleInputPDBChange}
              handlePDBChange={handlePDBChange}
            />
            <Box sx={{ width: '100%', p: 2 }}>
              <h3>Coevolutionary Analysis Settings</h3>
              <FormControl sx={{ width: '25%' }}>
                <InputLabel id="coevolutionary-analysis-method">Coevolutionary Analysis Method</InputLabel>
                <Select
                  labelId="coevolutionary-analysis-method"
                  id="analysis-method-select"
                  value={analysisMethod}
                  label="Coevolutionary Analysis Method"
                  variant='filled'
                  margin='200'
                  onChange={handleAnalysisMethodChange}
                >
                  <MenuItem value={'mfDCA'}>mean-field DCA</MenuItem>
                  <MenuItem value={''}>More to Come!</MenuItem>
                </Select>
              </FormControl>

              {analysisMethod === 'mfDCA' ?
                <MFDCASettings ECutoff={ECutoff} handleECutoffChange={handleECutoffChange} defaultTheta={defaultTheta} theta={theta} handleThetaChange={handleThetaChange} />
                :
                <></>
              }

              {selectedFileTypes.Seed ? <>
                <h3> MSA Generation Settings </h3>
                <p>Max Number of Continuous Gaps (as percentage of MSA length):</p>
                <Box sx={{ width: "20%", margin: 'auto' }}>
                  <Slider
                    defaultValue={defaultMaxGaps}
                    value={maxContGaps}
                    onChange={handleMaxContGapsChange}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={100}
                  />
                </Box>
              </> : undefined}


              <h3>PDB Settings</h3>
              <PDBSettings
                distThresh={distThresh} handleDistThreshChange={handleDistThreshChange} caOnly={caOnly} handleCaOnlyChange={handleCaOnlyChange}
                chain1={chain1} handleChain1Change={handleChain1Change} chain2={chain2} handleChain2Change={handleChain2Change}
                isAuthChain={isAuthChain} handleIsAuthChainChange={handleIsAuthChainChange} selectedPDBTypes={selectedPDBTypes} />
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