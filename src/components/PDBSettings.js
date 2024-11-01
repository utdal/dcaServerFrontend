import React from 'react';
import { Box, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const PDBSettings = ({ distThresh, handleDistThreshChange, caOnly, handleCaOnlyChange, chain1, handleChain1Change, chain2, handleChain2Change, selectedPDBTypes }) => {
  return (
    <Box>
      <p>Structural Contact Distance Threshold:</p>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 25, flexDirection: 'row'}}>
          <TextField
              label = "Threshold (Å)"
              value={distThresh}
              onChange={handleDistThreshChange}>
          </TextField>

          {selectedPDBTypes.CIF === true ? 
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexDirection: 'row'}}>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <TextField
                      label="Chain 1 ID"
                      name="chainId"
                      value={chain1.chainId}
                      onChange={handleChain1Change}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isAuth"
                          checked={chain1.isAuth}
                          onChange={handleChain1Change}
                        />
                      }
                      label="Auth Chain"
                    />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <TextField
                  label="Chain 2 ID"
                  name="chainId"
                  value={chain2.chainId}
                  onChange={handleChain2Change}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isAuth"
                      checked={chain2.isAuth}
                      onChange={handleChain2Change}
                    />
                  }
                  label="Auth Chain"
                />
              </Box>
            </Box>
          :
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexDirection: 'row'}}>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <TextField
                  label="Chain 1 ID"
                  name="chainId"
                  value={chain1.chainId}
                  onChange={handleChain1Change}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <TextField
                  label="Chain 2 ID"
                  name="chainId"
                  value={chain2.chainId}
                  onChange={handleChain2Change}
                />
              </Box>
            </Box>
          }
          
        </Box>
        <FormGroup sx={{ alignItems: 'center' }}>
            <FormControlLabel control={<Checkbox checked={caOnly} onChange={handleCaOnlyChange}/>} label="Alpha-carbon contacts only" />
        </FormGroup>
    </Box>
  );
};

export default PDBSettings;







