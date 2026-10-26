import type { Request, Response } from "express";
import { ObjectId, type Collection } from "mongodb";
import type { FilmT } from "../models/films.model.js";


let peliculasCollection:Collection<FilmT>;


export const configFilmCollection = (collection: Collection<FilmT>) =>{
    peliculasCollection = collection
}


export const getFilms = (
    req: Request,
    res: Response
) => {
    // res.json(films);
}


export const getFilmWithID = (
    req: Request,
    res: Response
)=>{
    const id = String(req.params.id);

    
    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Invalid ID"
        })
    }

    peliculasCollection.findOne({
        _id: new ObjectId(id)
    }).then((result)=>{
        if(!result){
            res.status(404).json({
                message: "Película no encontrada"
            })
            return;
        }

        res.json(result);
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
            message: "Algo ha ido mal al buscar la peli"
        })
    })

    
}

export const createFilm = (
    req: Request,
    res: Response
)=>{
    const newFilm: FilmT = {
        name: req.body.name,
        runtime: req.body.runtime
    };

    peliculasCollection.insertOne(newFilm).then((result)=>{
        res.status(201).json({
            _id: result.insertedId,
            ...newFilm
        })
    }).catch(()=>{
        res.status(500).json({
            message: "Error al crear la película"
        })
    })
}

export const deleteFilm = (
    req: Request,
    res: Response
)=>{
    const id = String(req.params.id);

    const film = findFilm(id,res);

    // if(film){
    //     changeFilms(films.filter(x=>x.id!==id));
    //     res.json({
    //         message: "Película eliminada"
    //     })
    // }else{
    //     res.status(400).json({
    //         message: "No se puedo eliminar"
    //     })
    // }
}

export const changeFilm = (
    req: Request,
    res: Response
)=>{
    const id = String(req.params.id);

    const film = findFilm(id,res);

    // if(film){
    //     const updatedFilm = {...film,...req.body};
    //     changeFilms(films.map(x=>x.id===id?updatedFilm:x));
    //     res.json({
    //         message: "Película actualizada",
    //         film: updatedFilm
    //     })
    // }else{
    //     res.status(400).json({
    //         message: "No se pudo actualizar"
    //     })
    // }
}