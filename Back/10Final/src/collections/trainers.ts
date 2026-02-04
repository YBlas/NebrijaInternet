import { getDB } from "../db/mongo";
import bcrypt from "bcryptjs";
import { COLLECTION_TRAINERS } from "../utils";
import { ObjectId } from "mongodb";






export const createTrainer = async (name: string, password: string) => {
    const db = getDB();
    const toEncriptao = await bcrypt.hash(password, 10);

    const result = await db.collection(COLLECTION_TRAINERS).insertOne({
        name,
        password: toEncriptao,
        pokemons: []
    });

    return result.insertedId.toString();
};

export const validateTrainer = async (name: string, password: string) => {
    const db = getDB();
    const user = await db.collection(COLLECTION_TRAINERS).findOne({name});
    if( !user ) return null;

    const laPassEsLaMismaMismita = await bcrypt.compare(password, user.password);
    if(!laPassEsLaMismaMismita) return null;

    return user;
};

export const findTrainerById = async (id: string) => {
    const db = getDB();
    return await db.collection(COLLECTION_TRAINERS).findOne({_id: new ObjectId(id)})
}