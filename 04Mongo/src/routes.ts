import { Router } from "express";
import { getDb } from "./mongo";


const router = Router();
const collection = () => getDb().collection('PruebaTarde');

router.get('/', async (req, res) => {
    try{
        const personas = await collection().find().toArray();
        res.json(personas);
    }catch(err){
        res.status(404).json(err);
    }
});


export default router;