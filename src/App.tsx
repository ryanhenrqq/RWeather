import './App.css'

import searchIcon from './assets/search.png'
import backIcon from './assets/arrow.png'
import infoIcon from './assets/info.png'

function App() {
  return (
    <>
      <Header />
      <h1>Hello, World!</h1>
      <p>Meet RWeather, a RHS Code project!</p>
      <footer>
        <b>Images Atributes here:</b>
        <ul>
          <li><a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Good Ware - Flaticon</a></li>
          <li><a href="https://www.flaticon.com/free-icons/magnifying-glass" title="magnifying glass icons">Magnifying glass icons created by Royyan Wijaya - Flaticon</a></li>
          <li><a href="https://www.flaticon.com/free-icons/info" title="info icons">Info icons created by Magnific - Flaticon</a></li>
          <li><a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Magnific - Flaticon</a></li>
          <li><a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Kirill Kazachek - Flaticon</a></li>
        </ul>
      </footer>
    </>
  )
}

function Header() {
  return (
    <>
      <header>
        <div className="left-side-header flex-hor-align">
          <img src="/favicon.png" alt="Logo" />
          <h1>RWeather</h1>
        </div>
        <div className="middle-side-header flex-hor-align">
          <input type="text" name="search-bar" placeholder='Buscar cidades...' />
          <img src={searchIcon} alt="Pesquisar" />
        </div>
        <div className="right-side-header flex-hor-align">
          <img src={backIcon} alt="Voltar" />
          <img src={infoIcon} alt="Info" />
        </div>
      </header>
    </>
  )
}

export default App
