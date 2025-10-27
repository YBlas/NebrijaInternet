import { Db, MongoClient } from "mongodb";




let client: MongoClient;
let dB: Db;
const dbName = "Vicio"

export const connectMongoDB = async (): Promise<void> => {
    try {
        client = new MongoClient("mongodb+srv://kirk:patataEspacial@mongomake.3ta2r.mongodb.net/?appName=MongoMake");
        await client.connect();
        dB = client.db(dbName);
        console.log("Connected to mongodb at db " + dbName);
    } catch (error) {
        console.log("Error mongo: ", error);
    }
};

export const getDb = ():Db => dB;