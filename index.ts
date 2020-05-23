import escalas from './escalas'
import { PEGA_TODAS_NOTAS } from './notas'

const TODAS_NOTAS = PEGA_TODAS_NOTAS()

TODAS_NOTAS.forEach(nota_composta => {
  console.log(
    `ESCALA MAIOR NATURAL ${nota_composta.nome} =>`,
    escalas.maior.natural.com_tonica(nota_composta).map(item => item?.nome)
  )
})

console.debug('-------')

TODAS_NOTAS.forEach(nota_composta => {
  console.log(
    `ESCALA MENOR NATURAL ${nota_composta.nome} =>`,
    escalas.menor.natural.com_tonica(nota_composta).map(item => item?.nome)
  )
})

console.debug('-------')

TODAS_NOTAS.forEach(nota_composta => {
  console.log(
    `ESCALA MENOR HARMÔNICA ${nota_composta.nome} =>`,
    escalas.menor.harmonica.com_tonica(nota_composta).map(item => item?.nome)
  )
})

console.debug('-------')

TODAS_NOTAS.forEach(nota_composta => {
  console.log(
    `ESCALA MENOR MELODICA ${nota_composta.nome} =>`,
    escalas.menor.melodica.com_tonica(nota_composta).map(item => item?.nome)
  )
})

console.debug('-------')

TODAS_NOTAS.forEach(nota_composta => {
  console.log(
    `ESCALA PENTATÔNICA MAIOR ${nota_composta.nome} =>`,
    escalas.pentatonica.maior.com_tonica(nota_composta).map(item => item?.nome)
  )
})

console.debug('-------')

TODAS_NOTAS.forEach(nota_composta => {
  console.log(
    `ESCALA PENTATÔNICA MENOR ${nota_composta.nome} =>`,
    escalas.pentatonica.menor.com_tonica(nota_composta).map(item => item?.nome)
  )
})
