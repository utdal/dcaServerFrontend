import React, { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Input,
} from '@mui/material'
const StepsInput = ({steps, SetSteps}) => {

    const handleStepsChange=(e)=>{
    if (e.target.value<=10000 && e.target.value>=0){
        SetSteps(e.target.value);
    }
    }
    return ( 
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <FormControl variant="standard" sx={{ width: '120px'}}>
                <InputLabel>Steps</InputLabel>
                <Input
                type="number"
                onChange={handleStepsChange}
                placeholder="0-10,000"
                inputProps={{ min: 0, max: 10000 }}
                value={steps}
                />
            </FormControl>
        </Box>
     );
}
 
export default StepsInput;