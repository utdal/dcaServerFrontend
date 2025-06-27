import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SEECGraph from '../components/SEECGraph';
import Button from '@mui/material/Button'
import { TextField, Tooltip } from '@mui/material';
import './SEEC.css';
import { Link } from 'react-router-dom';

const SEEC = () => {
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        navigate('/seec-results');

        return{

        }
    }
    return ( 
        <div style={{}}>
        <TopBar>
            <li>
                <a href='https://morcoslaboratory.org/'>
                Morcos Lab
                </a>
            </li>
            <li>
                <Link to='/'>
                Home
                </Link>
            </li>
        </TopBar>
        <form onSubmit={handleSubmit}>
            <div style={{marginTop:'50px'}}>
              <Tooltip title='Sequence evolution with epistatic contributions'>
                <Button variant='text'
                sx={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  minWidth: 0,
                  textTransform: 'none',
                  color: 'inherit',
                  boxShadow: 'none',
                  fontSize: '40px',
                  fontWeight: 'bold'
                }}
                >
                  SEEC
                </Button>
              </Tooltip>
            </div>


            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, margin: '10px 20px' }}>
              Submit
            </Button>
          </form>
        </div>
    );
}
 
export default SEEC;