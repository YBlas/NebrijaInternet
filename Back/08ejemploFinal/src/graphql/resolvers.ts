import { IResolvers } from "@graphql-tools/utils";
import { addClothing, buyClothing, getClothes, getClothingById } from "../collections/productsClothingStore";
import { createUser, validateUser } from "../collections/usersClothingStore";
import { signToken } from "../auth";
import { ClothingUser } from "../types";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";





export const resolvers: IResolvers = {
    Query: {
        clothes: async (_, { page, size }) => {
            return await getClothes(page, size);
        },
        clothing: async (_, { id }) => {
            return await getClothingById(id);
        },
        me: async (_, __, { user }) => {
            if(!user) return null;
            return {
                _id: user._id.toString(),
                ...user
            }
        }
    },
    Mutation: {
        addClothing: async (_, { name, size, color, price }) => {
            return await addClothing(name, size, color, price);
        },
        buyClothing: async (_, { clothingId }, { user }) => {
            if(!user) throw new Error("You must be logged in to buy clothes");
            return await buyClothing(clothingId, user._id.toString());
        },
        register: async (_, { email, password }) => {
            const userId = await createUser(email, password);
            return signToken(userId);
        },
        login: async (_, { email, password }) => {
            const user = await validateUser(email, password);
            if(!user) throw new Error("Invalid credentials");
            return signToken(user._id.toString());
        }
    },
    User: {
        clothes: async (parent: ClothingUser) => {
            const db = getDB();
            const listaDeIdsDeRopa = parent.clothes;
            if(!listaDeIdsDeRopa) return [];
            const objectIds = listaDeIdsDeRopa.map((id) => new ObjectId(id));
            return db
                .collection("productsClothingStore")
                .find({ _id: { $in: objectIds } })
                .toArray();
        }
    }
}