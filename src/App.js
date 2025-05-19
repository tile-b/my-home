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
import AdminPanel from './components/AdminPanel';

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
        <Route path="/galerija" element={<><Galerija /><AdminPanel /></>} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      <Footer />
      <FooterTile />
    </div>
  );
}

export default App;

