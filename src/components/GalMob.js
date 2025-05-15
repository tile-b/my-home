import React from "react";
import './css/galmob.css'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ProductFeatures from "./ProductFeatures";
import ImageSlider from "./ImageSlider";
import { Link } from 'react-router-dom';



export default function Gal() {

  return (
    <div className="tss">
    <h2 style={{fontSize :'2rem', fontWeight: '1000', textAlign: 'left', paddingLeft: '1rem',}}>Čime se bavimo</h2>


      <ImageSlider />

<ProductFeatures />
<Button
            component={Link}
             to="/galerija"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: '5px',
              background: '#74653f',
              opacity: '90%',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' }, // Increase size on larger screens
              padding: { xs: '6px 16px', sm: '8px 20px', md: '10px 24px' }, // Adjust padding for larger screens
              marginTop: {xs: '0', sm: '0', md: '3rem'},
              marginBottom: '5vw',
              '&:hover': {background: '#0f0c06'}
            }}
          >
  Pogledajte Galeriju
</Button>
</div>
  )}