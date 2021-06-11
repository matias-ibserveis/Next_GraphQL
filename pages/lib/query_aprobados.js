
import  { gql } from 'graphql-request'

const endpoint = 'http://localhost:3000/api/ej3_variables/graphql'

const query = gql`
  query ver_aprobados($valor: Int) {
    aprobados(numero: $valor) {
        nombre,
        nota
    }
  }
  `

export {endpoint, query}




