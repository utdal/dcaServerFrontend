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

const SequenceInput = ({inputType, setInputType, sequence, setSequence}) => {


    const handleInputTypeChange = (event) => {
        setInputType(event.target.value);
        setSequence(''); // optionally clear when switching
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
                    onChange={(e) => setSequence(e.target.value)}
                    multiline
                    minRows={5}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    inputProps={{ spellCheck: false }}
                    />
                <FormGroup>
                    <FormControlLabel
                        label={inputType === 'Nucleotide' ? 'Nucleotides' : 'Amino Acids'}
                        control={
                        <Switch
                            color='warning'
                            checked={inputType === 'Nucleotide'}
                            onChange={(e) =>
                            setInputType(e.target.checked ? 'Nucleotide' : 'AminoAcid')
                            }
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