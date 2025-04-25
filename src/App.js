import logo from './logo.svg';
import './App.css';
import AppAppBar from './components/AppBar/AppAppBar';
import Home from './components/Home';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Proizvodi from './components/Proizvodi';

function App() {

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000); // Adjust the breakpoint as needed
  };

  handleResize(); // Set initial state
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  return (
    <>

    <div className="App">
    <Home isMobile={isMobile} />
    <AppAppBar />
    <Proizvodi />

<div style={{paddingTop:'1000px'}}></div>
</div>

</>
);
}

export default App;
