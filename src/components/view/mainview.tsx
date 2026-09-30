import './mainview.css'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import type { WeatherViewInfos, CleanViewNames } from '../../types/types'
import officeIcon from '../../assets/office-building.png'
import historyIcon from '../../assets/history.png'
import sunsetSky from '../../assets/sunset-sky.jpg'
import { useEffect, useState } from 'react'
import { countryNames } from '../../types/codes'

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
        <img src={sunsetSky} className='clean-view-backg' alt="Pôr do sol" style={{filter:'brightness(0.7)'}} />
        <div className="clean-view-top">
            <div className="flex-hor-align clean-view">
                <img src={officeIcon} alt="Prédio" loading='lazy' />
                <div className="flex-ver">
                    <h3>Comece pesquisando a sua cidade.</h3>
                    <p>Use o campo de pesquisa acima.</p>
                </div>
            </div>
            <div className="flex-hor-align clean-view-recent">
                <img src={historyIcon} style={{filter: 'invert(1)'}} alt="Histórico" loading='lazy' />
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
      <img src={sunsetSky} className='clean-view-backg' alt="Pôr do sol" style={{filter:'brightness(0.5)'}} />
      <div className="flex-hor-align clean-view-top">
        <div className='loading-spinner'></div>
        <div className="flex-ver" style={{color:'#fff'}}>
          <h3>Pesquisando</h3>
          <p>Aguarde um pouco.</p>
        </div>
      </div>
    </>  
  )
}

export function WeatherView({cityname, timelocal, temperature, mintemp, maxtemp, feelslike, country, description, humidity, windspeed,winddir, lat, lon, visibility, sunrise, sunset, clouds, timezone}: WeatherViewInfos) {
  return(
    <>
      <img src={sunsetSky} className='clean-view-backg' alt="Pôr do sol" />
      <div className="flex-ver weather-view">

        <div className="flex-hor-align weather-view-top">
          <div className="flex-ver weather-view-left">
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
            
            <div style={{width: '100%'}} className='flex-ver'>
              <b style={{textAlign: 'left', width: '100%'}}>Sensação de {feelslike}°</b>
              <b style={{textAlign: 'left', width: '100%'}}>Temperatura em {Math.trunc(Number(temperature)*9/5+32)}°F</b>
            </div>
          </div>

          <div className="flex-ver city-infos-view" style={{width: '100%'}}>
            <h3 className='weather-view-cityname' style={{textAlign: 'left', width: '100%'}}>{description}</h3>
            <div className="flex-hor-align" style={{width: '100%'}}>
              <b style={{textAlign: 'left', width: '100%'}}><b>{timelocal}</b> - {cityname} -&nbsp;
              {country}
              </b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Humidade: {humidity}%&nbsp;-&nbsp;
                {humidity>45?<span>Alto</span>:<span>Baixo</span>}</b>
            </div>
            <div className="flex-hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Força do vento: {windspeed} km/h&nbsp;{windspeed>20?<span>(Forte)</span>:<span>(Leve)</span>} ({winddir}°)</b>
            </div> 
            <div className="flex-hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Visibilidade: {visibility/1000} Km&nbsp;-&nbsp;Nuvens: {clouds}%</b>
            </div> 
            <div className="flex-hor-align" style={{width: '100%'}}>
                {Number(temperature)<5?
                <b>Temperatura negativa, com frio intenso.</b>
                :
                Number(temperature)<17&&Number(temperature)>=5?<b>Temperatura muito baixa, exige agasalhos.</b>:
                Number(temperature)<25&&Number(temperature)>=17?<b>Temperatura agradável, sem frio ou calor excessivo.</b>:
                Number(temperature)<31&&Number(temperature)>=25?<b>Temperatura elevada, com sensação de calor.</b>:
                Number(temperature)<36&&Number(temperature)>=31?<b>Calor intenso e desconfortável.</b>:
                Number(temperature)>=36?<b>Calor excepcional, com temperaturas muito elevadas.</b>:
                null
                }
            </div> 
          </div>
        </div>

        <div className="flex-hor-align weather-view-top">
          <div className="flex-ver weather-view-left">
                {/* PRIMEIRO TESTE DE IMPLEMENTAÇÃO DE MAPAS */}
              <MapContainer center={[lat, lon]} zoom={10} style={{ height: '15rem', width: '15rem' }} >
                  <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[lat, lon]}>
                      <Popup>
                          {cityname}
                      </Popup>
                  </Marker>
              </MapContainer>
          </div>

          <div className="flex-ver city-infos-view" style={{width: '100%'}}>
            <h3 className='weather-view-cityname' style={{textAlign: 'left', width: '100%'}}>Informações de {cityname}</h3>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>País: {countryNames[country.toUpperCase()]?countryNames[country.toUpperCase()].name || country:country.toUpperCase()}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Horário Local: {timelocal} (UTC&nbsp;{timezone/3600})</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Latitude: {lat} - Longitude: {lon}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Amanhecer: {sunrise}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Anoitecer: {sunset}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                {
                  countryNames[country.toUpperCase()]?
                    <b style={{textAlign: 'left', width: '100%'}}>Código de Telefone: +{countryNames[country.toUpperCase()].phoneCode}</b>:
                    null
                  }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}