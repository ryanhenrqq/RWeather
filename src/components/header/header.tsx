import './header.css'
import { useEffect, useState } from 'react'

import type { HeaderFunction } from '../../types/types'

import homeIcon from '../../assets/home.png'
import infoIcon from '../../assets/info.png'
import searchIcon from '../../assets/search.png'
import logo from '../../favicon.png'
import gpsIcon from '../../assets/gps.png'
import closeIcon from '../../assets/close.png'
import { Attributes } from '../attributes/attributes'

export function Header({onSearch, onBack, onLoading, onLoadingFail, error}: HeaderFunction) {
  const [city, setCity] = useState('')
  const [infosView, setInfosView] = useState(false)
  const [lastLat, setLastLat] = useState(0)
  const [lastLon, setLastLon] = useState(0)
  const [showLocSearch, setShowLocSearch] = useState(false)

  useEffect(() => {
    setCity(city.replace(/[^a-zA-ZÀ-ÿ ]/g, ""))
  },[city])

  useEffect(() => {
    if(lastLat!=0&&lastLon!=0){
        setShowLocSearch(true)
    } else {
        setShowLocSearch(false)
    }
  }, [lastLat, lastLon])

  const handleSearch = (city: string) => {
    console.log("click - header")
    if (!city.trim()) return
    onSearch(city.replace(/[^a-zA-ZÀ-ÿ ]/g, ""))// descobrir como limpar o campo de pesquisa apos a funçao dar certo sem afetar aqui!!
  }

  const handleInfosView = () => {
    !infosView?setInfosView(true):setInfosView(false)
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
        cityname = String(data.name)
        setCity(String(data.name))
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
                setLastLat(lat)
                setLastLon(lon)
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
        handleGeoCatch()
    }, [])

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
                        handleSearch(city)
                    }
                }}
            />
            <img src={searchIcon} alt="Pesquisar" onClick={() => handleSearch(city)} />
          </div>
          {error==''?<span></span>:<small style={{
            color:'red',
            width: '70%', 
            whiteSpace:'nowrap', 
            overflow:'hidden',
            textOverflow:'ellipsis',
            height:'11px',
            fontSize:'11px',
            textAlign:'center'
            }}>{error}</small>
            }
        </div>
        <div className="right-side-header flex-hor-align">
            {showLocSearch? <img src={gpsIcon} alt="Localização" onClick={() => handleGeolocationSearch(lastLat, lastLon)} />:null}
            <img src={homeIcon} alt="Voltar" onClick={onBack} />
            <img src={!infosView?infoIcon:closeIcon} alt="Info" onClick={handleInfosView} />
        </div>
      </header>
      {infosView?<InfosAbout />:null}
    </>
  )
}

function InfosAbout() {
    const [clearTxt, setClearTxt] = useState('Limpar pesquisas')
    const handleSearchEraser = () => {
        setClearTxt('Limpando, aguarde...')
        localStorage.clear()
        setTimeout(() => {
            setClearTxt('Limpo com sucesso! Atualize a pagina')
        })
    }
    return(
        <div className="info-tab">
            <div>
                <Attributes />
                <b>Criado por Ryan Henrique</b>
                <button onClick={handleSearchEraser}>{clearTxt}</button>
            </div>
        </div>
    )
}