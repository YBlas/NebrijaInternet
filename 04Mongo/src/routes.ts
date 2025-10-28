import { Router } from "express";
import { getDb } from "./mongo";
import { ObjectId } from "mongodb";

const router = Router();
const coleccion = () => getDb().collection("PruebaTarde");

router.get("/", async (req, res) => {
  try {
    const personas = await coleccion().find().toArray();
    res.json(personas);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const idDelParametro = req.params.id;
  if (idDelParametro.length == 24) {
    const personaEncontradaOno = await coleccion().findOne({
      _id: new ObjectId(idDelParametro),
    });
    personaEncontradaOno
      ? res.json(personaEncontradaOno)
      : res.status(404).json({ message: "Persona con dicho id no existe" });
  } else {
    res
      .status(404)
      .json({ message: "Id de diferente longitud a 24 caracteres" });
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newName = req.body?.name;
    const newLastName = req.body?.lastName;
    if (
      newName &&
      newLastName &&
      typeof newName === "string" &&
      typeof newLastName === "string"
    ) {
      const result = await coleccion().insertOne(req.body);
      const idMongo = result.insertedId;
      const personaCreada = await coleccion().findOne({ _id: idMongo });
      res.status(201).json(personaCreada);
    } else {
      res.status(400).json({ message: "Invalid input body" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await coleccion().updateOne(
      { _id: new ObjectId(req.params?.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await coleccion().deleteOne({
      _id: new ObjectId(req.params?.id),
    });
    res.json({ result });
  } catch (err) {
    res.status(404).json(err);
  }
});


export default router;