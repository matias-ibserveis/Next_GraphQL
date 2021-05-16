// Varias funciones con next: https://nextjs.org/docs/api-routes/api-middlewares
// Axios como cliente: https://www.netlify.com/blog/2020/12/21/send-graphql-queries-with-the-fetch-api-without-using-apollo-urql-or-other-graphql-clients/
// Cliente APollo: https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/

// Este código es un cliente graphQL y un servidor JSON

async function ejecuta_peticion() {
  const axios = require('axios');

  // netlify.com/blog/2020/12/21/send-graphql-queries-with-the-fetch-api-without-using-apollo-urql-or-other-graphql-clients/
  const data = JSON.stringify({
    query: `
        query usuarios {
          getUsers {
                    id
                    login
                    avatar_url
                  }
        }`,
    variables:{}
  })

  const config = {
    method: 'post',
    url: 'http://localhost:3000/api/ejemplo1/graphql',
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


export default async function programa(req, res) {
  const resultado = await ejecuta_peticion()
  console.log("resultado", resultado.data)
  res.json(resultado.data)
}