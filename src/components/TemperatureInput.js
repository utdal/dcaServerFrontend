import * as React from 'react';
import {
  Box,
  Button,
  Collapse,
  Input,
  Paper,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Slider,
  Select,
  Typography,
  MenuItem,
  ThemeProvider
} from '@mui/material';
import {useState, useEffect} from 'react';
import { Form } from 'react-router-dom';
import theme from '../theme';

export default function TemperatureInput({temperature, SetTemperature}) {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const darkColor = '#fdf7f3';
  const handleTemperature = (e) => {
    const value = e.target.value;
    // Allow 0 to be displayed, but do not set as valid temperature
    if (value === '' || value === '0' || parseFloat(value) > 0) {
      SetTemperature(value);
    }
  };
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <ThemeProvider theme={theme}>
      <FormControl variant="standard" sx={{width: 120 }}>
        <InputLabel sx={{color: prefersDarkScheme.matches ? darkColor : undefined}}>Temperature</InputLabel>
        <Input id="temperature-input" type="number" value={temperature} onChange={handleTemperature}
          min={0}
          sx={{
            color: prefersDarkScheme.matches ? darkColor : undefined,
            '&::placeholder': { color: prefersDarkScheme.matches ? darkColor : undefined, opacity:0.8 }
          }}
        />
        {temperature === '0' || temperature === 0 ? (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>not valid
          </Typography>
        ) : null}
      </FormControl>
      </ThemeProvider>
    </Box>
  );
}