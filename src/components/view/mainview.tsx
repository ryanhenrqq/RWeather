import './mainview.css'

import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import type { WeatherViewInfos, CleanViewNames } from '../../types/types'
import officeIcon from '../../assets/office-building.png'
import historyIcon from '../../assets/history.png'
import sunsetSky from '../../assets/sunset-sky.jpg'
import logo from '../../favicon.png'
import tearIcon from '../../assets/humidity.png'
import windIcon from '../../assets/windy.png'
import eyeIcon from '../../assets/view.png'
import upIcon from '../../assets/up.png'
import downIcon from '../../assets/down.png'
import cloudsIcon from '../../assets/cloud.png'
import diceIcon from '../../assets/dice.png'
import { useEffect, useState } from 'react'
import { countryNames } from '../../types/codes'
import { getRandomPresetLocation } from '../../types/codes'

export function CleanView({onSearch, onLoading, onLoadingFail, geolocPerms}: CleanViewNames) {
    const [recentSearch, setRecentSearch] = useState<string[]>([])

    const handleSearch = (city: string) => {
        console.log("click - cleanview history")
        if (!city.trim()) return
        console.log(city)
        onSearch(city)      // descobrir como limpar o campo de pesquisa apos a funçao dar certo sem afetar aqui!!
    }

    const handleGeolocationSearch = async(lat: number, lon: number) => {
      onLoading()
      let cityname = ''
      if (lat==0&&lon==0) return
      try {
          const res = await fetch(`https://rweather-alpha.vercel.app/api/weather?lat=${lat}&lon=${lon}`)
          if (!res.ok){
              const errData = await res.json()
              throw new Error(errData.error || 'essas coords não foram encontradas')
          }
          const data = await res.json()
          console.log(data)
          cityname = String(data[0].name)
      } catch (err: any) {
          onLoadingFail()
          console.error(err)
          return
      }
      handleSearch(cityname)
    }

    const handleGeoCatch = () => {
        if (navigator.geolocation) { //fins de testes, objetivo de pesquisar sozinho ao entrar no site
            onLoading()
            navigator.geolocation.getCurrentPosition((pos) => {
                const lat = Number(pos.coords.latitude)
                const lon = Number(pos.coords.longitude)
                if (lat==0||lon==0) return
                handleGeolocationSearch(lat, lon)
            }, (error) => {
                onLoadingFail()
                console.error(`Erro ao conseguir geoloc: ${error}`)
            })
        } else {
            console.log('Geolocation não suportado!')
        }
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

          <div className="clean-view-top-hor">
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
                  {
                    geolocPerms?
                      <li className='recent-li' onClick={handleGeoCatch}>
                        {!geolocPerms?'Erro Interno':'Meu Local'}
                      </li>:null
                  }
                  
              </div>
            </div>
            <div className="flex-hor-align clean-view-randon">
              <img src={diceIcon} alt="Dado" loading='lazy' />
              <div className="flex-ver">
                <h3>Conhecer um lugar do mundo?</h3>
                <button onClick={() => handleSearch(getRandomPresetLocation().name)} className='recent-li' style={{fontSize:'30px'}}>Sortear</button>
                <small>Função experimental e ainda em desenvolvimento. Fique atento ao limite de requisições!</small>
              </div>
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

export function WeatherView({cityname, timelocal, temperature, mintemp, maxtemp, feelslike, country, description, humidity, windspeed,winddir, lat, lon, visibility, sunrise, sunset, clouds, timezone, geodata, onSearch}: WeatherViewInfos) {
    const handleSearch = () => {
        console.log("click - random chooser")
        const city = getRandomPresetLocation().name
        if (!city.trim()) return
        console.log(city)
        onSearch(city)      // descobrir como limpar o campo de pesquisa apos a funçao dar certo sem afetar aqui!!
    }

  return(
    <>
      <img src={sunsetSky} className='clean-view-backg' alt="Pôr do sol" />
      <div className="flex-ver weather-view">

        <div className="weather-view-top flex-hor align">
          <img src={logo} alt="Sol - Logo"
            style={{
              width:'30px',
              height:'30px',
              objectFit:'cover',
              marginRight:'10px',
              filter:'invert(1)'
            }}
          />
          <b
            style={{
              fontSize:'28px'
            }}
          >Agora em {cityname} (às {timelocal})</b>
        </div>

        <div className="flex-hor-align weather-view-top">
          <div className="flex-ver weather-view-left">
            <div className='flex-hor-align'>
              <b className='weather-view-temperature'>
                {country!='US'?temperature:Math.trunc(Number(temperature)*9/5+32)}
                </b>
              <div className="flex-ver weather-view-temperature-symbols">
                <b>O</b>
                <b>{country!='US'?`C`:`F`}</b>
              </div>
              <div className="flex-ver weather-view-temperature-symbols">
                <b>
                  <img src={upIcon} alt="Maxima" className='tiny-icons-info' />
                  <span>
                    {country!='US'?maxtemp:Math.trunc(Number(maxtemp)*9/5+32)}°
                    </span>
                </b>
                <b>
                  <img src={downIcon} alt="Minima" className='tiny-icons-info' />
                  <span>{country!='US'?mintemp:Math.trunc(Number(mintemp)*9/5+32)}°</span>
                </b>
              </div>
            </div>
            
            <div style={{width: '100%'}} className='flex-ver'>
              <b style={{textAlign: 'left', width: '100%'}}>Sensação de&nbsp;{country!='US'?feelslike:Math.trunc(Number(feelslike)*9/5+32)}°</b>
              <b style={{textAlign: 'left', width: '100%'}}>Temperatura em&nbsp;
                {country!='US'?`${Math.trunc(Number(temperature)*9/5+32)}°F`:`${temperature}°C`}
                </b>
            </div>
          </div>

          <div className="flex-ver city-infos-view" style={{width: '100%'}}>
            <h3 className='weather-view-cityname' style={{textAlign: 'left', width: '100%'}}>{description}</h3>
            <div className="flex-hor-align" style={{width: '100%'}}>
              <b style={{textAlign: 'left', width: '100%'}}><b>{timelocal}</b>&nbsp;-&nbsp;{cityname}&nbsp;-&nbsp;
              {country}
              </b>
            </div>
            <div className="flex-hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>
                  <img src={tearIcon} alt="Humidade" className='tiny-icons-info' />
                   {humidity}%&nbsp;-&nbsp;
                {humidity>45?<span>Alto</span>:<span>Baixo</span>}</b>
            </div>
            <div className="flex-hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>
                  <img src={windIcon} alt="Vento" className='tiny-icons-info' />
                  {country!='US'?`${windspeed} km/h`:`${Math.trunc(windspeed*0.621371)} mph`}
                  &nbsp;{windspeed>20?<span>(Forte)</span>:<span>(Leve)</span>}&nbsp;({winddir}°)</b>
            </div> 
            <div className="flex-hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>
                  <img src={eyeIcon} alt="Visibilidade" className='tiny-icons-info' />
                  {country!='US'?`${Math.trunc(visibility/1000).toFixed(1)} km`:`${Math.trunc((visibility/1000)*0.621371).toFixed(1)} mi`}
                  &nbsp;-&nbsp;<img src={cloudsIcon} alt="Nuvens" className='tiny-icons-info' /> {clouds}%</b>
            </div> 
            <div className="flex-hor-align" style={{width: '100%'}}>
                {Number(temperature)<5?
                <b style={{textAlign: 'left', width: '100%'}}>Temperatura negativa, com frio intenso.</b>
                :
                Number(temperature)<17&&Number(temperature)>=5?<b style={{textAlign: 'left', width: '100%'}}>Temperatura muito baixa, exige agasalhos.</b>:
                Number(temperature)<25&&Number(temperature)>=17?<b style={{textAlign: 'left', width: '100%'}}>Temperatura agradável, sem frio ou calor excessivo.</b>:
                Number(temperature)<31&&Number(temperature)>=25?<b style={{textAlign: 'left', width: '100%'}}>Temperatura elevada, com sensação de calor.</b>:
                Number(temperature)<36&&Number(temperature)>=31?<b style={{textAlign: 'left', width: '100%'}}>Calor intenso e desconfortável.</b>:
                Number(temperature)>=36?<b style={{textAlign: 'left', width: '100%'}}>Calor excepcional, com temperaturas muito elevadas.</b>:
                null
                }
            </div> 
          </div>
        </div>

        <div className="flex-hor-align weather-view-top">
          <div className="flex-ver weather-view-left">
                {/* PRIMEIRO TESTE DE IMPLEMENTAÇÃO DE MAPAS */}
              <MapContainer center={[lat, lon]} zoom={10} style={{ height: '15rem', width: '15rem', pointerEvents:'none', borderRadius:'8px' }} >
                  <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
          </div>

          <div className="flex-ver city-infos-view" style={{width: '100%'}}>
            <h3 className='weather-view-cityname' style={{textAlign: 'left', width: '100%'}}>Informações de {cityname}</h3>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Província: {geodata?.principalSubdivision}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>País: {geodata?.countryName}</b>
            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b style={{textAlign: 'left', width: '100%'}}>Continente: {geodata?.continent}</b>
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
            <div className="flex hor-align" style={{width: '100%'}}>
              <b>
                {geodata?.localityInfo.administrative[0].name}: {geodata?.localityInfo.administrative[0].description}
                </b>

            </div>
            <div className="flex hor-align" style={{width: '100%'}}>
                <b>
                {geodata?.localityInfo.informative[0].name}: {geodata?.localityInfo.informative[0].description}
                </b>
            </div>
          </div>
        </div>

        <div className="weather-view-top flex-ver">
          <div className="flex-hor-align">
                  <img src={logo} alt="Sol - Logo"
                    style={{
                        width:'28px',
                        height:'28px',
                        objectFit:'cover',
                        marginRight:'10px',
                        filter:'invert(1)'
                      }}
                    />
                  <b style={{fontSize:'22px'}}>Gostou? Sorteie um lugar aleatório no mundo para conhecer!</b>
          </div>
          <button onClick={handleSearch} className='recent-li' style={{fontSize:'30px'}}>Sortear</button>
          <small>Função experimental e ainda em desenvolvimento. Fique atento ao limite de requisições!</small>
        </div>

        <div className="weather-view-top flex-hor align">
            <img src={logo} alt="Sol - Logo"
             style={{
                width:'20px',
                height:'20px',
                objectFit:'cover',
                marginRight:'10px',
                filter:'invert(1)'
              }}
            />
            <b
              style={{
                fontSize:'11px'
              }}
            >Fontes de OpenWeatherMap (Clima) e BigDataCloud (Geolocalização)<br />Feito por <a href="https://www.github.com/ryanhenrqq">Ryan Henrique</a></b>
        </div>
      </div>
    </>
  )
}