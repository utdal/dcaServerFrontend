import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

import{
  CssBaseline,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Select,
  InputLabel,
  Input,
  FormControl,
  Tooltip,
  Paper,
  TextField,
  MenuItem,
  Slider
} from '@mui/material';
import './SEEC.css';
import MSAInput from '../components/MSAInput';
import TopBar from '../components/TopBar';
import SEECGraph from '../components/SEECGraph';
import TemperatureInput from '../components/TemperatureInput'
import { Link } from 'react-router-dom';

const SEEC = () => {
    const navigate = useNavigate();
    const [selectedFileTypes, setSelectedFileTypes] = useState({ MSA: false, Seed: true });
    const [inputMSA, setInputMSA] = useState('');
    const [inputFile, setInputFile] = useState(null);
    const [temperature, SetTemperature] = useState(0); {/* Temperature in Kelvin */}
    const [steps, SetSteps] = useState(0);
    const allowed_letters= new Set(['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']);

    
    const handleFileTypeChange = (type) => {
      setSelectedFileTypes((prev) => ({
        ...prev,
        MSA: type === 'MSA' ? true : false,
        Seed: type === 'Seed' ? true : false,
      }));
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        navigate('/seec-results');

        return{

        }
    }
    const handleInputMSAChange = (event) => {
      if (selectedFileTypes.Seed){
        if ([...event.target.value.toUpperCase()].every(char => allowed_letters.has(char))) {
          setInputMSA(event.target.value.toUpperCase());
        }
      }
      else setInputFile(event.target.files[0]);

    };
    const handleStepsChange=(e)=>{
      if (e.target.value<=10000 && e.target.value>=0){
        SetSteps(e.target.value);
      }
    }
    useEffect(()=>{
      console.log(steps);
    }, [steps]);
    
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
              <Tooltip title='Sequence evolution with epistatic contributions'>
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
                  SEEC
                </Button>
              </Tooltip>
            </div>
            <Box>
              <form onSubmit={handleSubmit}>
                <div style={{marginTop:"40px"}}>
                  <MSAInput
                    inputType={selectedFileTypes.Seed ? 'Seed' : 'MSA'}
                    inputMSA={selectedFileTypes.Seed ? inputMSA : inputFile}
                    handleInputMSAChange={handleInputMSAChange}
                    handleFileTypeChange={handleFileTypeChange}
                  />
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                  <TemperatureInput temperature={temperature} SetTemperature={SetTemperature}/>
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                  <FormControl style={{width:'100px', marginLeft:'40px'}}>
                    <InputLabel>Steps</InputLabel>
                    <Input type='number' onChange={handleStepsChange} placeholder='0-10,000' inputProps={{ min: 0, max: 10000 }} value={steps}/>
                  </FormControl>
                </div>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, margin: '10px 20px' }}>
                  Submit
                </Button>
              </form>
            </Box>


        </Box>
    );
}
 
export default SEEC;