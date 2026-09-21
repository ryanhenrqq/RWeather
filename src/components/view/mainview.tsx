import './mainview.css'

import type { WeatherViewInfos } from '../../types/types'
import searchIcon from '../../assets/search.png'

export function CleanView() {
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

export function LoadingInfos() {
  return(
    <>
      <div className="flex-hor-align clean-view">
        <img src={searchIcon} alt="Pesquisa" />
        <div className="flex-ver">
          <h3>Pesquisando</h3>
          <p>Aguarde um pouco.</p>
        </div>
      </div>
    </>  
  )
}

export function WeatherView({cityname, timelocal, temperature, mintemp, maxtemp, feelslike, country, description}: WeatherViewInfos) {
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
              <b style={{textAlign: 'left', width: '100%'}}>{timelocal} - {country} - {description}</b>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}