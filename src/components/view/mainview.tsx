import './mainview.css'

import type { WeatherViewInfos } from '../../types/types'
import officeIcon from '../../assets/office-building.png'

export function CleanView() {
  return (
    <>
      <div className="flex-hor-align clean-view">
        <img src={officeIcon} alt="Prédio" loading='lazy' />
        <div className="flex-ver">
          <h3>Comece pesquisando a sua cidade</h3>
          <p>Use o campo de pesquisa acima.</p>
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