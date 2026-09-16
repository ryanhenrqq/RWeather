import './App.css'

import type { WeatherViewInfos, HeaderFunction, WeatherData } from './types/types'

import searchIcon from './assets/search.png'
import backIcon from './assets/arrow.png'
import infoIcon from './assets/info.png'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)

  const [temperature, setTemperature] = useState(22)
  const [mintemp, setMintemp] = useState(19)
  const [maxtemp, setMaxtemp] = useState(24)
  const [feelslike, setFeelslike] = useState(21)
  const [cityName, setCityName] = useState('City Test')
  const [cityTime, setCityTime] = useState('')

  const handleFetch = async (city: string) => {
    setLoading(true)
    try { 
      const res = await fetch(`https://rweather-alpha.vercel.app/api/weather?city=${encodeURIComponent(city)}`)
      if (!res.ok) {
        throw new Error ("Cidade não encontrada")
      }
      const data: WeatherData = await res.json()
      console.log("bem-sucedido", data)
      setTemperature(Math.trunc(data.main.temp))
      setMaxtemp(Math.trunc(data.main.temp_max))
      setMintemp(Math.trunc(data.main.temp_min))
      setFeelslike(Math.trunc(data.main.feels_like))
      setCityName(data.name)
      setCityTime(getCityTime(data.timezone))
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <Header onSearch={handleFetch} />
      <main>
        {!loading ? <CleanView /> : 
              <WeatherView cityname={cityName}
                    timelocal={cityTime}
                    temperature={temperature}
                    mintemp={mintemp}
                    maxtemp={maxtemp}
                    feelslike={feelslike}
          />}
        <footer className='flex-ver'>
          <b>Images Atributes here:</b>
          <ul>
            <li><a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Good Ware - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/magnifying-glass" title="magnifying glass icons">Magnifying glass icons created by Royyan Wijaya - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/info" title="info icons">Info icons created by Magnific - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Magnific - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Kirill Kazachek - Flaticon</a></li>
          </ul>
        </footer>
      </main>
      
    </>
  )
}

function Header({onSearch}: HeaderFunction) {
  const [city, setCity] = useState('')
  const handleSearch = () => {
    console.log("click - header")
    if (!city.trim()) return
    onSearch(city)
  }
  return (
    <>
      <header>
        <div className="left-side-header flex-hor-align">
          <img src="/favicon.png" alt="Logo" />
          <h1>RWeather</h1>
        </div>
        <div className="middle-side-header flex-hor-align">
          <input type="text" name="search-bar" placeholder='Buscar cidades...' value={city} onChange={(e) => setCity(e.target.value)} />
          <img src={searchIcon} alt="Pesquisar" onClick={handleSearch} />
        </div>
        <div className="right-side-header flex-hor-align">
          <img src={backIcon} alt="Voltar" />
          <img src={infoIcon} alt="Info" />
        </div>
      </header>
    </>
  )
}

function CleanView() {
  return (
    <>
      <div className="flex-hor-align clean-view">
        <img src={searchIcon} alt="Pesquisa" />
        <div className="flex-ver">
          <h3>Comece pesquisando a sua cidade</h3>
          <p>Use o campo de pesquisa acima.</p>
        </div>
      </div>
    </>
  )
}

function WeatherView({cityname, timelocal, temperature, mintemp, maxtemp, feelslike}: WeatherViewInfos) {
  return(
    <>
      <div className="flex-ver weather-view">
        <div className="flex-hor-align weather-view-top">
          <div className="flex-ver">
            <div className='flex-hor-align'>
              <b className='weather-view-temperature'>{temperature}</b>
              <div className="flex-ver weather-view-temperature-symbols">
                <b>O</b>
                <b>C</b>
              </div>
              <div className="flex-ver weather-view-temperature-symbols">
                <b>+{maxtemp}°</b>
                <b>-{mintemp}°</b>
              </div>
            </div>
            <div style={{width: '100%'}}>
              <b style={{textAlign: 'left', width: '100%'}}>Sensação de {feelslike}°</b>
            </div>
          </div>

          <div className="flex-ver">
            <h3 className='weather-view-cityname'>{cityname}</h3>
            <div className="flex-hor-align" style={{width: '100%'}}>
              <b style={{textAlign: 'left', width: '100%'}}>{timelocal}</b>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export function getCityTime(timezoneOffsetInSeconds: number): string {
  const now = new Date();
  const localOffsetInMs = now.getTimezoneOffset() * 60 * 1000;
  const utcTimeInMs = now.getTime() + localOffsetInMs
  const cityTimeInMs = utcTimeInMs + (timezoneOffsetInSeconds * 1000);
  const cityDate = new Date(cityTimeInMs);
  return cityDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default App
