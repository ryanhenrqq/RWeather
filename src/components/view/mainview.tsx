import './mainview.css'

import type { WeatherViewInfos, CleanViewNames } from '../../types/types'
import officeIcon from '../../assets/office-building.png'
import historyIcon from '../../assets/history.png'
import { useEffect, useState } from 'react'

export function CleanView({onSearch}: CleanViewNames) {
    const [recentSearch, setRecentSearch] = useState<string[]>([])

    const handleSearch = (city: string) => {
        console.log("click - cleanview history")
        if (!city.trim()) return
        console.log(city)
        onSearch(city)      // descobrir como limpar o campo de pesquisa apos a funçao dar certo sem afetar aqui!!
    }

    useEffect(() => {
        const LastSearches = localStorage.getItem('cities-storage')
        if (LastSearches) {
            setRecentSearch(JSON.parse(LastSearches))
        }
    }, [])

  return (
    <>
        <div className="flex-ver">
            <div className="flex-hor-align clean-view">
                <img src={officeIcon} alt="Prédio" loading='lazy' />
                <div className="flex-ver">
                    <h3>Comece pesquisando a sua cidade</h3>
                    <p>Use o campo de pesquisa acima.</p>
                </div>
            </div>
            <div className="flex-hor-align clean-view">
                <img src={historyIcon} alt="Histórico" loading='lazy' />
                <div className="flex-ver">
                    <h3>Pesquisas recentes</h3>
                    {
                        recentSearch.map((city, index) => (
                            <li key={index} className='recent-li' onClick={() => handleSearch(city)}>
                                {city}
                            </li>
                        ))
                    }
                </div>
            </div>
        </div>
      
    </>
  )
}

export function LoadingInfos() {
  return(
    <>
      <div className="flex-hor-align clean-view">
        <div className='loading-spinner'></div>
        <div className="flex-ver">
          <h3>Pesquisando</h3>
          <p>Aguarde um pouco.</p>
        </div>
      </div>
    </>  
  )
}

export function WeatherView({cityname, timelocal, temperature, mintemp, maxtemp, feelslike, country, description, humidity, windspeed}: WeatherViewInfos) {
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

          <div className="flex-ver" style={{width: '100%'}}>
            <h3 className='weather-view-cityname' style={{textAlign: 'left', width: '100%'}}>{description}</h3>
            <div className="flex-hor-align" style={{width: '100%'}}>
              <b style={{textAlign: 'left', width: '100%'}}><b>{timelocal}</b> - {cityname} - {country}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Humidade: {humidity}%&nbsp;-&nbsp;
                {humidity>45?<span>Alto</span>:<span>Baixo</span>}</b>
            </div>
            <div className="flex-hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Força do vento: {windspeed} km/h&nbsp;{windspeed>20?<span>(Forte)</span>:<span>(Leve)</span>}</b>
                
            </div>
          </div>

        </div>

      </div>
    </>
  )
}