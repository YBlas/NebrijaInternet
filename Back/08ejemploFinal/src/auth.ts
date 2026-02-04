import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { getDB } from './db/mongo';
import { ObjectId } from 'mongodb';
import { COLLECTION_USERS } from './utils';

dotenv.config()


const SUPER_SECRETO = process.env.SECRET;

type TokenPayload = {
    userId: string;
}

export const signToken = (userId: string) => jwt.sign({ userId }, SUPER_SECRETO!, { expiresIn: "1h" });

export const verifyToken = (token: string): TokenPayload | null => {
    try{
        if(!SUPER_SECRETO) throw new Error("SECRET is not defined in environment variables");
        return jwt.verify(token, SUPER_SECRETO) as TokenPayload;
    }catch (err){
        return null;
    }
};

export const getUserFromToken = async (token: string) => {
    const payload = verifyToken(token);
    if(!payload) return null;
    const db = getDB();
    return await db.collection(COLLECTION_USERS).findOne({
        _id: new ObjectId(payload.userId)
    })
}