// Ejemplo oficial graphql-request: https://www.npmjs.com/package/graphql-request
// Ejemplo tutorial: https://kjmczk.dev/blog/crud-app-with-next-js-faunadb-and-graphql
// swr oficial: https://swr.vercel.app/es-ES/docs/data-fetching

// Swr + Next (getStaticprops): https://swr.vercel.app/docs/with-nextjs

// Opciones: https://swr.vercel.app/docs/options

// How to initialprops: https://jamesku.cc/blog/nextjs-useswr-with-ssr

// Variables : https://stackoverflow.com/questions/65480752/swr-with-graphql-request-how-to-add-variables-in-swr
// https://www.npmjs.com/package/graphql-request#using-graphql-document-variables


import useSWR from 'swr';
import request, { GraphQLClient, gql } from 'graphql-request'
import {useState} from "react"

const endpoint = 'http://localhost:3000/api/ej3_variables/graphql'
//const graphQLClient = new GraphQLClient(endpoint, { headers:{}})

const fetcher = async (query, variables) => 
  {
    //await graphQLClient.request(query, variables)
    const r  = await request(endpoint, query, variables)
    console.log("r es", r)
    return r
  }
const query = gql`
  query ver_aprobados($valor: Int) {
    aprobados(numero: $valor) {
        nombre,
        nota
    }
  }
  `
  const variables = { 
    valor: 4
  }

export default function ListaWebNext(props) {
  const {datosiniciales, primeravez} = props
  const [key, setKey] = useState(false)  // no hay getstaticprops

  const {data, error} = useSWR([query,variables], fetcher)  

  error ? console.log("error", error): false
  console.log(JSON.stringify(data, undefined, 2))
  const problem = error ? <div>failed to load</div>
                      : !data ? <div>loading...</div> :false


  function ListaFormato () {
    const lista = !data.datosiniciales ? data.aprobados : data.datosiniciales
    console.log("lista", lista)
    const resultado = lista.map((element) =>
          <div key={element.id} >
            <div>
              <p>{element.nombre} y su nota es {element.nota}</p>
            </div>
          </div>
          )
    setKey(false)
   
    return  resultado
  }


return (
  <div>
    <h2>My first Graphql app 🚀</h2>
    {problem ? problem : false}
    {!problem ? <ListaFormato/> : <h2>loading ...</h2> }
  </div>
)

}

/*
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
*/



