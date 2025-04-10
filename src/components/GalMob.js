import React from "react";
import './css/galmob.css'
import m3 from '../images/mh3.jpg';
import { Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ProductFeatures from "./ProductFeatures";


export default function Gal() {

  return (
    <div className="tss">
    <h2 style={{fontSize :'2rem', fontWeight: '1000', textAlign: 'left', paddingLeft: '1rem',}}>Čime se bavimo</h2>

<Box
      sx={{
        width: '80%',
        height: { xs: '40vh', md: '100vh' },
        pt: { xs: 0, md: '10vw' },
        backgroundImage: `url(${m3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        margin: '10%',
        borderRadius: '10px'
      }}
    ></Box>
<ProductFeatures />
<Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: '5px',
              background: '#74653f',
              opacity: '90%',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' }, // Increase size on larger screens
              padding: { xs: '6px 16px', sm: '8px 20px', md: '10px 24px' }, // Adjust padding for larger screens
              marginTop: {xs: '0', sm: '0', md: '3rem'}
            }}
          >
  Pogledajte Galeriju
</Button>
</div>
  )}