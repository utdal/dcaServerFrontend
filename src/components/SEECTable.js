import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SEECTable = ({ hamiltonians, selectedMap, aminoacids }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('csv');

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuSelect = (format) => {
    setSelectedFormat(format);
    setAnchorEl(null);
  };

  const handleExport = () => {
    const headers = ["Hamiltonian", "Step", "Sequence"];
    const rows = selectedMap.map((entry) => [
      hamiltonians[entry],
      entry,
      aminoacids[entry],
    ]);

    if (selectedFormat === 'csv') {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        headers.join(",") + "\n" +
        rows.map(e => e.join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "table_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (selectedFormat === 'fasta') {
      const fastaContent = rows.map(
        ([_, step, sequence]) => `>Step_${step}\n${sequence}`
      ).join("\n");

      const blob = new Blob([fastaContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "table_export.fasta";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Box>
      <Paper elevation={5} style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Table stickyHeader={true} sx={{ maxWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Hamiltonian</TableCell>
              <TableCell>Step</TableCell>
              <TableCell>Sequence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedMap.map((entry, idx) => (
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
            ))}
          </TableBody>
        </Table>
      </Paper>

      {selectedMap.length > 0 && (
        <Box sx={{ mt: '15px' }}>
          <ButtonGroup variant="contained" color="warning">
            <Button onClick={handleExport}>
              Export as {selectedFormat.toUpperCase()}
            </Button>
            <Button
              size="small"
              onClick={handleMenuClick}
              aria-controls={open ? 'export-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Menu
            id="export-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}

            >
            <MenuItem onClick={() => handleMenuSelect('csv')}>CSV</MenuItem>
            <MenuItem onClick={() => handleMenuSelect('fasta')}>FASTA</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default SEECTable;
