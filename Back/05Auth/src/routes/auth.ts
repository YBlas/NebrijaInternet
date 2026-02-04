import { Router } from "express";
import { connectMongoDB, getDb } from "../mongo";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = Router();

dotenv.config();

const SECRET = process.env.SECRET;

type User = {
    _id?: ObjectId;
    email: string;
    password: string;
}

type JwtPayload = {
    id: string;
    email: string;
}

const coleccion = () => getDb().collection<User>("UsersMorning");

router.get("/", async (req, res)=>{
  res.send("Se ha conectado a la ruta de auth correctamente");
});


router.post("/register", async (req, res) => {
    try{
        const {email, password} = req.body as {email:string, password:string};
        const users = coleccion();

        const exists = await users.findOne({email});
        if(exists){
            return res.status(400).json({message: "Email ya existente"})
        };

        const passEncripta = await bcrypt.hash(password,10);
        await users.insertOne({email, password: passEncripta});

        res.status(201).json({message: "Usuario creado correctamente!"})

    }catch(err){
        res.status(500).json({message: err});
    }
});

router.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body as {email:string, password:string};

        const users = coleccion();

        const user = await users.findOne({email});
        if(!user) return res.status(404).json({message: "email incorrecto"});

        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) return res.status(404).json({message: "contraseña incorrecta"});

        console.log(user);
        console.log(SECRET);
        const token = jwt.sign({id: user._id?.toString(), email: user.email} as JwtPayload, SECRET as string, {
            expiresIn: "1h"
        });

        console.log(token);

        res.status(200).json({message: "Login correcto", token})

    }catch(err){
        res.status(500).json({message: err});
    }
})



export default router;