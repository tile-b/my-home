import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import imageSrc from '../images/mhs.webp';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Gal from './Gal';
import GalMob from './GalMob'

function Home({isMobile}) {
  return (
    <>
    <Box
      sx={{
        width: '100%',
        height: { xs: '60vh', md: '100vh' },
        pt: { xs: 0, md: '10vw' },
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Dark overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          zIndex: 1,
        }}
      />

      {/* Title with slide-in from left */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: '35%',
          left: '5%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            textAlign: 'left',
            maxWidth: '90%',
            fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' }, // Increase size on larger screens
          }}
        >
          Renoviranje stanova i kuća
        </Typography>

        {/* Subtitle with bottom-to-top animation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            maxWidth: '70%',
            textAlign: 'left',
            marginTop: '5px',
          }}
        >
          <Typography
            variant="h7"
            sx={{
              color: 'rgb(255, 255, 255, 0.7)',
              mt: 2,
              textShadow: '1px 1px 5px rgba(0,0,0,0.5)',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Increase size on larger screens
            }}
          >
            Kvalitetni radovi na jednom mestu. Brzo, precizno i po dogovoru, za svaki dom i budžet.
          </Typography>
        </motion.div>

        {/* Button with increased size on larger screens */}
        <div style={{ display: 'flex', paddingTop: '10px' }}>
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
      </motion.div>
    </Box>
{!isMobile ? (
    <Gal />
) : (
  <div>
<GalMob />
    </div>
)}
 </>
  );
}

export default Home;
