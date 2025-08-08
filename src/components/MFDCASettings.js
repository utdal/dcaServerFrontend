import React from 'react';
import { Box, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';

const MFDCASettings = ({ ECutoff, handleECutoffChange, defaultTheta, theta, handleThetaChange }) => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const textFieldSx={
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
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:5}}>
        <TextField 
          label="E-Val Cutoff (optional)" 
          margin="normal"
          variant='filled'
          value={ECutoff}
          onChange={handleECutoffChange}
          sx={textFieldSx}
        >
        </TextField>
        <TextField
            label="DCA Reweighting (θ)"
            variant='filled'
            margin="normal"
            aria-label="DCA Reweighting (θ)"
            value={theta}
            onChange={handleThetaChange}
            sx={textFieldSx}
        />
    </Box>
  );
};


export default MFDCASettings;
