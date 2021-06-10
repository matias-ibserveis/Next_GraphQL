// Cliente APollo: https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/
// Oficial : https://www.apollographql.com/docs/react/get-started/
// Este código es una app en cliente

// NEXT - APollo : https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
// https://github.com/kkemple/nextjs-with-apollo


import { useQuery, gql } from "@apollo/client";
import {useState, useEffect} from "react"


export default function ListaWebNext(props) {
  const [datos, setDatos] = useState([]);
 
  useEffect(() => {
    async function ejecuta_peticion() {
      const listaMayores18 = gql`
            query {
                    mayores{
                      id
                      nombre
                      edad
                    }
      }`
    const { loading, error, data } = useQuery(listaMayores18);
    //if (loading) return <p>Loading...</p>;
    //if (error) return <p>Error :(</p>;
    setDatos(data.mayores)
    }
    ejecuta_peticion()
  },[]) 

  async function ListaFormato () {
    //const datos = await ejecuta_peticion()
    console.log("datos",datos)

    const resultado = datos.map((element) =>
          <div key={element.id} >
            <div>
              <p>element.nombre</p>
              <p>element.edad</p>
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
