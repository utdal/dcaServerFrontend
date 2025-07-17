import React, { useState, useRef, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import { generateMsa, computeDca, MSA, mapResidues, generateContacts, uploadMsa, uploadPDB } from '../backend/api';
import MSAInput from '../components/MSAInput';
import PDBInput from '../components/PDBInput';
import MFDCASettings from '../components/MFDCASettings';
import { ThemeProvider } from '@mui/material/styles';
import UnifiedTopBar from '../components/UnifiedTopBar';
import theme from '../theme';
import{
  CssBaseline,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
  TextField,
  MenuItem,
  Slider
} from '@mui/material';
import AdvancedSettings from '../components/AdvancedSettings';
import PDBSettings from '../components/PDBSettings';
import TopBar from '../components/TopBar';
import { Link } from 'react-router-dom';


const CoevolvingPairs = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
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
  const [isAuthResidue, setIsAuthResidue] = useState(true);
  const [maxContGaps, setMaxContGaps] = useState(defaultMaxGaps);
  const [ECutoff, setECutoff] = useState('');
  const [distThresh, setDistThresh] = useState('8')
  const [caOnly, setCaOnly] = useState(false)
  const [theta, setTheta] = useState(defaultTheta);
  const [analysisMethod, setAnalysisMethod] = useState('mfDCA');
  const allowed_letters= new Set(['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']);

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
    if (selectedFileTypes.Seed){
      if ([...event.target.value.toUpperCase()].every(char => allowed_letters.has(char))) {
        setInputMSA(event.target.value.toUpperCase());
      }
    }
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

  const handleIsAuthResidueChange = (event) => {
    setIsAuthResidue(event.target.checked);
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
    console.log("MSA ID: " + msaId);

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
      msaId,
      theta: Number(theta)
    });
    console.log("DCA ID: " + dcaTask);
    const residuesTask = await mapResidues({
      dcaId: dcaTask.id,
      pdbId: pdbId,
      chain1: chain1,
      chain2: chain2 || chain1,
      authChainIdSupplied: isAuthChain,
      authResidueIdSupplied: isAuthResidue
    });

    const contactsTask = await generateContacts({
      pdbId: pdbId,
      caOnly: caOnly,
      distThresh: Number(distThresh),
      isCIF: selectedPDBTypes.CIF,
      authChainIdSupplied: isAuthChain,
      authResidueIdSupplied: isAuthResidue
    });

    const url = '/coevolving-pairs-results/?structure_contacts=' + contactsTask.id + '&mapped_di=' + residuesTask.id;
    window.open(url, '_blank');
  };
  useEffect(()=>{
    console.log(selectedFileTypes.Seed)
  }, [selectedFileTypes])
  return (
    <>
       <UnifiedTopBar />
      <ThemeProvider theme={theme}>
          <form onSubmit={handleSubmit}>
            <div style={{marginTop:'50px'}}>
              <Tooltip title='Here, a user may supply a sequence corresponding to a complete protein or a portion of that protein and identify which residue sites may be directly coupled with others.
        A Multiple Sequence Alignment provided or produced by a seed sequence that has been supplied is used as input for the coevolutionary model chosen.
        Finally, the pairs are returned, mapped to the protein structure of interest.'>
                <Button variant='text'
                  sx={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  minWidth: 0,
                  textTransform: 'none',
                  color: 'inherit',
                  boxShadow: 'none',
                  fontSize: '40px',
                  fontWeight: 'bold'
                }}
                >
                  Coevolving Pairs
                </Button>
              </Tooltip>
            </div>
            <div style={{marginTop:"40px"}}>
            <MSAInput
              inputType={selectedFileTypes.Seed ? 'Seed' : 'MSA'}
              inputMSA={selectedFileTypes.Seed ? inputMSA : inputFile}
              handleInputMSAChange={handleInputMSAChange}
              handleFileTypeChange={handleFileTypeChange}
            />
            </div>
            <div style={{marginTop:'40px'}}>
            <PDBInput
              inputPDBID={inputPDBID}
              inputPDBFile={inputPDBFile}
              handleInputPDBChange={handleInputPDBChange}
              handlePDBChange={handlePDBChange}
            />
            </div>
            <div>
              <h3 style={{marginTop:'40px'}}>PDB Settings</h3>
              <PDBSettings
                distThresh={distThresh} handleDistThreshChange={handleDistThreshChange} caOnly={caOnly} handleCaOnlyChange={handleCaOnlyChange}
                chain1={chain1} handleChain1Change={handleChain1Change} chain2={chain2} handleChain2Change={handleChain2Change}
                isAuthChain={isAuthChain} handleIsAuthChainChange={handleIsAuthChainChange} isAuthResidue={isAuthResidue} handleIsAuthResidueChange={handleIsAuthResidueChange}
                selectedPDBTypes={selectedPDBTypes} />
              <AdvancedSettings
                  caSettings={
                  <>
                    <p style={{justifyContent:'center', display:'flex', color: prefersDarkScheme.matches && '#fdf7f3'}}>Coevolutionary Analysis Method</p>
                    <Box sx={{display:'flex', justifyContent:'center',}}>
                    <Select
                    labelId="coevolutionary-analysis-method"
                    id="analysis-method-select"
                    value={analysisMethod}
                    onChange={handleAnalysisMethodChange}
                    variant="filled"
                    sx={{
                      minWidth: '100px',
                      marginTop: '15px',
                      height: '48px',
                      ...(prefersDarkScheme.matches && {
                        backgroundColor: '#333',
                        color: '#fdf7f3',
                        '& .MuiSelect-icon': {
                          color: '#fdf7f3',
                        },
                      }),
                    }}
                    inputProps={{
                      sx: {
                        padding: '10px 12px',
                      }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          ...(prefersDarkScheme.matches && {
                            backgroundColor: '#333',
                            color: '#fdf7f3',
                          }),
                        },
                      },
                    }}
                  >
                    <MenuItem
                      value={'mfDCA'}
                      sx={prefersDarkScheme.matches && {
                        backgroundColor: '#333',
                        color: '#fdf7f3',
                      }}
                    >
                      mean-field DCA
                    </MenuItem>

                    <MenuItem
                      value={''}
                      sx={prefersDarkScheme.matches && {
                        backgroundColor: '#333',
                        color: '#fdf7f3',
                      }}
                    >
                      More to Come!
                    </MenuItem>
                  </Select>
                  </Box>

                  {analysisMethod === 'mfDCA' &&(
                    <MFDCASettings ECutoff={ECutoff} handleECutoffChange={handleECutoffChange} defaultTheta={defaultTheta} theta={theta} handleThetaChange={handleThetaChange} />)
                  }
                </>
                }
                msaSettings={
                  <Box>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <p style={{width:'40vh', textAlign:'center', color: prefersDarkScheme.matches && '#fdf7f3'}}>Max Number of Continuous Gaps (as percentage of MSA length):</p>
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:'15px'}}>
                  <Slider
                    defaultValue={defaultMaxGaps}
                    value={maxContGaps}
                    onChange={handleMaxContGapsChange}
                    step={1}
                    min={0}
                    max={100}
                    style={{width: '40%'}}
                  />
                  <p style={{color:'rgba(50, 50, 50, 0.4)', alignContent:'center', marginLeft:'10px'}}>{maxContGaps}</p>
                </div>
                  </Box>
                }
                renderMSA={selectedFileTypes.Seed}
              ></AdvancedSettings>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, margin: '10px 20px' }}>
              Submit
            </Button>
            </div>
          </form>
          </ThemeProvider>
          {/* I'll add in a settings pane. Filtering the MSA, MSAutils whatever settings are needed., Bit Score */}
        </>
  );
}



export default CoevolvingPairs;