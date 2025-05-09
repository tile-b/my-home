import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import imageSrc from '../images/mhs.webp';
import { Button } from '@mui/material';
import NearMe from '@mui/icons-material/ArrowOutward';
import Gal from './Gal';
import GalMob from './GalMob';

function Home({ isMobile }) {
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
        {/* Dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 4 }}
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

        {/* Content wrapper */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '35%',
            left: '5%',
            transform: 'translateY(-50%)',
            zIndex: 2,
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
              textAlign: 'left',
              maxWidth: '90%',
              fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
            }}
          >
            Renoviranje stanova i kuća
          </Typography>

          {/* Subtitle */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1, ease: 'easeOut' }}
            style={{
              maxWidth: '70%',
              textAlign: 'left',
              marginTop: '5px',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgb(255, 255, 255, 0.7)',
                mt: 2,
                textShadow: '1px 1px 5px rgba(0,0,0,0.5)',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              }}
            >
              Kvalitetni radovi na jednom mestu. Brzo, precizno i po dogovoru, za svaki dom i budžet.
            </Typography>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
            style={{ display: 'flex', paddingTop: '10px' }}
          >
            <Button
              variant="contained"
              endIcon={<NearMe />}
              sx={{
                borderRadius: '5px',
                background: '#74653f',
                fontWeight: 'bold',
                opacity: '90%',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' },
                padding: { xs: '6px 16px', sm: '8px 20px', md: '10px 24px' },
                marginTop: { xs: '0', sm: '0', md: '3rem' },
                transition: 'background-color 0.6s ease',
                '&:hover': {
                  backgroundColor: '#0f0c06',
                },
              }}
            >
              Kontakt
            </Button>
          </motion.div>
        </motion.div>
      </Box>

      {/* Gallery */}
      {!isMobile ? <Gal /> : <GalMob />}
    </>
  );
}

export default Home;
