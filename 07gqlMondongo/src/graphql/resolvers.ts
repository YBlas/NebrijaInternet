import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { IResolvers } from "@graphql-tools/utils";


const nameCollection = "VideoGames";

export const resolvers: IResolvers = {
    Query: {
        videoGames: async () => {  
            const db = getDB();  
            return db.collection(nameCollection).find().toArray();
        },

        videoGame: async (_, {id})=>{
            const db = getDB();  
            return db.collection(nameCollection).findOne({_id: new ObjectId(id)});
        }
    },

    Mutation: {
        addVideoGame: async (_, {name, platform, date})=>{
            const db = getDB();
            const result = await db.collection(nameCollection).insertOne({
                name,
                platform,
                date
            });
            return {
                _id: result.insertedId,
                name,
                platform,
                date
            }
        }
    }
}