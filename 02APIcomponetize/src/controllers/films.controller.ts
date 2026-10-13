import type { Request, Response } from "express";
import { films } from "../data/films.data.js";


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