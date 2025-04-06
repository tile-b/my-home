import logo from './logo.svg';
import './App.css';
import AppAppBar from './components/AppBar/AppAppBar';
import Home from './components/Home';


function App() {
  return (
    <>

    <div className="App">
    <Home />
    <AppAppBar />


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
<div style={{paddingBottom: '10px'}}>
          Šamac
</div>
<div class="spinnerContainer">
  <div class="loader">
    Uskoro
    <div class="words">
      <span class="word">Zavjese</span>
      <span class="word">Komarnici</span>
      <span class="word">PVC Stolarija</span>
      <span class="word">Tepisi</span>
      <span class="word">Staze</span>
      <span class="word">Zavjesni Paravani</span>
      <span class="word">Ograde</span>
      <span class="word">Zaluzine</span>
    </div>
  </div>
</div>

      </header>
      <div style={{paddingTop: '1000px'}}>
&nbsp;
</div>
</div>
<div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1300 }}>
  <div
    style={{
      height: '10vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
      fontWeight: 'bold',
      padding: '15px',
    }}
  >
    Napomena: Sajt je trenutno u izradi i sve prikazano je podložno promjenama!!
  </div>
</div>

</>
);
}

export default App;
