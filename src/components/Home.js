import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import imageSrc from '../images/mhs.webp';
import { Button } from '@mui/material';
import NearMe from '@mui/icons-material/ArrowOutward';
import Gal from './Gal';
import GalMob from './GalMob';
import Modal from '@mui/material/Modal';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from '@mui/material';
import React from 'react';

function Home({ isMobile, galRef }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const style = {
    color: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '7px',
  background: 'rgba(201, 201, 201, 0.2)', 
  backdropFilter: 'blur(10px)', 
  border: '1px solid rgba(255, 255, 255, 0.3)', 
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' 
};

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
            <Button onClick={handleOpen}
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
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
                  <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.05, ease: 'easeOut' }}
          >
        <Box sx={{ ...style, width: { xs: "auto", md: "auto" } }}>
                            <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Kontaktirajte nas:
          </Typography>
<Box
  component="a"
  href="tel:0038163020909"
  sx={{
    mt: 3,
    p: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    textDecoration: 'none',
    color: 'white', // Inherit color from parent
    transition: 'background-color 0.4s ease-in-out',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#515151'
    },
  }}
>
          <PhoneIcon style={{fontSize:30, cursor: 'pointer' }} />
          <Typography>063/020-909</Typography>
        </Box>
<Box
  component="a"
  href="mailto:example@example.com"
  sx={{
    mt: 3,
    p: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    textDecoration: 'none',
    color: 'white', // Inherit color from parent
    transition: 'background-color 0.4s ease-in-out',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#515151'
    },
  }}
>
          <MailIcon style={{fontSize:30, cursor: 'pointer' }} />
          <Typography>samac.myhome@gmail.com</Typography>
        </Box>
        <Box sx={{ mt: 5, display: 'flex',alignItems:'center', gap: 2, justifyContent: 'flex-end',borderTop:'1px solid',pt: 2 }}>
          <div style={{fontSize:'15px'}}>Društvene mreže:</div>
          <Link href="https://www.instagram.com/myhome_samac/" target="_blank" rel="noopener noreferrer" sx={{color: 'white'}}>
          <InstagramIcon style={{fontSize:40, cursor: 'pointer' }} /></Link>
           <Link href="https://www.facebook.com/MyHome.Samac" target="_blank" rel="noopener noreferrer" sx={{color: 'white'}}>
          <FacebookIcon style={{fontSize:40, cursor: 'pointer' }} /></Link>
        </Box></motion.div>
        </Box></motion.div>
      </Modal>
          </motion.div>
        </motion.div>
      </Box>

      {/* Gallery */}
      <div ref={galRef}>
      {!isMobile ? <Gal /> : <GalMob />}
      </div>
    </>
  );
}

export default Home;
