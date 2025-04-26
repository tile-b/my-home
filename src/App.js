import './App.css';
import AppAppBar from './components/AppBar/AppAppBar';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import Kontakt from './components/Kontakt';
import Proizvodi from './components/Proizvodi';
import Find from './components/Find'

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
    {!isMobile ? (<Find />): (<></>)}
    <Kontakt />

<div style={{paddingTop:'1000px'}}></div>
</div>

</>
);
}

export default App;
