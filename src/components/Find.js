import React from "react";
import './css/gal.css';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import vid from '../images/vide.mp4';
import { Box } from "@mui/material";

export default function Find() {
  return (
    <div className="gal-wrapper">
      <div className="text-section" style={{paddingLeft: '10rem'}}>
        <h1 style={{fontSize :'3rem'}}>Kako do nas</h1>
        <p>Nalazimo se u <b>TC Bingo</b> Šamac</p>
        <p>Posjetite nas uzivo, ili pogledajte nase  </p>
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
      <Box
  sx={{
    width: '50%',
    height: { xs: '40vh', md: '50vh' },
    pt: { xs: 0, md: '10vw' },
    position: 'relative',
    margin: '10%',
    borderRadius: '10px',
    overflow: 'hidden', // ensure video stays within bounds
  }}
>
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '10px',
      zIndex: 0
    }}
  >
    <source src={vid} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Any other content inside the Box can go here, and should be above the video */}
</Box>

    </div>
  );
}

  