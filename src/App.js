// src/App.js
import './App.css';
import AppAppBar from './components/AppBar/AppAppBar';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Kontakt from './components/Kontakt';
import Proizvodi from './components/Proizvodi';
import Find from './components/Find';
import Footer from './components/Footer';
import FooterTile from './components/FooterTile';
import Galerija from './components/Galerija';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="App">
      <AppAppBar />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Home isMobile={isMobile} />
              <Proizvodi />
              <Kontakt />
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
