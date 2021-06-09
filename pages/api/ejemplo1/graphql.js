import  {  ApolloServer  }  from  "apollo-server-micro";
import  {  typeDefs  }  from  "./schemas";
import  {  resolvers  }  from  "./resolvers";

const  apolloServer  =  new  ApolloServer({  typeDefs,  resolvers  });

export  const  config  =  {
    api:  {
        bodyParser:  false
    }
};

export  default  apolloServer.createHandler({ path:  "/api/ejemplo1/graphql"  });



/*    // https://apuyou.io/blog/serverless-graphql-apollo-server-nextjs

import { ApolloServer, gql } from 'apollo-server-micro';

// This data will be returned by our test endpoint
const products = [
  {
    id: 1,
    name: 'Cookie',
    price: 300,
  },
  {
    id: 2,
    name: 'Brownie',
    price: 350,
  },
];

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Product {
    id: Int
    name: String
    price: Int
  }

  type Query {
    products: [Product]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    products: () => {
      return products;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

*/

/*  PETICION

query {
  products{
    id
    name
    price
  }
}

*/