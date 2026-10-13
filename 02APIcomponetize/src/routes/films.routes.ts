import { Router } from "express";
import { deleteFilm, getFilms, getFilmWithID } from "../controllers/films.controller.js";



const router = Router();


router.get("/", getFilms);
router.get("/:id", getFilmWithID);
router.delete("/:id", deleteFilm);



export default router;