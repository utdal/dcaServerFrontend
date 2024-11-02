import React from 'react';
import { Box, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';

const MFDCASettings = ({ ECutoff, handleECutoffChange, defaultTheta, theta, handleThetaChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <TextField 
          label="E-Value Cutoff" 
          margin="normal"
          variant='filled'
          value={ECutoff}
          onChange={handleECutoffChange}>
        </TextField>
        <Box sx={{ width: "20%" }}>
            <TextField
                label="Theta / DCA Reweighting Parameter"
                variant='filled'
                margin="normal"
                aria-label="Theta / DCA Reweighting Parameter"
                value={theta}
                onChange={handleThetaChange}
                
            />
        </Box> 
    </Box>
  );
};


export default MFDCASettings;
