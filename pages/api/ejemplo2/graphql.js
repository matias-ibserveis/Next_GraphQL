/* import  {  ApolloServer  }  from  "apollo-server-micro";
import  {  typeDefs  }  from  "./schemas";
import  {  resolvers  }  from  "./resolvers";

const  apolloServer  =  new  ApolloServer({  typeDefs,  resolvers  });

export  const  config  =  {
    api:  {
        bodyParser:  false
    }
};

export  default  apolloServer.createHandler({ path:  "/api/ejemplo1/graphql"  });
*/



// https://www.apollographql.com/blog/getting-started-with-apollo-client-in-next-js/

import { ApolloServer, gql } from 'apollo-server-micro';

const paises = [
  {
    "code": "AD",
    "name": "Andorra"
  },
  {
    "code": "AE",
    "name": "United Arab Emirates"
  },
  {
    "code": "AF",
    "name": "Afghanistan"
  },
  {
    "code": "AG",
    "name": "Antigua and Barbuda"
  }
]

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Country {
    code: String
    name: String
  }

  type Query {
    countries: [Country]
  }
`

const resolvers = {
  Query: {
    countries: () => {
      return paises;
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: '/api/ejemplo2/graphql',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

