import React from 'react';
import { Box, Typography, Paper, Button, Container } from '@mui/material';

// Product data
const products = [
  {
    id: 1,
    name: "Zavjese",
    icon: (
      <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20,70 L20,40 L80,40 L80,70" />
        <path d="M15,40 L85,40" />
        <path d="M20,40 L30,25 L70,25 L80,40" />
        <path d="M30,70 L30,60 L45,60 L45,70" />
        <path d="M55,70 L55,60 L70,60 L70,70" />
      </svg>
    ),
    action: "Pogledaj"
  },
  {
    id: 2,
    name: "PVC Stolarija",
    icon: (
      <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="25" y="25" width="50" height="10" />
        <path d="M25,35 L25,70 L75,70 L75,35" />
        <path d="M20,25 L20,70" />
        <path d="M80,25 L80,70" />
        <path d="M25,45 L75,45" />
        <path d="M35,45 L35,70" />
        <path d="M45,45 L45,70" />
        <path d="M55,45 L55,70" />
        <path d="M65,45 L65,70" />
      </svg>
    ),
    action: "Pogledaj"
  },
  {
    id: 3,
    name: "Komarnici",
    icon: (
      <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M50,20 L50,70" />
        <path d="M30,40 C30,30 40,25 50,25 C60,25 70,30 70,40 C70,50 60,55 50,55 C40,55 30,50 30,40 Z" />
      </svg>
    ),
    action: "Pogledaj"
  },
  {
    id: 4,
    name: "Zaluzine",
    icon: (
      <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="25" y="25" width="50" height="50" />
        <rect x="32" y="32" width="16" height="16" />
        <rect x="52" y="32" width="16" height="16" />
        <path d="M25,60 L75,60" />
        <path d="M25,50 L75,50" />
        <path d="M25,40 L75,40" />
        <path d="M25,70 L75,70" />
      </svg>
    ),
    action: "Pogledaj"
  },
  {
    id: 5,
    name: "Tepisi",
    icon: (
      <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M30,50 C30,40 40,35 50,35 C60,35 70,40 70,50" />
        <path d="M25,50 L75,50 L75,65 L25,65 Z" />
        <path d="M30,65 L30,75 L35,75" />
        <path d="M70,65 L70,75 L65,75" />
      </svg>
    ),
    action: "Pogledaj"
  },
  {
  id: 6,
  name: "Ograde",
  icon: (
    <svg viewBox="0 0 100 100" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M30,50 C30,40 40,35 50,35 C60,35 70,40 70,50" />
      <path d="M25,50 L75,50 L75,65 L25,65 Z" />
      <path d="M30,65 L30,75 L35,75" />
      <path d="M70,65 L70,75 L65,75" />
    </svg>
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
        Idealno rešenje za zaštitu od svih vremenskih uslova.
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
              width: 150, // Fixed width for all screen sizes
              mb: 3
            }}
          >
            <Paper 
              elevation={1} 
              sx={{ 
                background:'#d0d0d0',
                height: '12rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                p: 4, 
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ mb: 2, color: 'text.primary' }}>
                {product.icon}
              </Box>
              
              <Typography variant="h6" component="h3" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              
              <Box sx={{ mt: 'auto' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    bgcolor: '#201d17', 
                    '&:hover': {
                      bgcolor: '#7c6e4c'
                    }
                  }}
                >
                  {product.action}
                </Button>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
    </div>
  );
}

export default ProductShowcase;