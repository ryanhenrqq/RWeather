import './header.css'
import { useState } from 'react'

import type { HeaderFunction } from '../../types/types'

import homeIcon from '../../assets/home.png'
import infoIcon from '../../assets/info.png'
import logo from '/public/favicon.png'
import searchIcon from '../../assets/search.png'

export function Header({onSearch, onBack, error}: HeaderFunction) {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    console.log("click - header")
    if (!city.trim()) return
    console.log(city)
    onSearch(city)      // descobrir como limpar o campo de pesquisa apos a funçao dar certo sem afetar aqui!!
  }

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
          <img src={infoIcon} alt="Info" />
        </div>
      </header>
      <InfosAbout />
    </>
  )
}

function InfosAbout() {
    return(
        <>
        </>
    )
}