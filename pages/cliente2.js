// netlify.com/blog/2020/12/21/send-graphql-queries-with-the-fetch-api-without-using-apollo-urql-or-other-graphql-clients/
// Código  Previo a getServerpropr: https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/

export default function programa() {

  async function ejecuta_peticion() {
    const axios = require('axios');
    const data = JSON.stringify({
      query: `
          query countries {
              countries{
                code
                name
              }
          }`,
      variables:{}
    })

    const config = {
      method: 'post',
      url: 'http://localhost:3000/api/ejemplo2/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try{
      const peticion = await axios(config)
      return peticion
    }
    catch(error){
      console.log("el error es:", error)
      return ("error en conexión")
    }

  }

  async function inicio() {
    const resultado = await ejecuta_peticion()
    console.log("resultado", resultado.data)
  }

  inicio()
  
  return (
    <div>
        <p> Datos leidos del graphqlserver</p>
    </div>
  )

}