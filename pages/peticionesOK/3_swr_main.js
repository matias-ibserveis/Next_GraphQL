
import useSWR from 'swr';
import {useState} from "react"
import request from 'graphql-request'
import {endpoint, query} from "../lib/query_aprobados"

const variables = { 
  valor: 4
}

export default function ListaAprobados(props) {
  const {datosiniciales, primeravez} = props
  const [key, setKey] = useState(false)  

  const fetcher = async (query, variables) => await request(endpoint, query, variables)

  const {data, error} = useSWR([query,variables], fetcher, 
      {  
        initialData: key === primeravez ? {datosiniciales} : null
      })  

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


export async function getStaticProps() {
  try{
    const data = await request(endpoint, query, variables)
    console.log(JSON.stringify("getstatic data",data, undefined, 2))
    return {
      props: {
        datosiniciales: data.aprobados,
        primeravez: true
      },
    };
  }
  catch(error){
    console.log("el error es:", error)
    return ({props: {error: "error en conexión"}} )
  }
}





