// https://apuyou.io/blog/serverless-graphql-apollo-server-nextjs

import { ApolloServer, gql } from 'apollo-server-micro';

// This data will be returned by our test endpoint
const alumnos = [
  {
    id: 1,
    nombre: 'Joan',
    edad: 15,
  },
  {
    id: 2,
    nombre: 'Maria',
    edad: 17,
  },
  {
    id: 3,
    nombre: 'Eve',
    edad: 45,
  },
];

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Alumno {
    id: Int
    nombre: String
    edad: Int
  }

  type Query {
    mayores: [Alumno]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    mayores: () => {
      const filtraMayores = alumnos.filter((alumno) => {
        return (alumno.edad>=18 ? alumno : false)
      })
        return filtraMayores
      },
    },
};


const server = new ApolloServer({ typeDefs, resolvers });


export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({
  path: '/api/ej1_mayores18/graphql',
});




