import { gql } from "apollo-server";



export const typeDefs = gql`

    type VideoGame {
        _id: ID,
        name: String,
        date: String,
        platform: String
    }

    type Query {
        videoGames: [VideoGame]!,
        videoGame(id: ID!): VideoGame
    }

    type Mutation {
        addVideoGame(name: String!, platform: String!, date: String!): VideoGame!
    }

`