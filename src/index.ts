



import express from "express";




type PeliculaT = {
    id: number,
    name: string,
    runtime: number
}

let peliculas: PeliculaT[] = [
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
        runtime: 112
    }
];

const app = express();


app.use(express.json());


app.get("/films",(req,res)=>{
    res.json(peliculas);
} );


app.get("/films/:id", (req,res)=>{
    const id = Number(req.params.id);

    const peliculaBuscada = peliculas.find((x)=>x.id === id);


    if(!peliculaBuscada){
        res.status(404).json({
            message: `The film with id ${id} does not exist in our database`
        })
    }

    res.json(peliculaBuscada);
});


app.delete("/films/:id", (req,res)=>{
    const id = Number(req.params.id);

    const peliBuscada = peliculas.find((x)=>x.id === id);

    if(!peliBuscada){
        res.status(404).json({
            message: `The film with id ${id} does not exist in our database`
        })
    }

    const nuevoArrayDePelis = peliculas.filter((x)=>!(x.id===id));

    peliculas = nuevoArrayDePelis;

    res.json({
        message: `Película ${peliBuscada?.name} ha sido eliminada`
    })
});


app.post("/films", (req,res)=>{

    if(!req.body){
        res.status(400).json({
            message: "This is a post creation endpoint, you must send a body"
        })
        return
    }
    

    if(!req.body.name){
        res.status(400).json({
            message: "The 'name' parameter has not been defined"
        })
        return
    }

    if(!req.body.runtime){
        res.status(400).json({
            message: "The 'runtime' parameter has not been defined"
        });
        return
    }

    const nuevaPelicula: PeliculaT = {
        id: Math.random(),
        name: req.body.name,
        runtime: req.body.runtime
    }

    peliculas.push(nuevaPelicula);

    res.status(201).json(nuevaPelicula);
})


app.put("/films/:id",(req,res)=>{

    const id = Number(req.params.id);

    if(!req.body){
        res.status(400).json({
            message: "This is a post creation endpoint, you must send a body"
        })
        return
    }
    
    if(!req.body.name){
        res.status(400).json({
            message: "The 'name' parameter has not been defined"
        })
        return
    }

    if(!req.body.runtime){
        res.status(400).json({
            message: "The 'runtime' parameter has not been defined"
        });
        return
    }

    const peliculaAactualizar = peliculas.find((x)=>x.id===id);

    if(!peliculaAactualizar){
        res.status(404).json({
            message: "Esa peli no existe manoli"
        })
    }

    const cambioPeli: PeliculaT = {
        id,
        name: req.body.name,
        runtime: req.body.runtime
    }

    peliculas = peliculas.map((x)=>x.id===id?cambioPeli:x);

    res.json({
        message: `La película con id ${id} ha sido actualizada`
    })

})

app.patch("/films/:id", (req,res)=>{

    const id = Number(req.params.id);

    if(!req.body){
        res.status(400).json({
            message: "This is a post creation endpoint, you must send a body"
        })
        return
    }

    if(!(req.body.name || req.body.runtime)){
        res.status(400).json({
            message: "No values to change"
        })
    }

    const peliculaAactualizar = peliculas.find((x)=>x.id===id);

    if(!peliculaAactualizar){
        res.status(404).json({
            message: "Esa peli no existe manoli"
        })
        return
    }

    const peliActualizada : PeliculaT = {
        ...peliculaAactualizar,
        name: req?.body?.name ? req.body.name : peliculaAactualizar.name,
        runtime: req?.body?.runtime ? req.body.runtime : peliculaAactualizar.runtime
    }

    peliculas = peliculas.map((x)=>x.id===id?peliActualizada:x);

    res.json({
        message: `Peli ${peliculaAactualizar.name} ha sido actualizada`
    })

});


const PORT = 6969;

app.listen(PORT, ()=>{
    console.log(`Ey, el api está furulando en el puerto ${PORT}`)
})