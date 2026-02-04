import { Router } from "express";
import { getDb } from "./mongo";
import { ObjectId } from "mongodb";

const router = Router();
const coleccion = () => getDb().collection("PruebaTarde");

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 2;
    const skip = (page - 1) * limit;
    const personas = await coleccion().find().skip(skip).limit(limit).toArray();
    res.json({
      info: {
        page: page,
        numberOfPeopleInPage: limit,
      },
      result: personas,
    });
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

router.post(`/multiple`, async (req, res) => {
  try {
    const result = await coleccion().insertMany(req.body.people);
    res.status(201).json(result);
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

router.post("/setAllAges", async (_req, res) => {
  try {
    const result = await coleccion().updateMany(
      {},
      {
        $set: {
          age: 33,
        },
      }
    );
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/setAllFriends", async (req, res) => {
  try {
    const result = await coleccion().updateMany(
      {},
      {
        $set: {
          friends: ["Paco", "Pepa", "Pepe"],
        },
      }
    );
    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/noFriends/:age", async (req, res) => {
  try {
    const ageParam = Number(req.params.age);

    const result = await coleccion().updateMany(
      {
        age: { $gt: ageParam },
      },
      {
        $set: { friends: [] },
      }
    );

    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/ageEqual/:age", async (req, res) => {
  try {
    const result = await coleccion().deleteMany({
      age: { $eq: Number(req.params.age) },
    });

    res.json(result);
  } catch (err) {
    res.status(400).json(err);
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