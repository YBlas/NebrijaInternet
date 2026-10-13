import { Router } from "express";
import { getFilms, getFilmWithID } from "../controllers/films.controller.js";



const router = Router();


router.get("/", getFilms);
router.get("/:id", getFilmWithID);



export default router;