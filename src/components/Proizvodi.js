import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import z1 from '../images/zavjesa.png';
import z2 from '../images/prozor.png';
import z3 from '../images/komarnik.png';
import z4 from '../images/zaluzine.png';
import z5 from '../images/tepih.png';
import z6 from '../images/ograda.png';

// Product data
const products = [
  {
    id: 1,
    name: "Zavjese",
    icon: <img src={z1} alt='Z' width="150" height="150" />,
    action: "Pogledaj"
  },
  {
    id: 2,
    name: "PVC",
    icon: <img src={z2} alt='Z' width="150" height="150" />,
    action: "Pogledaj"
  },
  {
    id: 3,
    name: "Komarnici",
    icon: <img src={z3} alt='Z' width="150" height="150" />,
    action: "Pogledaj"
  },
  {
    id: 4,
    name: "Zaluzine",
    icon: <img src={z4} alt='Z' width="150" height="150" />,
    action: "Pogledaj"
  },
  {
    id: 5,
    name: "Tepisi",
    icon: <img src={z5} alt='Z' width="150" height="150" />,
    action: "Pogledaj"
  },
  {
    id: 6,
    name: "Ograde",
    icon: <img src={z6} alt='Z' width="150" height="150" />,
    action: "Pogledaj"
  }
];

function ProductShowcase() {
  return (
    <div style={{ background: '#bebbb6' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2,duration: 0.6, ease: 'easeOut' }}
>
  <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
    Naši proizvodi
  </Typography>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
>
  <Typography variant="subtitle1" align="center" sx={{ mb: 6, color: 'text.secondary', paddingBottom: '10px' }}>
    Idealno rješenje za zaštitu od svih vremenskih uslova.
  </Typography>
</motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}
        >
          {products.map((product, index) => (
            <motion.li
  key={product.id}
  initial={{ y: 20, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
  style={{ listStyle: 'none' }}
>

              <Box sx={{ width: 160, mb: 3 }}>
                <Paper
                  elevation={1}
                  sx={{
                    backgroundColor: '#a4a4a4',
                    color: 'black',
                    height: '12rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.4s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3,
                      backgroundColor: 'rgb(117, 117, 116)',
                      cursor: 'pointer',
                      color: 'white'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {product.icon}
                  </Box>

                  <Typography variant="h6" component="h3" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                </Paper>
              </Box>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </div>
  );
}

export default ProductShowcase;
