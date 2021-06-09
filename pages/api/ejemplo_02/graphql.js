// https://apuyou.io/blog/serverless-graphql-apollo-server-nextjs

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
    nota: 9
  },
  {
    id: 3,
    nombre: 'Eve',
    edad: 45,
    nota: 2
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
    aprobados(nota:Int):[Alumno]
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
    aprobados: (parent, args) => {
      console.log("valor en server",args)
      const filtraAprobados = alumnos.filter((alumno) => {
        return (alumno.nota>args.nota ? alumno : false)
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
  path: '/api/ejemplo_02/graphql',
});


