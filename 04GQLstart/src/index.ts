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

type FilmPatchT = {
    name?: string,
    director?: string,
    runtime?: number,
    year?: number,
    recordingFormat?: string[],
    cast?: CastT[]
}


let peliculas: FilmT[] = [
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
    },{
        _id: "3",
        name: "Interstellar",
        director: "Christopher Nolan",
        runtime: 169,
        year: 2014,
        recordingFormat: ["IMAX", "35mm"],
        cast: [
            {
                name: "Matthew McConaughey",
                sex: "Male",
                roles: ["Cooper"]
            },
            {
                name: "Anne Hathaway",
                sex: "Female",
                roles: ["Brand"]
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


const resolvers = {
    Query:{
        peliculas: () => peliculas,
        pelicula: (_: unknown, args: { id: string}) => {
            const { id } = args;
            return peliculas.find(peli => peli._id === id);
        },
        peliculasPorDirector: (_:unknown, args: { director: string}) => {
            const { director } = args;
            return peliculas.filter(peli=> peli.director === director)
        }
    },
    Mutation:{
        crearPelicula: (_:unknown, args: { input : FilmT }) => {
            const nuevaPelicula: FilmT = {
                _id: String(peliculas.length+1),
                ...args.input
            };
            peliculas.push(nuevaPelicula);
            return nuevaPelicula
        },
        actualizarPelicula: (_:unknown, args: { id: string, input: FilmT}) => {

            const peliculaAactualizar = peliculas.find(peli => peli._id === args.id);

            if(!peliculaAactualizar){
                return null;
            }

            const nuevoArrayDePeliculas = peliculas.map((peli)=>{
                if(peli._id !== args.id){
                    return peli
                } else {
                    return {
                        _id: args.id,
                        ...args.input
                    }
                }
            });

            peliculas = nuevoArrayDePeliculas;

            return {
                _id: args.id,
                ...args.input
            }
        },
        cambiarPelicula: (_:unknown, args: { id: string, input: FilmPatchT}) => {
            const peliculaAactualizar = peliculas.find(peli => peli._id === args.id);

            if(!peliculaAactualizar){
                return null;
            }

            const nuevoArrayDePeliculas = peliculas.map((peli)=>{
                if(peli._id !== args.id){
                    return peli
                } else {
                    return {
                        ...peliculaAactualizar,
                        ...args.input
                    }
                }
            });

            peliculas = nuevoArrayDePeliculas;

            return {
                ...peliculaAactualizar,
                ...args.input
            }
        },
        eliminarPelicula: (_:unknown, args: {id: string}) => {
            const peliculaAElminar = peliculas.find(peli => peli._id === args.id);

            if (!peliculaAElminar) return null;

            const nuevoArray = peliculas.filter(x => x._id !== args.id);

            peliculas = nuevoArray;

            return peliculaAElminar;
        }
    }
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