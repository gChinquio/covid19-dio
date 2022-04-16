import React, { memo, useState, useCallback, useEffect } from 'react'
import Api from '../../api'
import Board from './components/Board'
import Panel from './components/Panel'
import { ContainerStyled } from './style'

//Componente Main
function Main() {
  //use states para manipular os valores - variavel data - metodos setData
  const [data, setData] = useState({})
  //use state com a variavel country com o valor padrao brazil
  const [country, setCountry] = useState('brazil')

  const updateAt = new Date().toLocaleString()
  // useCallback cria uma memorização dos valores - não precisando fazer outra chamada
  //assim o react não entra em loop
  //useCallback porque esta fora do use effect 
  //chamada dos dados da API
  const getCovidData = useCallback((country) => {
    Api.getCountry(country)
      .then(data => setData(data))
  }, [])

  //se tiver mudança de pais(country) chama novamente a funcao getCovidData
  useEffect(() => {    
    getCovidData(country)
  }, [getCovidData, country])

  //quando tiver alteracao de pais - chama o pais da api
  const handleChange = ({ target }) => {
    const country = target.value
    setCountry(country)
  }

  return (
    <ContainerStyled>
      <div className="mb-2">
        <Panel
          data={data}
          updateAt={updateAt}
          onChange={handleChange}
          country={country}
          getCovidData={getCovidData}
        />
      </div>
      <Board data={data} />
      
    </ContainerStyled>
  )
}

export default memo(Main)
