import express from 'express';
import cors from "cors";


type Calle = {
    numero: number,
    streetName: string,
    floor: number
};

type Person = {
    id: string,
    name: string,
    email: string,
    address: Calle 
};


let personicas:Person[] = [
    {
        id: "1",
        name: "Paco",
        email: "pacoPe@pepe.com",
        address: {
            floor: 1,
            numero: 155,
            streetName: "Capitan Haya"
        }
    },
    {
        id: "2",
        name: "Pepa",
        email: "pepaPe@gmail.com",
        address: {
            floor: 3,
            numero: 155,
            streetName: "Capitan Haya"
        }
    }
] 


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



app.get("/", (req, res)=>{
    res.send("Okey makei, te has conectado.");
});

app.get("/persons", (req, res)=>{
    res.json(personicas);
});

app.post("/person", (req, res)=>{
    const newUser:Person = {
        id: Date.now().toString(),
        ...req.body
    };
    personicas.push(newUser);
    res.status(201).json(newUser);
});

app.put("/person/:id", (req, res)=>{
    const id = req.params.id;
    const personasNuevas = personicas.map((persona)=>{
        return persona.id === id ? {...persona, ...req.body} : persona
    });
    personicas = personasNuevas;
    res.json({message: "Persona actualizada"});

});

app.delete("/person/:id", (req, res)=>{
    const id = req.params.id;
    const personasSinLaEliminada = personicas.filter(p=>!(p.id===id));
    personicas = personasSinLaEliminada;
    res.json({message: "Persona eliminada correctamente"})
})

app.listen(port, ()=>{
    console.log("Sever started at: "+port)
})