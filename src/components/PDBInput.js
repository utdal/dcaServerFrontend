import React from 'react';
import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const PDBInput = ({ inputPDBID, handleInputPDBChange, handlePDBChange }) => {
  return (
    <Box display="flex" justifyContent="flex-start" flexWrap="wrap" sx={{ width: '100%', p: 2, border: '1px dashed grey' }}>
      <h3 style={{ textAlign: 'left', width: '100%' }}>
        Enter the PDB ID that corresponds to the RCSB entry of your protein of interest.
      </h3>
      <TextField
        label="PDB ID"
        inputProps={{ maxLength: 8 }}
        value={inputPDBID}
        onChange={handleInputPDBChange}
      />
      <Box sx={{ width: '100%', p: 2 }}>
        <FormControl>
          <FormLabel id="input-pdb-type">PDB Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="input-pdb-type"
            defaultValue="CIF"
            name="Input PDB Group"
          >
            <FormControlLabel
              value="CIF"
              control={<Radio />}
              onChange={() => handlePDBChange('CIF')}
              label="CIF"
            />
            <FormControlLabel
              value="PDB"
              control={<Radio />}
              onChange={() => handlePDBChange('PDB')}
              label="PDB"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PDBInput;
