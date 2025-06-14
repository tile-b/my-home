// src/App.js
import './App.css';
import AppAppBar from './components/AppBar/AppAppBar';
import Home from './components/Home';
import { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Kontakt from './components/Kontakt';
import Proizvodi from './components/Proizvodi';
import Find from './components/Find';
import Footer from './components/Footer';
import FooterTile from './components/FooterTile';
import Galerija from './components/Galerija';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import { Fade } from '@mui/material';

function ScrollToTop() {
  const { pathname } = useLocation();
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  const [isMobile, setIsMobile] = useState(false);
  const location  = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500); // adjust threshold if needed
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const galRef = useRef(null);
  const contRef = useRef(null);

  const scrollToGal = () => galRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => contRef.current?.scrollIntoView({ behavior: 'smooth' });

useEffect(() => {
  const scrollTargets = [
    { key: 'scrollToGal', ref: galRef },
    { key: 'scrollToContact', ref: contRef },
  ];

  for (const { key, ref } of scrollTargets) {
    if (location.state?.[key]) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, document.title);
      break; // Only scroll to the first found target
    }
  }
}, [location, galRef, contRef]);


  return (
    <div className="App">

<Fade in={showScrollTop}>
      <Button 
      onClick={handleScrollToTop}
      sx={{
        position: 'fixed',
        zIndex:'1000',
        bottom: '3vw',
        right: '3vw',
        background:'none',
        border: 'none',
        cursor :'pointer',
        color: 'gray',
        transition: 'color 0.6s ease',
        '&:hover':{
          color: 'black'
        },
      }}><KeyboardArrowUpIcon sx={{
            fontSize: {
      xs: '3rem',  // applies to small and up
      md: '5vw'    // applies to medium and up
    }
      }}/></Button>

</Fade>
      <AppAppBar  scrollToGal={scrollToGal} scrollToContact={scrollToContact}/>
      <ScrollToTop /> {/* Add ScrollToTop here */}

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Home isMobile={isMobile} galRef={galRef} />
              <Proizvodi />
              <Kontakt contRef={contRef} />
              <Find />
            </>
          } 
        />
        <Route path="/galerija" element={<><Galerija /></>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      <Footer />
      <FooterTile />
    </div>
  );
}

export default App;

