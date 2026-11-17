export const typeDefs = `#graphql

    type Cast {
        name: String!,
        sex: String!,
        roles: [String!]!
    }

    type Pelicula {
        _id: ID!,
        name: String!,
        director: String!,
        runtime: Int!,
        year: Int!,
        recordingFormat: [String!]!,
        cast: [Cast!]!
    }

    input CastInput {
        name: String!,
        sex: String!,
        roles: [String!]!
    }

    input PeliculaInput {
        name: String!,
        director: String!,
        runtime: Int!,
        year: Int!,
        recordingFormat: [String!]!,
        cast: [CastInput!]!
    }

    input PeliculaChangeInput {
        name: String,
        director: String,
        runtime: Int,
        year: Int,
        recordingFormat: [String!],
        cast: [CastInput!]
    }

    type Query {
        peliculas: [Pelicula!]!
        pelicula(id: ID!): Pelicula
        peliculasPorDirector(director: String!): [Pelicula!]!
    }

    type Mutation {
        crearPelicula(input: PeliculaInput!): Pelicula!
        actualizarPelicula(id: ID!, input: PeliculaInput!): Pelicula
        cambiarPelicula(id: ID!, input: PeliculaChangeInput!): Pelicula
        eliminarPelicula(id: ID!): Pelicula
    }
`