import React, { useState, useRef } from 'react';

import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const PDBInput = ({ inputPDBID, inputPDBFile, handleInputPDBChange, handlePDBChange }) => {
  const [upload, setUpload] = useState(false);
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const radioButtonSx = {
    color: prefersDarkScheme.matches && '#fdf7f3',
    '&.Mui-checked':{
      color:prefersDarkScheme.matches && '#fdf7f3',
    }
  };
  const textFieldSx = {
    color: prefersDarkScheme.matches && '#fdf7f3',
    '& .MuiInputBase-input': {
      color: prefersDarkScheme.matches && '#fdf7f3',
    },
    '& .MuiInputBase-inputMultiline': {
      color: prefersDarkScheme.matches && '#fdf7f3',
    },
    '& .MuiInputLabel-root': {
      color: prefersDarkScheme.matches && '#fdf7f3',
    },
    '& .MuiFilledInput-underline:before': {
      borderBottomColor: prefersDarkScheme.matches && '#fdf7f3',
    },
  };
  const textSx = {
    color: prefersDarkScheme.matches && '#fdf7f3',
  };
  return (
    <Box sx={{ width: '100%', p: 2}}>
      <h3 style={{ textAlign: 'center', width: '100%' }}>
        {/*
        Enter the PDB ID that corresponds to the RCSB entry of your protein of interest.
        */}
        Enter the PDB ID that corresponds to the RCSB entry of your protein of interest.
      </h3>
      <Box>
        <FormControlLabel control={<Checkbox checked={upload} onChange={event => {setUpload(event.target.checked);}} sx={radioButtonSx}/>} label="Upload a PDB file" />
      </Box>
      {upload === false ? 
        <TextField
          label="PDB ID"
          variant='filled'
          inputProps={{ maxLength: 8 }}
          value={inputPDBID}
          onChange={handleInputPDBChange}
          sx={textFieldSx}
        />
        :
        <Box>
          <Box sx={{ p: 2 }}>
            <Button variant="contained" component="label">
              Upload PDB File
              <input
                type="file"
                hidden
                onChange={handleInputPDBChange}
              />
            </Button>
            <span style={{padding: '10px', fontStyle: 'italic'}}>
              {inputPDBFile?.name}
            </span>
          </Box>
          <Box sx={{ width: '100%', p: 2 }}>
            <FormControl>
              <FormLabel id="input-pdb-type" sx={textSx}>PDB Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="input-pdb-type"
                  defaultValue="PDB"
                  name="Input PDB Group"
                >
                {/* <FormControlLabel
                  value="CIF"
                  control={<Radio sx={radioButtonSx}/>}
                  onChange={() => handlePDBChange('CIF')}
                  label="CIF"
                /> */}
                <FormControlLabel
                  value="PDB"
                  control={<Radio sx={radioButtonSx}/>}
                  onChange={() => handlePDBChange('PDB')}
                  label="PDB"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      }
      


      

    </Box>
  );
};

export default PDBInput;
