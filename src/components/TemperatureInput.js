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
  MenuItem
} from '@mui/material';
import {useState, useEffect} from 'react';
import { Form } from 'react-router-dom';


export default function TemperatureInput({temperature, SetTemperature}) {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const darkColor = '#fdf7f3';
  const handleTemperature =(e)=>{
        SetTemperature(e.target.value); 
  }
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <FormControl variant="standard" sx={{width: 120 }}>
        <InputLabel sx={{color: prefersDarkScheme.matches ? darkColor : undefined}}>Temperature</InputLabel>
        <Input id="temperature-input" type="number" value={temperature} onChange={handleTemperature}
          sx={{
            color: prefersDarkScheme.matches ? darkColor : undefined,
            '&::placeholder': { color: prefersDarkScheme.matches ? darkColor : undefined, opacity:0.8 }
          }}
        />
      </FormControl>
    </Box>
  );
}