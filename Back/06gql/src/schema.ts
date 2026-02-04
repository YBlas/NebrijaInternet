import { gql } from 'apollo-server';


export const typeDefs = gql`

    type Cochesito {
        id: ID!,
        name: String,
        brand: String,
        plate: String
    }

    type Query {
        getCars: [Cochesito]!,
        getCar(id: ID!): Cochesito
    }

    type Mutation {
        addCar(name: String!, brand: String!, plate: String!): Cochesito!
    }

`;