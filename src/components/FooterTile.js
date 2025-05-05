import React from "react";
import '../components/css/footerTile.css'
import logoT from '../images/logoT.png'


const FooterTile = (isMobile) => {

    const footerStyle = {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
        position: 'static',
        left: 0,
        bottom: 0,
        height: '1rem', 
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center',
      };

return(
    
    <footer className='footer' style={footerStyle}>

    <span style={{display: 'inline-block', width: '40px', height: '40px',paddingRight: '5px'}}>
      <a href='https://github.com/tile-b'  target="_blank" rel="noopener noreferrer">
    <img style={{
      width: '100%',height: '100%',
      objectFit: 'contain', 
      filter: 'drop-shadow(0 0 0.5px rgba(255, 255, 255, 0.5))',
      cursor:'pointer'
      }} src={logoT} alt='T'></img></a>
    </span>
  <span style={{fontSize:'12px'}}>&nbsp;made by Tile</span>
  
    <span style={{ marginLeft: 'auto' ,marginRight: '40px'}}>
        &copy; 2025 MyHome&nbsp; Sva prava zadrzana</span>
  </footer>
);

}
export default FooterTile;