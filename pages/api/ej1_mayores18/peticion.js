// Cliente APollo: https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/
// Este código es un cliente graphQL (ejecutado en server, carpeta api) y finaliza enviando JSON 

import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/ej1_mayores18/graphql",
  cache: new InMemoryCache(),
});


async function ejecuta_peticion() {
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
    return(data)
  }

  catch(error){
    console.log("el error es:", error)
    return ("error en conexión")
  }

}


export default async function programa(req, res) {
  const resultado = await ejecuta_peticion()
  const cadenaTexto = JSON.stringify(resultado.mayores)
  console.log("resultado", resultado)
  res.json(cadenaTexto)
}