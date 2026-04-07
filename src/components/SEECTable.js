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
  TableRow,
  TablePagination,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ROWS_PER_PAGE_OPTIONS = [25, 50, 100];

const SEECTable = ({ hamiltonians, selectedMap, aminoacids, allSteps, resultFileUrl }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuSelect = (format) => {
    setSelectedFormat(format);
    setAnchorEl(null);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Quote a CSV field to handle commas/newlines in sequences
  const csvField = (val) => `"${String(val).replace(/"/g, '""')}"`;

  const handleExport = () => {
    const headers = ['Hamiltonian', 'Step', 'Sequence'];
    const rows = selectedMap.map((entry) => [
      hamiltonians[entry],
      entry,
      aminoacids[entry],
    ]);

    if (selectedFormat === 'csv') {
      const csvContent =
        headers.map(csvField).join(',') + '\n' +
        rows.map((e) => e.map(csvField).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'seec_selection.csv';
      link.click();
      URL.revokeObjectURL(url);
    }

    if (selectedFormat === 'fasta') {
      const fastaContent = rows
        .map(([_, step, sequence]) => `>Step_${step}\n${sequence}`)
        .join('\n');

      const blob = new Blob([fastaContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'seec_selection.fasta';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadAll = () => {
    const csvField = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;
    const headers = ['Step', 'Hamiltonian', 'Sequence'];
    const rows = (allSteps || []).map((step, i) => [
      step,
      hamiltonians[i] ?? '',
      aminoacids[i] ?? '',
    ]);
    const csv =
      headers.map(csvField).join(',') + '\n' +
      rows.map(r => r.map(csvField).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seec_full_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Only render the current page slice — no more rendering 10k rows at once
  const pageRows = selectedMap.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      {/* Download All button — always visible once results are loaded */}
      {(allSteps && allSteps.length > 0) && (
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" color="warning" onClick={handleDownloadAll}>
            Download Full Results (CSV)
          </Button>
        </Box>
      )}

      <Paper elevation={5} style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table stickyHeader sx={{ maxWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Hamiltonian</TableCell>
              <TableCell>Step</TableCell>
              <TableCell>Sequence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedMap.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  Select a range on the graph to populate the table
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{hamiltonians[entry]?.toFixed(4)}</TableCell>
                  <TableCell>{entry}</TableCell>
                  <TableCell sx={{ maxWidth: '300px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    <Box component="div" sx={{ display: 'inline-block', minWidth: '100%' }}>
                      {aminoacids[entry]}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {selectedMap.length > 0 && (
        <TablePagination
          component="div"
          count={selectedMap.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        />
      )}

      {selectedMap.length > 0 && (
        <Box sx={{ mt: '10px' }}>
          <ButtonGroup variant="contained" color="warning">
            <Button onClick={handleExport}>
              Export Selection as {selectedFormat.toUpperCase()}
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
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
