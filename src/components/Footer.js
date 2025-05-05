import React from 'react';
import { Box, Container, Grid, Typography, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from '../images/logoMyHome.png';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Common styles for social media icons
  const socialIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid white',
    color: 'white',
    '&:hover': {
      bgcolor: '#262626',
      color: 'white',
    },
  };

  return (
    <div style={{background:'#858585'}}>
    <Box
      component="footer"
      sx={{
        bgcolor: '#858585', // Light beige background similar to the example
        py: 4,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo section */}
          <Grid item xs={12} md={3} sx={{ 
            display: 'flex', 
            justifyContent: isMobile ? 'center' : 'flex-start',
            mb: isMobile ? 2 : 0 
          }}>
            <img 
              src={logo} 
              alt="MyHome Logo" 
              style={{ 
                maxWidth: '200px',
                height: 'auto'
              }} 
            />
          </Grid>

          {/* Right side columns */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {/* Address column */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: isMobile ? 'center' : 'left' }}>
                  Adresa
                </Typography>
                <Typography variant="body2" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                  TC Bingo
                </Typography>
                <Typography variant="body2" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                 76230 Bosanski Šamac
                </Typography>
                <Typography variant="body2" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                  (prizemlje)
                </Typography>
              </Grid>

              {/* Contact column */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: isMobile ? 'center' : 'left' }}>
                  Kontakt
                </Typography>
                <Typography variant="body2" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                  <Link href="tel:00387-63/020-909" underline="hover" color="inherit">
                    063/020-909
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                  <Link href="samac.myhome@gmail.com" underline="hover" color="inherit">
                    samac.myhome@gmail.com
                  </Link>
                </Typography>
              </Grid>

              {/* Social media column */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: isMobile ? 'center' : 'left' }}>
                  Društvene mreže
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', gap: 2 }}>
                  <Link
                    href="https://www.instagram.com/myhome_samac/"
                    target="_blank"
                    rel="noopener"
                    sx={socialIconStyle}
                  >
                    <InstagramIcon />
                  </Link>
                  
                  <Link
                    href="https://www.facebook.com/MyHome.Samac"
                    target="_blank"
                    rel="noopener"
                    sx={socialIconStyle}
                  >
                    <FacebookIcon />
                  </Link>
                  
                  <Link
                    href="https://wa.me/38763020909"
                    target="_blank"
                    rel="noopener"
                    sx={socialIconStyle}
                  >
                    <WhatsAppIcon />
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </div>
  );
};

export default Footer;