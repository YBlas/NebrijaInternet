import express from "express";
import filmsRoutes from "./routes/films.routes.js"




const app = express();

app.use(express.json());

app.use("/films",filmsRoutes);

app.listen(3000, ()=>{
    console.log("Api funcionando en el puerto 300")
})