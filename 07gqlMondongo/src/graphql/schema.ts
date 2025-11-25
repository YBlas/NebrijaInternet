import { gql } from "apollo-server";



export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
  }

  type VideoGame {
    _id: ID
    name: String
    date: String
    platform: String
  }

  type Query {
    me: User
    videoGames: [VideoGame]!
    videoGame(id: ID!): VideoGame
  }

  type Mutation {
    addVideoGame(name: String!, platform: String!, date: String!): VideoGame!
    register(email: String!, password: String!): String!
    login(email: String!, password: String!): String!
  }
`;