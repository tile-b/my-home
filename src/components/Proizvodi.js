import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, IconButton, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import z1 from '../images/zavjesa.png';
import z2 from '../images/prozor.png';
import z3 from '../images/komarnik.png';
import z4 from '../images/zaluzine.png';
import z5 from '../images/tenda.png';
import z6 from '../images/ograda.png';
import sub1 from '../images/111.jpeg';
import sub2 from '../images/112.jpg';
import sub3 from '../images/113.webp';
import sub4 from '../images/114.jpeg';

// Subproducts for Zavjese
const zavjeseSubproducts = [
  { 
    id: 's1', 
    name: 'Zebra Zavjese', 
    image: sub1,
    description: 'Zebra zavjese nude kombinaciju prozirnih i neprozirnih traka koje se preklapaju, omogućavajući vam jednostavno podešavanje količine svjetlosti. Idealne su za moderne enterijere koji traže praktičnost i eleganciju.'
  },
  { 
    id: 's2', 
    name: 'Trakaste Zavjese', 
    image: sub2,
    description: 'Trakaste zavjese su funkcionalne i prilagodljive, savršene za poslovne prostore. Omogućavaju kontrolu svjetlosti i privatnosti uz uredan i profesionalan izgled.'
  },
  { 
    id: 's3', 
    name: 'Panel Zavjese', 
    image: sub3,
    description: 'Panel zavjese su savremeno rješenje za velike staklene površine i prostorije s kliznim vratima. Lako se pomjeraju i donose moderan izgled svakom prostoru.'
  },
  { 
    id: 's4', 
    name: 'Paravan Zavjese', 
    image: sub4,
    description: 'Paravan zavjese su idealne za pregrađivanje prostora ili stvaranje privatnosti u većim sobama. Estetski privlačne i funkcionalne, lako se uklapaju u različite stilove uređenja.'
  }
];

// Main product list
const products = [
  { id: 1, name: "Zavjese", icon: <img src={z1} alt='Z' width="150" height="150" />, action: "Pogledaj" },
  { id: 2, name: "PVC", icon: <img src={z2} alt='Z' width="150" height="150" />, action: "Pogledaj" },
  { id: 3, name: "Komarnici", icon: <img src={z3} alt='Z' width="150" height="150" />, action: "Pogledaj" },
  { id: 4, name: "Žaluzine", icon: <img src={z4} alt='Z' width="150" height="150" />, action: "Pogledaj" },
  { id: 5, name: "Tende", icon: <img src={z5} alt='Z' width="150" height="150" />, action: "Pogledaj" },
  { id: 6, name: "Ograde", icon: <img src={z6} alt='Z' width="150" height="150" />, action: "Pogledaj" }
];

function ProductShowcase() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    if (product.id === 1) {
      setSidebarOpen(true);
    } else {
      const category = encodeURIComponent(product.id);
      navigate(`/galerija?category=${category}`);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div style={{ background: '#bebbb6', position: 'relative', zIndex: 0 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Naši proizvodi
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <Typography variant="subtitle1" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
            Idealno rješenje za zaštitu od svih vremenskih uslova.
          </Typography>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
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
                  onClick={() => handleProductClick(product)}
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
                  <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                </Paper>
              </Box>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={closeSidebar}
        disableScrollLock
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            invisible: true
          }
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400, md: 450 },
            backgroundColor: '#cecece',
            boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
            position: 'fixed'
          }
        }}
      >
        <Box sx={{ p: 3, paddingBottom: '0px', paddingTop: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pt: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              Zavjese
            </Typography>
            <IconButton onClick={closeSidebar} sx={{ color: '#666' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
            {zavjeseSubproducts.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Paper 
                  elevation={2}
                  sx={{ 
                    cursor: 'pointer',
                    mb: 3, 
                    p: 3, 
                    borderRadius: 2,
                    backgroundColor: 'white',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img 
                      src={sub.image} 
                      alt={sub.name} 
                      style={{ 
                        width: '100%', 
                        height: '250px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        objectPosition: (() => {
                          switch (sub.id) {
                            case 's1': return 'top';
                            case 's2': return 'bottom';
                            case 's3': return '55% 10%';
                            case 's4': return '20% 30%'; 
                            default: return 'center';
                          }
                        })(),
                        border: '2px solid #e0e0e0'
                      }} 
                    />
                  </Box>

                  <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', color: '#333' }}>
                    {sub.name}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, textAlign: 'justify' }}>
                    {sub.description}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

export default ProductShowcase;
