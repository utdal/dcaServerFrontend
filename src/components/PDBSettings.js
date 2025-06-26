import React from 'react';
import { Box, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const PDBSettings = ({ distThresh, handleDistThreshChange, caOnly, handleCaOnlyChange, chain1, handleChain1Change, chain2, handleChain2Change, isAuthChain, handleIsAuthChainChange, isAuthResidue, handleIsAuthResidueChange, selectedPDBTypes }) => {
  return (
    <Box sx={{marginTop:'15px'}}>
        <p>Structural Contact Distance Threshold</p>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop:'15px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
            <TextField
                label = "Threshold (Å)"
                variant='filled'
                value={distThresh}
                onChange={handleDistThreshChange}>
            </TextField>
          </Box>
          </Box>

          <p style={{marginTop:'15px'}}>Chain IDs</p>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexDirection: 'row', marginTop:'15px'}}>
            <TextField
              label="Chain 1 ID"
              variant='filled'
              name="chainId"
              value={chain1}
              onChange={handleChain1Change}
            />
            <TextField
              label="2 (optional)"
              variant='filled'
              name="chainId"
              value={chain2}
              onChange={handleChain2Change}
            />
          </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexDirection: 'row'}}>
          {selectedPDBTypes.CIF === true ? 
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isAuthChain"
                    checked={isAuthChain}
                    onChange={handleIsAuthChainChange}
                  />
                }
                label="Use Auth Chain IDs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isAuthResidue"
                    checked={isAuthResidue}
                    onChange={handleIsAuthResidueChange}
                  />
                }
                label="Use Auth Residue IDs"
              />
            </Box>
            :
            <></>
          }
        </Box>
      <FormGroup sx={{ alignItems: 'center' }}>
          <FormControlLabel control={<Checkbox checked={caOnly} onChange={handleCaOnlyChange}/>} label="Alpha-carbon contacts only" />
      </FormGroup>
{/* </Box>
        <FormControlLabel
  control={
    <TextField
      variant="outlined"
      size="small"
      value={offResidueIds}
      onChange={handleOffResidueIdsChange}
      placeholder="e.g., 12, 34, 56"
    />
  }
  label="Off Residue IDs"
  labelPlacement="start"
/>
*/}
    </Box> 
  );
};

export default PDBSettings;







