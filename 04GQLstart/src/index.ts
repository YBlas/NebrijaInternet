import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type CastT = {
    name: string,
    sex: string,
    roles: string[]
}

type FilmT = {
    _id?:string,
    name: string,
    director: string,
    runtime: number,
    year: number,
    recordingFormat: string[],
    cast: CastT[]
}


const peliculas: FilmT[] = [
    {
        _id: "1",
        name: "Inception",
        director: "Christopher Nolan",
        runtime: 148,
        year: 2010,
        recordingFormat: ["15perf70mm", "5perf70mm", "super35mm"],
        cast: [
            {
                name: "Leonardo DiCaprio",
                sex: "Male",
                roles: ["Cobb"]
            },
            {
                name: "Joseph Gordon-Levitt",
                sex: "Male",
                roles: ["Arthur"]
            }
        ]
    },
    {
        _id: "2",
        name: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        runtime: 136,
        year: 1999,
        recordingFormat: ["35mm"],
        cast: [
            {
                name: "Keanu Reeves",
                sex: "Male",
                roles: ["Neo"]
            },
            {
                name: "Laurence Fishburne",
                sex: "Male",
                roles: ["Morpheus"]
            }
        ]
    }
];


const typeDefs = `#graphql

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

    type Query {
        peliculas: [Pelicula!]!
    }
`


const resolvers = {
    Query:{
        peliculas: () => peliculas
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server,{
        listen: {port: 3000}
    });

    console.log(`Servidor furulando en ${url}`);

};


startServer();