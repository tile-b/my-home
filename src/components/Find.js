import React from "react";
import './css/gal.css';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Find() {
  return (
    <div className="gal-wrapper" style={{background:'#bebbb6'}}>
      <div className="text-section" style={{paddingLeft: '10rem'}}>
        <h1 style={{fontSize :'3rem'}}>Kako do nas</h1>
        <p>Nalazimo se u <b>TC Bingo</b> Šamac</p>
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
            Kontakt
          </Button>
      </div>

    </div>
  );
}

  