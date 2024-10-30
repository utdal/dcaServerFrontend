import React from 'react';
import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const MSAInput = ({ inputType, inputMSA, handleInputMSAChange, handleFileTypeChange }) => {
  return (
    <Box sx={{ width: '100%', p: 2, border: '1px dashed grey' }}>
      <h3 style={{ textAlign: 'left' }}>
        Welcome to the Coevolving Pairs tile.
        Here, a user may supply a sequence corresponding to a complete protein or a portion of that protein and identify which residue sites may be directly coupled with others.
        A Multiple Sequence Alignment provided or produced by a seed sequence that has been supplied is used as input for the coevolutionary model chosen.
        Finally, the pairs are returned, mapped to the protein structure of interest.
      </h3>
      <p>Please supply a seed sequence or full Multiple Sequence Alignment in FASTA format and specify the format with the radio buttons below.</p>
      {inputType === 'Seed' ?
        <Box sx={{ p: 2 }}>
          <TextField
            id="InputSequence"
            fullWidth
            variant="outlined"
            multiline
            minRows={5}
            value={inputMSA}
            onChange={handleInputMSAChange}
          />
        </Box>
        :
        <Box sx={{ p: 2 }}>
          <Button variant="contained" component="label">
            Upload FASTA
            <input
              type="file"
              hidden
              onChange={handleInputMSAChange}
            />
          </Button>
          <span style={{padding: '10px', fontStyle: 'italic'}}>
            {inputMSA?.name}
          </span>
        </Box>
      }
      <FormControl>
        <FormLabel id="input-msa-type">Input Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="input-msa-type"
          defaultValue="Seed"
          name="Input Type Group"
        >
          <FormControlLabel
            value="Seed"
            control={<Radio />}
            onChange={() => handleFileTypeChange('Seed')}
            label="Seed"
          />
          <FormControlLabel
            value="MSA"
            control={<Radio />}
            onChange={() => handleFileTypeChange('MSA')}
            label="Full MSA"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default MSAInput;
