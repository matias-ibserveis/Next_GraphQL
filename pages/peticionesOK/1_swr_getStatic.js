// Ejemplo oficial graphql-request: https://www.npmjs.com/package/graphql-request
// Ejemplo tutorial: https://kjmczk.dev/blog/crud-app-with-next-js-faunadb-and-graphql
// swr oficial: https://swr.vercel.app/es-ES/docs/data-fetching

// Swr + Next (getStaticprops): https://swr.vercel.app/docs/with-nextjs

// Opciones: https://swr.vercel.app/docs/options

// How to initialprops: https://jamesku.cc/blog/nextjs-useswr-with-ssr


import useSWR from 'swr';
import { GraphQLClient, gql } from 'graphql-request'
import {useState} from "react"

const endpoint = 'http://localhost:3000/api/ej1_mayores18/graphql'
const graphQLClient = new GraphQLClient(endpoint, { headers:{}})

const fetcher = async (query) => await graphQLClient.request(query)
const query = gql`
                  {
                    mayores{
                      id
                      nombre
                      edad
                    }
                  }`


export default function ListaWebNext(props) {
  const {datosiniciales, primeravez} = props
  const [key, setKey] = useState(primeravez)

  const {data, error} = useSWR(query, fetcher, { refreshInterval: 1000, 
                                                 initialData: key === primeravez ? {datosiniciales} : null})   
  console.log(JSON.stringify(data, undefined, 2))

  function ListaFormato () {
    const lista = !data.datosiniciales ? data.mayores : data.datosiniciales
    console.log("lista", lista)
    const resultado = lista.map((element) =>
          <div key={element.id} >
            <div>
              <p>{element.nombre} y su edad es {element.edad}</p>
            </div>
          </div>
          )
    setKey(false)
    //setlistaDatos(data)
   
    return  resultado
  }


return (
  <div>
    <h2>My first Graphql app 🚀</h2>
    {data ? <ListaFormato/> : <h2>loading ...</h2> }
  </div>
)

}

export async function getStaticProps() {
  try{
    const data = await graphQLClient.request(query)
    console.log(JSON.stringify(data, undefined, 2))
    return {
      props: {
        datosiniciales: data.mayores,
        primeravez: true
      },
    };
  }
  catch(error){
    console.log("el error es:", error)
    //return ({props: {error: "error en conexión"}} )
  }
}



