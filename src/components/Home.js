import React from 'react';
import Box from '@mui/material/Box';
import imageSrc from '../images/mhs1.webp';

function Home() {
  return (
<Box
  sx={{
    width: '100%',
    height: { xs: '60vh', md: '100vh' },
    pt: { xs: 0, md: '10vw' }, // 👈 margin top: 0 for small screens, 100px for md+
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
/>

  );
}

export default Home;
