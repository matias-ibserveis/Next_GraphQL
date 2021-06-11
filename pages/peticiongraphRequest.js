// Ejemplo oficial graphql-request: https://www.npmjs.com/package/graphql-request
// Ejemplo tutorial: https://kjmczk.dev/blog/crud-app-with-next-js-faunadb-and-graphql


//import { ApolloClient,  InMemoryCache, gql } from "@apollo/client";
import {useState} from "react"
import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request'


export default function ListaWebNext(props) {

  const {datos} = props
  console.log("props", props)
  const [listaDatos, setlistaDatos] = useState(datos)

  function ListaFormato () {
    const resultado = listaDatos.map((element) =>
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
    <ListaFormato />
  </div>
)

}

export async function getServerSideProps() {

  const endpoint = 'http://localhost:3000/api/ej1_mayores18/graphql'
  const graphQLClient = new GraphQLClient(endpoint, {
    headers:{}
  })
  
  try{
    const query = gql`
         query {
                mayores{
                  id
                  nombre
                  edad
                }
      }`
    
    const data = await graphQLClient.request(query)
    
    console.log(JSON.stringify(data, undefined, 2))
    return {
      props: {
        datos: data.mayores
      },
    };
  }
  catch(error){
    console.log("el error es:", error)
    return ({props: {error: "error en conexión"}} )
  }

}
