// Cliente APollo: https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/
// Oficial : https://www.apollographql.com/docs/react/get-started/
// Este código es una app en cliente

// NEXT - APollo : https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
// https://github.com/kkemple/nextjs-with-apollo


import { ApolloClient,  InMemoryCache, gql } from "@apollo/client";
import {useState} from "react"


export default function ListaWebNext(props) {

  const {datos} = props
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

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/ej1_mayores18/graphql",
    cache: new InMemoryCache(),
  });

  try{
    const { data } = await client.query({
      query: gql`
        query {
                mayores{
                  id
                  nombre
                  edad
                }
      }`,
    });
    return {
      props: {
        datos: data.mayores
      },
    };
  }
  catch(error){
    console.log("el error es:", error)
    return ("error en conexión")
  }

}
