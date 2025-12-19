import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo";
import { COLLECTION_POKEMONS } from "../utils";




export const getPokemonById = async (id: string) => {
    const db = getDB();
    return await db.collection(COLLECTION_POKEMONS).findOne({_id: new ObjectId(id)});
}

export const getAllPokemons = async (page?: number, size?: number) => {
    const db = getDB();
    page = page || 1;
    size = size || 10;
    return await db.collection(COLLECTION_POKEMONS).find().skip((page - 1) * size).limit(size).toArray();
};


export const createPokemon = async (name: string, description: string, height: number, weight: number, types: string[]) => {
    const db = getDB();
    const result = await db.collection(COLLECTION_POKEMONS).insertOne({
        name,
        description,
        height,
        weight,
        types
    });
    const newPokemon = await getPokemonById(result.insertedId.toString());
    return newPokemon;
};