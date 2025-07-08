import React from 'react';
import {Button, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@mui/material'
const SEECTable = ({hamiltonians, selectedMap, aminoacids}) => {
    const exportTable =()=>{
        const headers = ["Hamiltonian", "Step", "Sequence"];
        const rows = selectedMap.map((entry, idx) => [hamiltonians[entry], entry, aminoacids[entry]]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "table_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return ( 
        <Box>
            <Paper elevation={5} style={{maxHeight: '300px', overflowY:'auto'}}>            
                <Table stickyHeader={true} sx={{maxWidth:'100%'}}>
                    <TableHead>
                        <TableRow>
                        <TableCell>Hamiltonian</TableCell>
                        <TableCell>Step</TableCell>
                        <TableCell>Sequence</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            selectedMap.map((entry, idx)=>(
                                <TableRow key={idx}>
                                    <TableCell>{hamiltonians[entry]}</TableCell>
                                    <TableCell>{entry}</TableCell>
                                    <TableCell sx={{
                                    maxWidth: '150px',
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                    }}>
                                    <Box component="div" sx={{ display: 'inline-block', minWidth: '100%' }}>
                                        {aminoacids[entry]}
                                    </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
            {selectedMap.length>0&&(
                <Button color='warning' variant='contained' onClick={exportTable} sx={{mt:'15px'}}>Export Table</Button>)
            }
        </Box>
    );
}
 
export default SEECTable;