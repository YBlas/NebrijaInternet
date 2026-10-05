



import express from "express";




type PeliculaT = {
    id: number,
    name: string,
    runtime: number
}

const peliculas: PeliculaT[] = [
    {
        id: 1,
        name: "Dead Or Alive",
        runtime: 100
    },
    {
        id: 2,
        name: "The spy who loved me",
        runtime: 150
    },
    {
        id: 3,
        name: "The breakfast club",
        runtime: 110
    }
];

const app = express();


app.get("/films",(req,res)=>{
    res.json(peliculas);
} )



const PORT = 6969;

app.listen(PORT, ()=>{
    console.log(`Ey, el api está furulando en el puerto ${PORT}`)
})