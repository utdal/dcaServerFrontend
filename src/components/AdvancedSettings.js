import React from 'react';
import './AdvancedSettings.css'
import { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'; 
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value===index&&(<Box sx={{ mt: 2 }}>{children}</Box>)}
    </div>
  );
}

const AdvancedSettings = ({caSettings}) => {
    const [display, SetDisplay] = useState(false);
    const [tabIndex, SetTabIndex]= useState(0);
    const handleDisplay=(e)=>{
        e.preventDefault();
        SetDisplay(!display);
    }

    return ( 
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4}}>
            <Button className='advanced-settings-button' onClick={handleDisplay}>
                {display ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
            </Button>
            <div>
                <Collapse in={display}>
                    <Paper elevation={3} sx={{mt: 2, p: 3, width: '100%', maxWidth: 500, mx: 'auto', textAlign: 'left'}}>
                        <Tabs
                            value={tabIndex}
                            onChange={(e, newValue) => SetTabIndex(newValue)}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Coevolutionary Analysis Settings" />
                        </Tabs>

                        <TabPanel value={tabIndex} index={0}>
                            {caSettings}
                        </TabPanel>
                    </Paper>
                </Collapse>          
            </div>
        </Box>
     );
}
 
export default AdvancedSettings;