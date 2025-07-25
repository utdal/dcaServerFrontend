import React from 'react';
import theme from '../theme';

import { Box, TextField, ThemeProvider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography} from '@mui/material';
const SEECMsaInput = ({ inputType, handleInputMSAChange, handleFileTypeChange}) => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const lightColor = '#fdf7f3';

  const textFieldSx = {
    color: prefersDarkScheme.matches && '#fdf7f3',
    '& .MuiInputBase-input': {
      color: prefersDarkScheme.matches && '#fdf7f3',
      '::placeholder': {
        color: prefersDarkScheme.matches && lightColor,
        opacity: 0.8
      }
    },
    '& .MuiInputBase-inputMultiline': {
      color: prefersDarkScheme.matches && '#fdf7f3',
    },
    '& .MuiInputLabel-root': {
      color: prefersDarkScheme.matches && '#fdf7f3',
      '&.Mui-focused': {
        color: prefersDarkScheme.matches && lightColor,
      }
    },
    '& .MuiFilledInput-underline:before': {
      borderBottomColor: prefersDarkScheme.matches && '#fdf7f3',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: prefersDarkScheme.matches && lightColor,
      },
      '&:hover fieldset': {
        borderColor: prefersDarkScheme.matches && lightColor,
      },
      '&.Mui-focused fieldset': {
        borderColor: prefersDarkScheme.matches && lightColor,
      },
    },
  };
  const radioSx = {
    color: prefersDarkScheme.matches && '#fdf7f3',
    '&.Mui-checked': {
      color: prefersDarkScheme.matches && '#fdf7f3',
    },
  };
  const textSx = {
    color: prefersDarkScheme.matches && '#fdf7f3',
  }
  const handleInputChange = (event) => {
    
  }
  return (
    <>
    <ThemeProvider theme={theme}>
      
      {inputType !== 'Seed' && (

        <>
        <Button 
            variant="contained" 
            component="label" 
            sx={{
            backgroundColor:'transparent', 
            color: prefersDarkScheme.matches ? '#fdf7f3' : '#1f1f1f',
            '&:hover': {
                backgroundColor: 'transparent', 
                boxShadow: '0px 0px 10px rgba(0,0,0,0.3)'}
            }}
        >
            Upload MSA
            <input
            type="file"
            hidden
            onChange={handleInputMSAChange}
            />
        </Button>

        </>
      )}
      <div>
      <FormControl>
        <FormLabel id="input-msa-type" sx={textSx}>Input Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="input-msa-type"
          defaultValue="Seed"
          name="Input Type Group"
        >
          <FormControlLabel
            value="Seed"
            control={<Radio   sx={radioSx}/>}
            onChange={() => handleFileTypeChange('Seed')}
            label="Seed"
          />
          <FormControlLabel
            value="MSA"
            control={<Radio   sx={radioSx}/>}
            onChange={() => handleFileTypeChange('MSA')}
            label="Full MSA"
          />
        </RadioGroup>
      </FormControl>
    
      </div>
      </ThemeProvider>
      </>
  );
};

export default SEECMsaInput;
