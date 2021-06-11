// Ejemplo oficial graphql-request: https://www.npmjs.com/package/graphql-request
// Ejemplo tutorial: https://kjmczk.dev/blog/crud-app-with-next-js-faunadb-and-graphql
// swr oficial: https://swr.vercel.app/es-ES/docs/data-fetching


//import { ApolloClient,  InMemoryCache, gql } from "@apollo/client";
import {useState} from "react"
import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://localhost:3000/api/ej1_mayores18/graphql'
const graphQLClient = new GraphQLClient(endpoint, { headers:{}})
const fetcher = async (query) => await graphQLClient.request(query)

export default function ListaWebNext() {

  const [listaDatos, setlistaDatos] = useState([])

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
  //setlistaDatos(data)
  

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

  </div>
)

}

