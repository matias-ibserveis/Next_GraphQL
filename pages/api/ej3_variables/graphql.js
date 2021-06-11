// https://apuyou.io/blog/serverless-graphql-apollo-server-nextjs

// Arguments + variables: https://www.apollographql.com/docs/react/data/queries/

import { ApolloServer, gql } from 'apollo-server-micro';

// This data will be returned by our test endpoint
const alumnos = [
  {
    id: 1,
    nombre: 'Joan',
    edad: 23,
    nota: 5
  },
  {
    id: 2,
    nombre: 'Maria',
    edad: 17,
    nota: 3
  },
  {
    id: 3,
    nombre: 'Eve',
    edad: 45,
    nota: 7
  },
];

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Alumno {
    id: Int
    nombre: String
    edad: Int
    nota: Int
  }

  type Query {
    mayores: [Alumno],
    aprobados(numero:Int):[Alumno]
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
    // ojo, parents: https://www.apollographql.com/docs/apollo-server/data/resolvers/
    aprobados: (parent, args) => {
      console.log("valor en server",args)
      const filtraAprobados = alumnos.filter((alumno) => {
        return (alumno.nota>args.numero ? alumno : false)
      })
        return filtraAprobados
    }
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({
  path: '/api/ej3_variables/graphql',
});


