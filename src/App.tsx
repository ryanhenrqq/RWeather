import './App.css'

import type { WeatherData } from './types/types'
import { Header } from './components/header/header'
import { CleanView, WeatherView, LoadingInfos } from './components/view/mainview'

import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const [weatherview, setWeatherview] = useState(false)
  const [errStatus, setErrStatus] = useState('')
  const [weathData, setWeathData] = useState<WeatherData | null>(null)

  const handleFetch = async (city: string) => {
    setLoading(true)
    setWeatherview(false)
    setErrStatus('')
    try { 
      const res = await fetch(`https://rweather-alpha.vercel.app/api/weather?city=${encodeURIComponent(city)}`)
      if (!res.ok) {
        console.log("caiu no 1") //debug pra ver onde cai 429
        if (res.status === 429) {
          console.log("ruim1") //debug pra ver onde cai 429
          throw new Error('Muitas requisições!')
        } else {
          const errData = await res.json()
          throw new Error(errData.error || 'Erro incomum, verifique o console.');
        }
        
      }
      const data: WeatherData = await res.json()
      if (data.cod === '404') { 
        console.log("caiu no 2") //debug pra ver onde cai 429
        if (res.status === 429) {
          console.log("ruim2", data) //debug pra ver onde cai 429
          throw new Error('Muitas requisições!')
        } else {
          throw new Error('Cidade não encontrada') // a api as vezes faz a call ser bem sucedida mesmo que nao achar nada, dai isso aqui barra esse erro.
        }
      } 
      console.log("bem-sucedido", data) //debug
      setWeathData(data)
      setWeatherview(true) // setado pra ir a tela das infos quando sair o loading
      saveRecentSearches(data.name) // salva no localstorage
    } catch (err: any) {
      console.error(err) // fallback se nao funfar o de baixo
      setErrStatus(String(err))
    } finally {
      setLoading(false) // vai pra tela de clima ou volta pro inicio dependendo se deu certo ou nao
    }
  }

  const saveRecentSearches = (newCity: string) => {
    const previousSave = localStorage.getItem('cities-storage')
    const newList: string[] = previousSave ? JSON.parse(previousSave) : []
    const duplicatedFilter = newList.filter((city) => city.toLowerCase() !== newCity.toLowerCase())
    const doneList = [newCity, ...duplicatedFilter].slice(0, 3)
    localStorage.setItem('cities-storage', JSON.stringify(doneList))
  }

  const handleClear = () => {
    setLoading(false)
    setWeatherview(false)
  }
  return (
    <>
      <Header onBack={handleClear} onSearch={handleFetch} error={errStatus} />
      <main>
        {weatherview ? 
              <WeatherView cityname={weathData?.name ?? ''} timelocal={getCityTime(weathData?.timezone ?? 0)} temperature={Math.trunc(weathData?.main?.temp ?? 0)} mintemp={Math.trunc(weathData?.main?.temp_min ?? 0)} maxtemp={Math.trunc(weathData?.main?.temp_max ?? 0)} feelslike={Math.trunc(weathData?.main?.feels_like ?? 0)} country={weathData?.sys.country ?? ''} description={weathData?.weather[0].description ?? ''} humidity={weathData?.main.humidity ?? 0} windspeed={Math.trunc(weathData?.wind?.speed ?? 0)} /> :
          !loading ? <CleanView onSearch={handleFetch} /> : <LoadingInfos />
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
