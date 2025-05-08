import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import z1 from '../images/zavjesa.png'
import z2 from '../images/prozor.png'
import z3 from '../images/komarnik.png'
import z4 from '../images/zaluzine.png'
import z5 from '../images/tepih.png'
import z6 from '../images/ograda.png'

// Product data
const products = [
  {
    id: 1,
    name: "Zavjese",
    icon: (
      <img src={z1} alt='Z' width="150" height="150">
      </img>
    ),
    action: "Pogledaj"
  },
  {
    id: 2,
    name: "PVC",
    icon: (
      <img src={z2} alt='Z' width="150" height="150">
      </img>
    ),
    action: "Pogledaj"
  },
  {
    id: 3,
    name: "Komarnici",
    icon: (
      <img src={z3} alt='Z' width="150" height="150">
      </img>
    ),
    action: "Pogledaj"
  },
  {
    id: 4,
    name: "Zaluzine",
    icon: (
      <img src={z4} alt='Z' width="150" height="150">
      </img>
    ),
    action: "Pogledaj"
  },
  {
    id: 5,
    name: "Tepisi",
    icon: (
      <img src={z5} alt='Z' width="150" height="150">
      </img>
    ),
    action: "Pogledaj"
  },
  {
  id: 6,
  name: "Ograde",
  icon: (
    <img src={z6} alt='Z' width="150" height="150">
      </img>
  ),
  action: "Pogledaj"
}
];

function ProductShowcase() {
  return (
    <div style={{background: '#bebbb6'}}>
    <Container maxWidth="lg" sx={{ py: 6, }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Naši proizvodi
      </Typography>
      
      <Typography variant="h7" align="center" sx={{ mb: 6, color: 'text.secondary', paddingBottom: '10px' }}>
        Idealno rješenje za zaštitu od svih vremenskih uslova.
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        gap: 3,
        mt: 2
      }}>
        {products.map((product) => (
          <Box 
            key={product.id} 
            sx={{ 
              width: 160, // Fixed width for all screen sizes
              mb: 3
            }}
          >
<Paper 
  elevation={1} 
  sx={{ 
    backgroundColor: '#a4a4a4',
    color:'black',
    height: '12rem', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    p: 4, 
    borderRadius: 2,
    transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.7s ease-in-out', // background-color transition added
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 3,
      backgroundColor: 'rgb(153 130 76)', 
      cursor: 'pointer',
      color: 'white'
    }
  }}
>
              <Box sx={{ mb: 2, color: 'text.primary' }}>
                {product.icon}
              </Box>
              
              <Typography variant="h6" component="h3" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
    </div>
  );
}

export default ProductShowcase;