import React from 'react';
import { Box, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const PDBSettings = ({ distThresh, handleDistThreshChange, caOnly, handleCaOnlyChange }) => {
  return (
    <Box sx={{}}>
      <p>Structural Contact Distance Threshold:</p>
        <TextField
            label = "Threshold (Å)"
            value={distThresh}
            onChange={handleDistThreshChange}>
        </TextField>
        <FormGroup sx={{ alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox checked={caOnly} onChange={handleCaOnlyChange}/>} label="Alpha-carbon contacts only" />
        </FormGroup>
    </Box>
  );
};

export default PDBSettings;
