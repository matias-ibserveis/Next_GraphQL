import {useState} from "react"
import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://localhost:3000/api/ej1_mayores18/graphql'
const graphQLClient = new GraphQLClient(endpoint, { headers:{}})
const fetcher = async (query) => await graphQLClient.request(query)

export default function ListaWebNext() {

  const {data, error} = useSWR(
      gql`
              {
                mayores{
                  id
                  nombre
                  edad
                }
              }`,
    fetcher
  )   
  console.log(JSON.stringify(data, undefined, 2))

  function ListaFormato () {
    const lista = data.mayores
    const resultado = lista.map((element) =>
          <div key={element.id} >
            <div>
              <p>{element.nombre} y su edad es {element.edad}</p>
            </div>
          </div>
          )
    return resultado
  }


return (
  <div>
    <h2>My first Apollo app 🚀</h2>
    {data ? <ListaFormato/> : <h2>loading ...</h2> }
  </div>
)

}

