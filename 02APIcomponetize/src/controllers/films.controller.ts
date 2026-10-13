import type { Request, Response } from "express";
import { changeFilms, films } from "../data/films.data.js";


export const getFilms = (
    req: Request,
    res: Response
) => {
    res.json(films);
}

const findFilm = (id: number, res:Response) => {

    const film = films.find(x=>x.id===id);

    if(!film){
        res.status(404).json({
            message: "no film"
        })
        return
    }

    return film;
}


export const getFilmWithID = (
    req: Request,
    res: Response
)=>{
    const id = Number(req.params.id);

    const film = findFilm(id,res);

    res.json(film);
}

export const deleteFilm = (
    req: Request,
    res: Response
)=>{
    const id = Number(req.params.id);

    const film = findFilm(id,res);

    if(film){
        changeFilms(films.filter(x=>x.id!==id));
        res.json({
            message: "Película eliminada"
        })
    }else{
        res.status(400).json({
            message: "No se puedo eliminar"
        })
    }
}

export const changeFilm = (
    req: Request,
    res: Response
)=>{
    const id = Number(req.params.id);

    const film = findFilm(id,res);

    if(film){
        const updatedFilm = {...film,...req.body};
        changeFilms(films.map(x=>x.id===id?updatedFilm:x));
        res.json({
            message: "Película actualizada",
            film: updatedFilm
        })
    }else{
        res.status(400).json({
            message: "No se pudo actualizar"
        })
    }
}