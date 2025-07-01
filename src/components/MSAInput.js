import React from 'react';
import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
const MSAInput = ({ inputType, inputMSA, handleInputMSAChange, handleFileTypeChange}) => {
  const handleInputChange = (event) => {
    
  }
  return (
    <>
    {/*
      <h3 style={{ justifyContent: 'center', width: '60%', textAlign: 'center', margin: 'auto', marginTop: '30px' }}>
        Welcome to the Coevolving Pairs tile.
        Here, a user may supply a sequence corresponding to a complete protein or a portion of that protein and identify which residue sites may be directly coupled with others.
        A Multiple Sequence Alignment provided or produced by a seed sequence that has been supplied is used as input for the coevolutionary model chosen.
        Finally, the pairs are returned, mapped to the protein structure of interest.
      </h3>
      */}
      {/*
      <h3 style={{marginTop:'20px', marginBottom:'30px'}}>Multiple Sequence Alignment</h3>
      */}
      
      {inputType === 'Seed' ?
        <>
          <TextField
            id="InputSequence"
            variant="filled"
            placeholder='Please supply a seed sequence or full Multiple Sequence Alignment in FASTA format and specify the format with the radio buttons below.'
            multiline
            minRows={5}
            maxRows={5}
            value={inputMSA}
            onChange={handleInputMSAChange}
            sx={{width:"40%"}}
          />
          </>
        :
        <>
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
        </>
      }
      <div>
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
    
      </div>
      </>
  );
};

export default MSAInput;
