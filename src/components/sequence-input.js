import {
    Box,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Switch,
    TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react';
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const darkColor = '#fdf7f3';

const SequenceInput = ({inputType, setInputType, sequence, setSequence}) => {

    const handleInputTypeChange = (event) => {
        setInputType(event.target.checked ? 'Nucleotide' : 'AminoAcid');
        setSequence('');
    };

    const placeholderMap = {
        AminoAcid: 'Enter protein sequence (e.g., MVLTIYPDELVQIVS...)',
        Nucleotide: 'Enter nucleotide sequence (e.g., ATGCGTACGTTAGC...)',
    };

    const labelMap = {
        AminoAcid: 'Protein Sequence',
        Nucleotide: 'Nucleotide Sequence',
    };

    return ( 
        <Box sx={{
                borderRadius: 2,
                padding: 3,
                width: '100%',
                fontFamily: 'Helvetica',
              }}
            >
            <FormControl fullWidth>
                <h3 id="sequence-input-type">Introduce Sequence to Evolve</h3>
                <TextField
                    label={labelMap[inputType]}
                    placeholder={placeholderMap[inputType]}
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value.toUpperCase())}
                    sx={{
                      '& .MuiInputBase-input': {
                        color: prefersDarkScheme.matches ? darkColor : undefined,
                        '::placeholder': {
                          color: prefersDarkScheme.matches ? darkColor : undefined,
                          opacity: 0.8
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: prefersDarkScheme.matches ? darkColor : undefined,
                        '&.Mui-focused': {
                          color: prefersDarkScheme.matches ? darkColor : undefined,
                        }
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: prefersDarkScheme.matches ? darkColor : undefined,
                        },
                        '&:hover fieldset': {
                          borderColor: prefersDarkScheme.matches ? darkColor : undefined,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: prefersDarkScheme.matches ? darkColor : undefined,
                        },
                      },
                    }}
                    multiline
                    minRows={5}
                    maxRows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    inputProps={{ spellCheck: false, style: { overflow: 'auto' } }}
                    />
                    
                <FormGroup>
                    <FormControlLabel
                        label={inputType === 'Nucleotide' ? 'Nucleotides' : 'Amino Acids'}
                        control={
                        <Switch
                            color='warning'
                            checked={inputType === 'Nucleotide'}
                            onChange={handleInputTypeChange}
                        />
                        }
                        style={{display:'flex', justifyContent:'center'}}

                    />
                </FormGroup>
            </FormControl>
            
        

        </Box>
     );
}
 
export default SequenceInput;