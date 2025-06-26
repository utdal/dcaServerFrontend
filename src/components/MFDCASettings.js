import React from 'react';
import { Box, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';

const MFDCASettings = ({ ECutoff, handleECutoffChange, defaultTheta, theta, handleThetaChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:5}}>
        <TextField 
          label="E-Val Cutoff (optional)" 
          margin="normal"
          variant='filled'
          value={ECutoff}
          onChange={handleECutoffChange}>
        </TextField>
        <TextField
            label="DCA Reweighting (θ)"
            variant='filled'
            margin="normal"
            aria-label="DCA Reweighting (θ)"
            value={theta}
            onChange={handleThetaChange}
        />
    </Box>
  );
};


export default MFDCASettings;
