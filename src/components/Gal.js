import React from "react";
import './css/gal.css';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import m1 from '../images/mh1.jpg';
import m2 from '../images/mh2.jpg';
import m3 from '../images/mh3.jpg';
import ProductFeaturesD from "./ProductFeaturesD";

export default function Gal() {
  return (
    <div className="gal-wrapper">
      <div className="container">
        <div className="card">
          <img src={m1} alt="1" />
        </div>
        <div className="card">
          <img src={m3} alt="1" />
        </div>
        <div className="card">
          <img src={m2} alt="1" />
        </div>
      </div>
      <div className="text-section">
        <h1 style={{fontSize :'3rem'}}>Čime se bavimo</h1>
<ProductFeaturesD />
        <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: '5px',
              background: '#74653f',
              opacity: '90%',
              marginLeft:'20px',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' }, // Increase size on larger screens
              padding: { xs: '6px 16px', sm: '8px 20px', md: '10px 24px' }, // Adjust padding for larger screens
              marginTop: {xs: '0', sm: '0', md: '3rem'},
              transition: 'background-color 0.6s ease',
              '&:hover': {
                backgroundColor: '#0f0c06',
              }
            }}
          >
            Galerija
          </Button>
      </div>
    </div>
  );
}

  