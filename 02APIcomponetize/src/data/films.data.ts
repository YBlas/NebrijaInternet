import type { FilmT } from "../models/films.model.js";



export let films: FilmT[] = [
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
]

export const changeFilms = (filmsParam:FilmT[]) => {
    films=filmsParam
}