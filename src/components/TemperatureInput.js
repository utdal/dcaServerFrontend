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
  const handleTemperature =(e)=>{
        SetTemperature(e.target.value); 
  }
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <FormControl variant="standard" sx={{width: 120 }}>
        <InputLabel>Temperature</InputLabel>
        <Input id="temperature-input" type="number" value={temperature} onChange={handleTemperature}></Input>
      </FormControl>
    </Box>
  );
}