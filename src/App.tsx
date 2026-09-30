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
        if (res.status === 429) {
          setErrStatus('Muitas requisições!')
          throw new Error('Muitas requisições!')
        } else {
          const errData = await res.json()
          throw new Error(errData.error || 'Erro incomum, verifique o console.');
        }
        
      }
      const data: WeatherData = await res.json()
      if (data.cod === '404') { 
        throw new Error('Cidade não encontrada') // a api as vezes faz a call ser bem sucedida mesmo que nao achar nada, dai isso aqui barra esse erro.
      } 
      console.log("bem-sucedido", data) //debug
      setWeathData(data)
      setWeatherview(true) // setado pra ir a tela das infos quando sair o loading
      saveRecentSearches(data.name) // salva no localstorage
    } catch (err: any) {
      console.error(err) // fallback se nao funfar o de baixo
      errStatus==''?setErrStatus(String(err)):console.log('Variável de erro já estava ocupada, pulando.')
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
      <Header onBack={handleClear} onSearch={handleFetch} onLoading={()=>setLoading(true)} onLoadingFail={()=>setLoading(false)} error={errStatus} />
      <main>
        {weatherview ? 
              <WeatherView cityname={weathData?.name ?? ''} timelocal={getCityTime(weathData?.timezone ?? 0)} temperature={Math.trunc(weathData?.main?.temp ?? 0)} mintemp={Math.trunc(weathData?.main?.temp_min ?? 0)} maxtemp={Math.trunc(weathData?.main?.temp_max ?? 0)} feelslike={Math.trunc(weathData?.main?.feels_like ?? 0)} country={weathData?.sys.country ?? ''} description={weathData?.weather[0].description ?? ''} humidity={weathData?.main.humidity ?? 0} windspeed={Math.trunc(weathData?.wind?.speed ?? 0)} winddir={weathData?.wind?.deg ?? 0} lat={weathData?.coord.lat ?? 0} lon={weathData?.coord.lon ?? 0} visibility={weathData?.visibility ?? 0} sunrise={ConvertIsoDate(weathData?.sys.sunrise??0, weathData?.timezone??0)} sunset={ConvertIsoDate(weathData?.sys.sunset??0,  weathData?.timezone??0)} clouds={weathData?.clouds.all??0} /> :
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

function ConvertIsoDate(date:number, timezone: number):string{
  const now = new Date();
  const reqDt = new Date(date*1000)
  const localOffsetInMs = now.getTimezoneOffset() * 60 * 1000;
  const utcTimeInMs = reqDt.getTime() + localOffsetInMs
  const cityTimeInMs = utcTimeInMs + (timezone * 1000);
  const dt = new Date(cityTimeInMs).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
  return dt
}

export default App
