import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import i1 from './icons/usluge.png'; // Replace with your actual import paths
import i2 from './icons/colSelect.png'; 
import i3 from './icons/ponuda.png'; 

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2,
        pl: '2rem', 
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'flex-start' // Align items to the left
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mb: 1
      }}>
        <Box 
          component="img" 
          src={icon} 
          alt={title}
          sx={{ 
            width: 32, 
            height: 32,
            mr: 1.5 // Add margin to the right of the icon
          }} 
        />
        <Typography variant="h6" fontWeight="bold" color='rgb(108 94 55)' sx={{fontSize: '1.5rem'}}>
          {title}
        </Typography>
      </Box>
      <Typography 
        variant="body2" 
        color="#5f5f5f"
        sx={{ textAlign: 'left', width: '100%',
          fontSize: {
          md:'0.9rem',
          lg:'1.1rem' 
          }
        }} 
      >
        {description}
      </Typography>
    </Paper>
  );
};

const ProductFeatures = () => {
  const features = [
    {
      icon: i1,
      title: "Usluge",
      description: "Izrada, ugradnja i montaža svih vrsta zaštite objekata od svjetlosti."
    },
    {
      icon: i2,
      title: "Vi Birate",
      description: "Veliki izbor boja, dezena, veličina, sve po vašoj mjeri."
    },
    {
      icon: i3,
      title: "U Ponudi",
      description: "PVC Stolarija, Zavjese, Tepisi, Staze, Tende, Žaluzine i jos mnogo toga."
    }
  ];

  return (
<Box sx={{ py: 1 }}>
  <Grid container direction="column" spacing={2}>
    {features.map((feature, index) => (
      <Grid item key={index}>
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

export default ProductFeatures;