import { Collection, MongoClient } from "mongodb";
import type { FilmT } from "../models/types"


const client = new MongoClient("mongodb+srv://kinoton:patata@mongomake.3ta2r.mongodb.net/");


let peliculasCollection: Collection<FilmT>;

export const connectDB = async () => {
    await client.connect();

    const db = client.db("Vicio");

    peliculasCollection = db.collection<FilmT>("cine");

    console.log("Conectado al Mondongo")
};

export const getPeliculasCollection = () => {
    return peliculasCollection
}