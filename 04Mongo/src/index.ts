import express from "express";
import { connectMongoDB } from "./mongo";
import routerPersonas from "./routes";

connectMongoDB();

const app = express();
app.use(express.json());
app.use("/api/personas", routerPersonas);
app.listen(3000, () => console.log("El API ha comenzado baby"));
