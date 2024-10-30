import React from 'react';
import { Box, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';

const MFDCASettings = ({ ECutoff, handleECutoffChange, defaultTheta, theta, handleThetaChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <TextField label="E-Value Cutoff"
        value={ECutoff}
        onChange={handleECutoffChange}>
        </TextField>
        <Box sx={{ width: "20%" }}>
            <h4> Theta / DCA Reweighting Parameter </h4>
            <Slider
                aria-label="Theta / DCA Reweighting Parameter"
                defaultValue={defaultTheta}
                value={theta}
                onChange={handleThetaChange}
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0}
                max={0.5}
            />
        </Box> 
    </Box>
  );
};

export default MFDCASettings;
