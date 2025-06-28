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


function valuetext(value) {
  return `${value}°C`;
}
function temperatureToColor(kelvin) {
  const clamped = Math.min(Math.max(kelvin, 250), 350);
  const ratio = (clamped - 250) / (350 - 250);

  const start = { r: 33, g: 150, b: 243 };
  const end = { r: 244, g: 67, b: 54 };

  const r = Math.round(start.r + ratio * (end.r - start.r));
  const g = Math.round(start.g + ratio * (end.g - start.g));
  const b = Math.round(start.b + ratio * (end.b - start.b));

  return `rgb(${r}, ${g}, ${b})`;
}
export default function TemperatureInput({temperature, SetTemperature}) {
  const [displayTemperature, SetDisplayTemperature]=useState(0); {/* Temperature just to display to the user */}
  const [displayScale, SetDisplayScale]=useState('K'); {/* Scale just to display to the user */}
  const [color, SetColor]=useState(' r: 33, g: 150, b: 243 ');
  const handleDisplayTemperature =(e)=>{
    SetDisplayTemperature(e.target.value); 
  }
  const handleDisplayScale=(e)=>{
    SetDisplayScale(e.target.value);
  }
  useEffect(() => {
    if (displayScale === '°C') {
      SetTemperature(Number(displayTemperature) + 273.15);
    } else if (displayScale === '°F') {
      SetTemperature(((Number(displayTemperature) - 32) * 5) / 9 + 273.15);
    } else {
      SetTemperature(Number(displayTemperature));
    }
  }, [displayTemperature, displayScale]);

  useEffect(() => {
    console.log('Kelvin temperature:', temperature);

  }, [temperature]);
  useEffect(() => {
    SetColor(temperatureToColor(temperature));
  }, [temperature]);

  return (
    <Box sx={{ width: 300 }}>
      <Paper elevation={3}>
        <Tab label='Temperature Selector'sx={{color: color, width:'100%'}}></Tab>
        <Box sx={{display:'flex', justifyContent:'center', m:'10px 20px'}}>
          <FormControl variant="standard" sx={{minWidth: 120 }}>
            <InputLabel>Temperature</InputLabel>
            <Input id="temperature-input" type="number" value={displayTemperature} onChange={handleDisplayTemperature}></Input>
          </FormControl>
            <FormControl variant="standard" sx={{minWidth: 120 }}>
              <InputLabel>Scale</InputLabel>
              <Select onChange={handleDisplayScale} value={displayScale} labelId="scale-label">
                <MenuItem value={'K'}>K</MenuItem>
                <MenuItem value={'°C'}>°C</MenuItem>
                <MenuItem value={'°F'}>°F</MenuItem>
              </Select>
            </FormControl>
        </Box>
      </Paper>
    </Box>
  );
}