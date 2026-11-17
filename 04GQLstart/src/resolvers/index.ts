import { getPeliculasCollection } from "../config/db";
import type { FilmPatchT, FilmT } from "../models/types";

export const resolvers = {
    Query:{
        peliculas: async () => {
            const collection = getPeliculasCollection();

            return await collection.find().toArray();
        },
        pelicula: (_: unknown, args: { id: string}) => {
            const { id } = args;
            return []
        },
        peliculasPorDirector: (_:unknown, args: { director: string}) => {
            const { director } = args;
            return []
        }
    },
    Mutation:{
        crearPelicula: async (_:unknown, args: { input : FilmT }) => {
            const collection = getPeliculasCollection();

            const nuevaPeli:FilmT = args.input;

            const insertada = await collection.insertOne(nuevaPeli);

            const nuevaPeliConId = await collection.findOne({
                _id: insertada.insertedId
            });

            return nuevaPeliConId;
        },
        actualizarPelicula: (_:unknown, args: { id: string, input: FilmT}) => {

            return null
        },
        cambiarPelicula: (_:unknown, args: { id: string, input: FilmPatchT}) => {
            return null
        },
        eliminarPelicula: (_:unknown, args: {id: string}) => {
            return null
        }
    }
};