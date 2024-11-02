import React from 'react';
import { Box, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const PDBSettings = ({ distThresh, handleDistThreshChange, caOnly, handleCaOnlyChange, chain1, handleChain1Change, chain2, handleChain2Change, isAuth, handleIsAuthChange, selectedPDBTypes }) => {
  return (
    <Box>
      
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 25, flexDirection: 'row'}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2}}>
            <p>Structural Contact Distance Threshold:</p>
            <TextField
                label = "Threshold (Å)"
                variant='filled'
                value={distThresh}
                onChange={handleDistThreshChange}>
            </TextField>
          </Box>
          

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexDirection: 'row'}}>
            <TextField
              label="Chain 1 ID"
              variant='filled'
              name="chainId"
              value={chain1}
              onChange={handleChain1Change}
            />
            <TextField
              label="Chain 2 ID"
              variant='filled'
              name="chainId"
              value={chain2}
              onChange={handleChain2Change}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexDirection: 'row'}}>
          {selectedPDBTypes.CIF === true ? 
            <FormControlLabel
            control={
              <Checkbox
                name="isAuth"
                checked={isAuth}
                onChange={handleIsAuthChange}
              />
            }
            label="Auth Chains Supplied"
          />
          :
            <></>
          }
          <FormGroup sx={{ alignItems: 'center' }}>
              <FormControlLabel control={<Checkbox checked={caOnly} onChange={handleCaOnlyChange}/>} label="Alpha-carbon contacts only" />
          </FormGroup>
        </Box>
    </Box>
  );
};

export default PDBSettings;







