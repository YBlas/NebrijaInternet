import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo";
import bcrypt from "bcryptjs";



const COLLECTION = "usersVideoGames";


export const createUser = async (email: string, password: string) => {
    const db = getDB();
    const toEncriptao = await bcrypt.hash(password, 10);

    const result = await db.collection(COLLECTION).insertOne({
        email,
        password: toEncriptao
    });

    return result.insertedId.toString();
}

export const validateUser = async (email: string, password: string) => {
    const db = getDB();
    const user = await db.collection(COLLECTION).findOne({email});
    if( !user ) return null;

    const laPassEsLaMismaMismita = await bcrypt.compare(password, user.password);
    if(!laPassEsLaMismaMismita) return null;

    return user;
};


export const findUserById = async (id: string) => {
    const db = getDB();
    return await db.collection(COLLECTION).findOne({_id: new ObjectId(id)})
}