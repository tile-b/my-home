import { useState } from 'react';
import { Clock, Navigation } from 'lucide-react';
import '../components/css/galmob.css'
import bingo from '../images/bingo.jpeg'

export default function KakoDoNas() {
  const [aktivnaKartica, setAktivnaKartica] = useState('lokacija');

  const mobile = window.innerWidth < 1000;

  return (
    <div className="kdn-container">
      <h2 className="kdn-title">Kako do nas</h2>

      <div className="kdn-tabs">
        <div style={{display: 'flex',width:'fit-content' , borderBottom: '1px solid white'}}>
        <button
          className={`kdn-tab ${aktivnaKartica === 'lokacija' ? 'active' : ''}`}
          onClick={() => setAktivnaKartica('lokacija')}
        >
          <Navigation className="mr-2 w-5 h-5" />
          Lokacija
        </button>
        <button
          className={`kdn-tab ${aktivnaKartica === 'radno' ? 'active' : ''}`}
          onClick={() => setAktivnaKartica('radno')}
        >
          <Clock className="mr-2 w-5 h-5" />
          Radno vreme
        </button>
        </div>
      </div>

      {aktivnaKartica === 'lokacija' && (
        <div className="kdn-section">
          <div className='kk'>
            <div className="kdn-half">
              <h3>Naša lokacija</h3>
              <p className="mb-4">
                Nalazimo se u tržnom centru Bingo u Šamcu, na prvom spratu, lokal br. 15.
              </p>
              <div className="mb-4">
                <h4>Adresa:</h4>
                <p>TC Bingo Šamac</p>
                <p>Cara Dušana 3</p>
                <p>76230 Šamac</p>
                <p>Bosna i Hercegovina</p>
              </div>
            </div>
            <div className="kdn-half">
              <img
                src={bingo}
                alt="Prodavnica u TC Bingo Šamac"
                className="kdn-img"
                style={{
                  width: mobile ? '18rem' : '20vw',
                  height: 'auto'
                }}
              /></div>
                        </div>
              <div className='kdn-half'>
              <div className="kdn-note">
                Besplatan parking je dostupan ispred tržnog centra za sve naše kupce!
              </div>
            </div>

        </div>
      )}

      {aktivnaKartica === 'radno' && (
        <div className="kdn-section">
          <h3>Radno vreme</h3>
          <div className="kdn-flex">
            <div className="kdn-half" style={{display: 'flex', justifyContent: 'center'}}>
              <table className="kdn-table" style={{border: '1px solid', padding: '20px', boxShadow: '7px 7px 0px 0px #353535'}}>
                <tbody>
                  <tr>
                    <td className="label">Radni Dan: &nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className="text-right">09:00 - 21:00</td>
                  </tr>
                  <tr>
                    <td className="label">Subota:</td>
                    <td className="text-right">09:00 - 20:00</td>
                  </tr>
                  <tr>
                    <td className="label" style={{color: '#911b1b'}}>Nedelja:</td>
                    <td className="text-right">10:00 - 18:00</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <div className='kdn-half'>
              <div className="kdn-warning">
                <strong>Napomena:</strong> Tokom državnih praznika radno vreme može biti izmenjeno. 
                Pratite naše objave na društvenim mrežama za ažurirane informacije.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
