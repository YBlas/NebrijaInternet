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
    peliculasCollection.find().toArray().then((films)=>{
        res.json(films)
    }).catch(()=>{
        res.status(500).json({
            message: "Petó la llamada"
        })
    })
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
        return
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

    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Invalid ID"
        })
        return
    }


    peliculasCollection.deleteOne({
        _id: new ObjectId(id)
    }).then((result)=>{
        if(result.deletedCount === 0){
            res.status(404).json({
                message: "Película no eliminada"
            })
            return
        }

        res.json({
            message: "Película eliminada correctamente"
        })
    }).catch(()=>{
        res.status(500).json({
            message: "Se lió la picha eliminando"
        })
    })


    
}

export const changeFilm = (
    req: Request,
    res: Response
)=>{
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Invalid ID"
        })
        return
    }

    const peliActualizada:FilmT = {
        name: req.body.name,
        runtime: req.body.runtime
    }

    peliculasCollection.replaceOne({
        _id: new ObjectId(id)
    }, peliActualizada).then((result)=>{
        if(result.matchedCount === 0){
            res.status(404).json({
                message: "Película no encontrada"
            })
            return
        }

        res.json({
            _id: new ObjectId(id),
            ...peliActualizada
        })
    }).catch(()=>{
        res.status(500).json({
            message: "Se lió cambiando"
        })
    })
}