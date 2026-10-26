import express from "express";
import filmsRoutes from "./routes/films.routes.js"
import { connectMongo } from "./config/database.js";
import { configFilmCollection } from "./controllers/films.controller.js";
import type { Collection } from "mongodb";
import type { FilmT } from "./models/films.model.js";




const app = express();

app.use(express.json());

const startServer = () => {


    connectMongo().then((db)=>{
        const peliculasCollection:Collection<FilmT> = db.collection("Peliculillas");
        configFilmCollection(peliculasCollection);

        app.use("/films",filmsRoutes);

        app.listen(3001, ()=>{
            console.log("Api funcionando en el puerto 3001")
        })

    }).catch(()=>{
        console.log("No se ha podido conectar a Mongo, así que nada de API guapín")
    })

};

startServer();





