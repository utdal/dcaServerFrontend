import React from 'react';
import { Box, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';

const MFDCASettings = ({ ECutoff, handleECutoffChange, defaultTheta, theta, handleThetaChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <TextField 
          label="E-Val Cutoff (optional)" 
          margin="normal"
          variant='filled'
          value={ECutoff}
          onChange={handleECutoffChange}>
        </TextField>
        <Box sx={{ width: "20%" }}>
            <TextField
                label="DCA Reweighting (θ)"
                variant='filled'
                margin="normal"
                aria-label="DCA Reweighting (θ)"
                value={theta}
                onChange={handleThetaChange}
                
            />
        </Box> 
    </Box>
  );
};


export default MFDCASettings;
