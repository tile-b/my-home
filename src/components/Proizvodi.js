import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import i1 from './icons/message.png';
import i2 from './icons/help.png';
import i3 from './icons/custom.png';

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
          fontSize: '1.5rem',
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
          fontSize: '1rem' 
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

const Proizvodi = () => {
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
    <Box sx={{ py: 4, background:'#7c6e4c2b', padding: '0 5vw 0 5vw', marginTop:'7vw' }}>
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
    </Box>
  );
};

export default Proizvodi;
