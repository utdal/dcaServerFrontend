import React from 'react';
import theme from '../theme';

import { Box, TextField, ThemeProvider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
const MSAInput = ({ inputType, inputMSA, handleInputMSAChange, handleFileTypeChange}) => {
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

    {/*
      <h3 style={{ justifyContent: 'center', width: '60%', textAlign: 'center', margin: 'auto', marginTop: '30px' }}>
        Welcome to the Coevolving Pairs tile.
        Here, a user may supply a sequence corresponding to a complete protein or a portion of that protein and identify which residue sites may be directly coupled with others.
        A Multiple Sequence Alignment provided or produced by a seed sequence that has been supplied is used as input for the coevolutionary model chosen.
        Finally, the pairs are returned, mapped to the protein structure of interest.
      </h3>
      */}
      {/*
      <h3 style={{marginTop:'20px', marginBottom:'30px'}}>Multiple Sequence Alignment</h3>
      */}
      
      {inputType === 'Seed' ?
        <>

          <TextField
            id="InputSequence"
            variant="outlined"
            placeholder='Please supply a seed sequence or full Multiple Sequence Alignment in FASTA format and specify the format with the radio buttons below.'
            multiline
            minRows={5}
            maxRows={5}
            value={inputMSA}
            onChange={handleInputMSAChange}
            sx={[textFieldSx, {width: "50%", }]}          />
          </>
        :
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Button variant="contained" component="label">
            Upload FASTA
            <input
              type="file"
              hidden
              onChange={handleInputMSAChange}
            />
          </Button>
          <span style={{padding: '10px', fontStyle: 'italic'}}>
            {inputMSA?.name}
          </span>
        </div>
      }
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

export default MSAInput;
