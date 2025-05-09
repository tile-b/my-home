import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import i1 from './icons/message.png';
import i2 from './icons/help.png';
import i3 from './icons/custom.png';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import Call from '@mui/icons-material/Call';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'center'
      }}
    >
      <Box
        component="img"
        src={icon}
        alt={title}
        sx={{
          width: 48,
          height: 48,
          mb: 1
        }}
      />
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        color='rgb(91 91 91)' 
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }, 
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="#5f5f5fdb"
        sx={{ 
          textAlign: 'center',
          width: '100%',
          fontSize: { xs: '0.9rem', sm: '0.8rem', md: '1rem' }, 
        }}
      >
        {description.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Typography>
    </Paper>
  );
};

const Kontakt = () => {
  const features = [
    {
      icon: i1,
      title: "ŽELITE SAVJET",
      description: "Ukoliko želite svoj prostor učiniti elegantnim i funkcionalnim, ali nemate ideja, Mi smo tu da vam pomognemo savjetom, izmjerom i na kraju montažom našeg proizvoda."
    },
    {
      icon: i2,
      title: "IMATE NEKO PITANJE",
      description: "Trebate više informacija?\nŽelite ponudu za usluge izmjere i montaže?\n Postoji nešto da vam nije jasno?"
    },
    {
      icon: i3,
      title: "RADIMO PO MJERI",
      description: "Ukoliko imate posebnih zahtjeva (zidovi s kosinama ili okruglinama), izrađujemo njima prilagođene proizvode."
    }
  ];

  return (
          <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ delay: 0.3,duration: 0.6, ease: 'easeOut' }}
    >
    <Box sx={{ py: 4, background:'#cbcbcb', padding: '0 5vw 0 5vw', marginTop:'7vw' }}>
      <Grid container spacing={2}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </Grid>
        ))}
      </Grid>
      <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: '5px',
              background: '#0f0c06',
              opacity: '90%',
              marginBottom: '30px',
              fontSize: { xs: '0.975rem', sm: '1.1rem', md: '1.2rem' }, // Increase size on larger screens
              padding: { xs: '6px 16px', sm: '8px 20px', md: '10px 24px' }, // Adjust padding for larger screens
              marginTop: {xs: '2rem', sm: '2rem', md: '3rem'},
              transition: 'background-color 0.6s ease',
              '&:hover': {
                backgroundColor: '#7c6e4c',
              }
            }}
          >
            KONTAKTRIJATE NAS
          </Button>
          <List
      sx={{ width: '100%',display: 'grid', justifyContent: 'center', paddingBottom: '3vw'

       }}
      component="nav"
    >
      <ListItemButton sx={{ '&:hover': {borderRight: '2px solid black', borderLeft: '2px solid black'}}}>
        <ListItemIcon>
          <Call />
        </ListItemIcon>
        <ListItemText primary="00387 63 020 909" />
      </ListItemButton>
      <ListItemButton sx={{ '&:hover': {borderRight: '2px solid black', borderLeft: '2px solid black'}}}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="samac.myhome@gmail.com" />
      </ListItemButton>
    </List>

<div style={{borderBottom: '2px solid #685e5e', width: '100%'}}></div>
    </Box>
    </motion.div>
  );
};

export default Kontakt;
