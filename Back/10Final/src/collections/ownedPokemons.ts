

import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo";
import { COLLECTION_OWNED_POKEMONS, COLLECTION_TRAINERS } from "../utils";


export const getOwnedPokemonById = async (id: string) => {
    const db = getDB();
    return await db.collection(COLLECTION_OWNED_POKEMONS).findOne({_id: new ObjectId(id)});
}


export const catchPokemon = async (pokemonId: string, nickname: string | null, trainerId: string) => {
    const db = getDB();
    const result = await db.collection(COLLECTION_OWNED_POKEMONS).insertOne({
        pokemon: pokemonId,
        nickname,
        attack: Math.floor(Math.random() * 100) + 1,
        defense: Math.floor(Math.random() * 100) + 1,
        speed: Math.floor(Math.random() * 100) + 1,
        special: Math.floor(Math.random() * 100) + 1,
        level: Math.floor(Math.random() * 100) + 1
    });
    const insertedOwnedPokemonId = result.insertedId.toString();

    await db.collection(COLLECTION_TRAINERS).updateOne(
        { _id: new ObjectId(trainerId) },
        { $addToSet: { pokemons: insertedOwnedPokemonId } }
    );

    const newOwnedPokemon = await getOwnedPokemonById(insertedOwnedPokemonId.toString());
    return newOwnedPokemon;
};

export const freePokemon = async (ownedPokemonId: string, trainerId: string) => {
    const db = getDB();
    await db.collection(COLLECTION_OWNED_POKEMONS).deleteOne({_id: new ObjectId(ownedPokemonId)});

    const trainer = await db.collection(COLLECTION_TRAINERS).findOne({_id: new ObjectId(trainerId)});

    const pokemons = trainer?.pokemons || [];

    const newPokemons = pokemons.filter((p: string) => p !== ownedPokemonId);
    
    await db.collection(COLLECTION_TRAINERS).updateOne(
        { _id: new ObjectId(trainerId) },
        { $set: { pokemons: newPokemons } }
    );
    const updatedTrainer = await db.collection(COLLECTION_TRAINERS).findOne({_id: new ObjectId(trainerId)});
    return updatedTrainer;
};