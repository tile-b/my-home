import logo from './logo.svg';
import './App.css';
import AppAppBar from './components/AppBar/AppAppBar';


function App() {
  return (
    <>

    <div className="App">

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

</>
);
}

export default App;
