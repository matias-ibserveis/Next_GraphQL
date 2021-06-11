// Variables: https://www.npmjs.com/package/graphql-request#using-graphql-document-variables
// En cliente swr:   https://swr.vercel.app/docs/arguments#multiple-arguments

import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://localhost:3000/api/ej3_variables/graphql'
const client = new GraphQLClient(endpoint, { headers:{}})

async function ejecuta_peticion() {
 
  const query = gql`
        query ver_aprobados($valor: Int) {
          aprobados(numero: $valor) {
               nombre,
               nota
    }
  }
  `
  const variables = {
    valor: 4,
  }

  const data = await client.request(query, variables)
  console.log("data es", data)
  return (data)
}


export default async function programa(req, res) {
  const resultado = await ejecuta_peticion()
  const cadenaTexto = JSON.stringify(resultado.aprobados)
  res.json(cadenaTexto)
}