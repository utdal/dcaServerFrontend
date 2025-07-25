import React, { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Input,
    ThemeProvider
} from '@mui/material'
import theme from '../theme';
const StepsInput = ({steps, SetSteps}) => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const darkColor = '#fdf7f3';

    const handleStepsChange=(e)=>{
    if (e.target.value<=10000 && e.target.value>=0){
        SetSteps(e.target.value);
    }
    }
    return ( 
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <ThemeProvider theme={theme}>
            <FormControl variant="standard" sx={{ width: '120px'}}>
                <InputLabel sx={{color: prefersDarkScheme.matches ? darkColor : undefined}}>Steps</InputLabel>
                <Input
                type="number"
                onChange={handleStepsChange}
                placeholder="0-10,000"
                inputProps={{ min: 0, max: 10000 }}
                sx={{color: prefersDarkScheme.matches ? darkColor : undefined,
                    '&::placeholder': {color: prefersDarkScheme.matches ? darkColor : undefined, opacity:0.8}}}
                value={steps}
                />
            </FormControl>
            </ThemeProvider>
        </Box>
     );
}
 
export default StepsInput;