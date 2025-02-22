import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Grid, Skeleton } from '../../../components'
import Card from './Card'

//Componente Board
function Board({ data }) {
  //pega os dados oferecidos pela API
  //Data contem os dados e atribuido a cada variavel
  const { cases, todayDeaths, recovered, deaths, todayCases, critical } = data

  const getValue = (value) => value ? value : <Skeleton variant="text" width={182} height={60} />

  //cria um grid e insere card no grid com os dados requisitados e armazenados em value
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Card value={getValue(cases)} label="Total de casos" color="#5d78ff" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card value={getValue(todayDeaths)} label="Óbitos hoje" color="#F7B829" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card value={getValue(todayCases)} label="Casos hoje" color="#000" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card value={getValue(deaths)} label="Total de mortos" color="#E95078" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card value={getValue(recovered)} label="Total de recuperados" color="#67C887" />
      </Grid>

      <Grid item xs={12} md={3}>
        {
        //pega o valor de cada variavel e passa como parametro ao componente card.
        //o mesmo para todas as propriedades acima
        }
        <Card value={getValue(critical)} label="Total de casos críticos" color="#cc0000" />
      </Grid>
    </Grid>
  )
}

export default memo(Board)