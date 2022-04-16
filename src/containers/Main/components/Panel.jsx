import React, { memo } from 'react'
import RefreshIcon from '../../../assets/images/refresh.svg'
import { Card, Typography, Button, Select, MenuItem } from '../../../components'
import COUNTRIES from '../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style'

//verificar se é mobile/pwa
const navigatorHasShare = navigator.share

//componente painel - panel
function Panel({ updateAt, onChange, data, country, getCoviddata }) {
  const { cases, recovered, deaths, todayCases, todayDeaths, critical } = data

  const renderCountries = (country, index) => (
    <MenuItem key={`country-${index}`} value={country.value}>
      <ItemStyled>
        <div>{country.label}</div>
        <img src={country.flag} alt={`País-${country.label}`} />
      </ItemStyled>
    </MenuItem>
  )
  
  //Dados que serão compartilhados por botao(site) ou por share(mobile - pwa)
  //(Dados escolhidos - pais, recuperados e casos) no formato de string
  const textCovid19 = `País: ${country} - recuperados: ${recovered} - Total de casos: ${cases}`
  
  //compartilhamento dos dados por botao
  const copyInfo = () => {
    navigator.clipboard.writeText(textCovid19)
  }

  //compartilhamento das informações por mobila/pwa
  const shareInfo = () => {
    navigator.share({
      title: `Dados do Covid19 - ${country}`,
      text: textCovid19,
      url: 'https://covid19dio.netlify.app/'
    })
  }

  //preparando componente para renderização
  //share - mobile/pwa
  const renderShareButton = (
    <div>
      <Button variant="contained" color="primary" onClick={shareInfo}>
        Compartilhar
      </Button>
    </div>
  )

  //Componente para renderização do botao de copia - site
  const renderCopyButton = (
    <div>
      <Button variant="contained" color="primary" onClick={copyInfo}>
        Copiar
      </Button>
    </div>
  )

  return (
    <Card>
      <CardPanelContentStyled>
        <div>
          <Typography variant="h5" component="span" color="primary">COVID19</Typography>
          <Typography variant="h6" component="span" color="primary">Painel Coronavírus</Typography>
          <Typography variant="body2" component="span" color="primary">Atualizado em: {updateAt}</Typography>
          <div className="pt-2">
            <Select onChange={onChange} value={country}>
              {COUNTRIES.map(renderCountries)}
            </Select>
          </div>
        </div>
        {
          //operaçao terneraria para renderização botao copia(site) ou share(mobile/pwa)
          //avaliação da propriedadde navigatorHasShare
          navigatorHasShare ? renderShareButton : renderCopyButton
        }
      </CardPanelContentStyled>
    </Card>
  )
}

export default memo(Panel)