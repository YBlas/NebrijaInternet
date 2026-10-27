import { Router } from "express";
import { deleteFilm, getFilms, getFilmWithID, changeFilm, createFilm } from "../controllers/films.controller.js";



const router = Router();


router.get("/", getFilms);
router.get("/:id", getFilmWithID);
router.delete("/:id", deleteFilm);
router.put("/:id", changeFilm);
router.post("/", createFilm);



export default router;