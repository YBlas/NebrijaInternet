import { Router } from "express";
import { deleteFilm, getFilms, getFilmWithID, changeFilm } from "../controllers/films.controller.js";



const router = Router();


router.get("/", getFilms);
router.get("/:id", getFilmWithID);
router.delete("/:id", deleteFilm);
router.patch("/:id", changeFilm);



export default router;