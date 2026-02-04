import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET;

export interface AuthRequest extends Request {
    user?: string | jwt.JwtPayload;
};


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction):void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(401).json({ message: "Access token is missing" });
        return;
    };

    jwt.verify(token, SECRET as string, (err, decoded) => {
        if(err){
            res.status(403).json({ message: "Invalid access token" });
            return;
        }
        req.user = decoded;
        next();
    })
}