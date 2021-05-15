
// dentro del body del post y con ayuda de Postman (code)

/*
POST /graphql HTTP/1.1
Host: localhost:8888
Content-Type: application/json

{
    "query": "{ saludo }"
}

*/

export default function programa() {

const axios = require('axios');

// netlify.com/blog/2020/12/21/send-graphql-queries-with-the-fetch-api-without-using-apollo-urql-or-other-graphql-clients/
const data = JSON.stringify({
  query: `
    getUsers {
      id
      login
      avatar_url
    }`,
  variables:{}
})

const config = {
  method: 'post',
  url: 'http://localhost:3000/api/graphql',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};


async function ejecuta(config) {
  try{
    const peticion = await axios(config)
    return peticion
  }
  catch(error){
    console.log("el error es:", error)
    return ("error en conexión")
  }
}

async function inicio(config) {
  const resultado = await ejecuta(config)
  console.log("resultado", resultado.data)
}

inicio(config)

return (
  <div>
      <p> Datos leidos del graphqlserver</p>
  </div>
)

}