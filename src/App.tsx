import './App.css'

import type { WeatherData } from './types/types'
import { Header } from './components/header/header'
import { CleanView, WeatherView, LoadingInfos } from './components/view/mainview'

import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const [weatherview, setWeatherview] = useState(false)
  const [errStatus, setErrStatus] = useState('')

  const [temperature, setTemperature] = useState(0)
  const [mintemp, setMintemp] = useState(0)
  const [maxtemp, setMaxtemp] = useState(0)
  const [feelslike, setFeelslike] = useState(0)
  const [cityName, setCityName] = useState('')
  const [countryName, setCountryName] = useState('')
  const [cityTime, setCityTime] = useState('')
  const [description, setDescription] = useState('')
  const [windSpeed, setWindSpeed] = useState(0)
  const [humidity, setHumidity] = useState(0)

  const handleFetch = async (city: string) => {
    setLoading(true)
    setErrStatus('')
    try { 
      const res = await fetch(`https://rweather-alpha.vercel.app/api/weather?city=${encodeURIComponent(city)}`)
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Cidade não encontrada.');
      }
      const data: WeatherData = await res.json()
      if (data.cod === '404') {
        throw new Error('Cidade não encontrada');
      }
      console.log("bem-sucedido", data)
      setTemperature(Math.trunc(data.main.temp))
      setMaxtemp(Math.trunc(data.main.temp_max))
      setMintemp(Math.trunc(data.main.temp_min))
      setFeelslike(Math.trunc(data.main.feels_like))
      setCityName(data.name)
      setCityTime(getCityTime(data.timezone))
      setCountryName(data.sys.country)
      setDescription(data.weather[0].description)
      setHumidity(data.main.humidity)
      setWindSpeed(Math.trunc(data.wind.speed))
      setWeatherview(true)
    } catch (err: any) {
      console.error(err)
      setErrStatus(String(err))
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setLoading(false)
    setWeatherview(false)

    setTemperature(0)
    setMintemp(0)
    setMaxtemp(0)
    setFeelslike(0)
    setCityName('')
    setCityTime('')
    setCountryName('')
    setDescription('')
  }
  return (
    <>
      <Header onBack={handleClear} onSearch={handleFetch} error={errStatus} />
      <main>
        {weatherview ? 
              <WeatherView cityname={cityName}
                    timelocal={cityTime}
                    temperature={temperature}
                    mintemp={mintemp}
                    maxtemp={maxtemp}
                    feelslike={feelslike}
                    country={countryName}
                    description={description}
                    humidity={humidity}
                    windspeed={windSpeed}
          /> :
          !loading ? <CleanView /> : <LoadingInfos />
        }
      </main>
      
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
