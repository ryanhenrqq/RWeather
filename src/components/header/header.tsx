import './header.css'
import { useEffect, useState } from 'react'

import type { HeaderFunction } from '../../types/types'

import homeIcon from '../../assets/home.png'
import infoIcon from '../../assets/info.png'
import logo from '/public/favicon.png'
import searchIcon from '../../assets/search.png'
import closeIcon from '../../assets/close.png'
import { Attributes } from '../attributes/attributes'

export function Header({onSearch, onBack, error}: HeaderFunction) {
  const [city, setCity] = useState('')
  const [infosView, setInfosView] = useState(false)
  // AS LINHAS IGNORADAS ABAIXO FORAM APENAS PRA CONSEGUIR FAZER O COMMIT E ATUALIZAR A API NO VERCER (MUDANÇAS DO WEATHER.TS PRA ACEITAR LATITUDE E LONGITUDE)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    console.log("click - header")
    if (!city.trim()) return
    console.log(city)
    onSearch(city)      // descobrir como limpar o campo de pesquisa apos a funçao dar certo sem afetar aqui!!
  }
  const handleInfosView = () => {
    !infosView?setInfosView(true):setInfosView(false)
  }

  const handleGeolocationSearch = async(lat: number, lon: number) => {
    setLoading(true)
    console.log(lat, lon)
    try {
        const res = await fetch(`https://rweather-alpha.vercel.app/api/weather?lat=${lat}&lon=${lon}`)
        if (!res.ok){
            const errData = await res.json()
            throw new Error(errData.error || 'essas coords não foram encontradas')
        }
        const data = await res.json()
        console.log(data)
    } catch (err: any) {
        console.error(err)
    } finally {
        setLoading(false)
    }
    }

    useEffect(() => {
        if (navigator.geolocation) { //fins de testes, objetivo de pesquisar sozinho ao entrar no site
            navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            console.log(`Latitude: ${lat}, Longitude: ${lon}`)
            handleGeolocationSearch(lat, lon)
        }, (error) => {
            console.error(`Erro ao conseguir geoloc: ${error}`)
        })
    } else {
        console.log('Geolocation não suportado!')
    }
    }, [])

    useEffect(() => {
        if (loading) {
            console.log("Carregando pesquisa por geolocalização.")
        } else {
            console.log("Pesquisa por geolocalização parada.")
        }
    }, [loading])

  return (
    <>
      <header>
        <div className="left-side-header flex-hor-align">
          <img src={logo} alt="Logo" />
          <h1>RWeather</h1>
        </div>
        <div className="middle-side-header flex-ver">
          <div className="flex-hor-align">
            <input type="text" name="search-bar"  placeholder='Buscar cidades...' value={city} onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) =>{
                    if (e.key==="Enter"){
                        console.log("DISPARADO PELO TECLADO") // para debug
                        e.preventDefault()
                        handleSearch()
                    }
                }}
                />
            <img src={searchIcon} alt="Pesquisar" onClick={handleSearch} />
          </div>
          {error==''?<span></span>:<small style={{color:'red'}}>Cidade nao encontrada</small>}
        </div>
        <div className="right-side-header flex-hor-align">
          <img src={homeIcon} alt="Voltar" onClick={onBack} />
          <img src={!infosView?infoIcon:closeIcon} alt="Info" onClick={handleInfosView} />
        </div>
      </header>
      {infosView?<InfosAbout />:null}
    </>
  )
}

function InfosAbout() {
    return(
        <div className="info-tab">
            <Attributes />
            <b>Criado por Ryan Henrique</b>
        </div>
    )
}