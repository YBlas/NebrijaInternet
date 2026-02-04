import jwt from "jsonwebtoken";
import { findTrainerById } from "./collections/trainers";
import dotenv from 'dotenv';

dotenv.config();


const SUPER_SECRETO = process.env.SUPER_SECRETO;

export const signToken = (trainerId: string) => jwt.sign({ trainerId }, SUPER_SECRETO!, { expiresIn: "1h" });

export const verifyToken = (token: string): { trainerId: string } | null => {
    try{
        if(!SUPER_SECRETO) throw new Error("SECRET is not defined in environment variables");
        return jwt.verify(token, SUPER_SECRETO) as { trainerId: string };
    }catch (err){
        return null;
    }
};

export const getTrainerFromToken = async (token: string) => {
    const payload = verifyToken(token);
    if(!payload) return null;
    return await findTrainerById(payload.trainerId);
}