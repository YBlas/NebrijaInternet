import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { UserVideoGame } from "../types/Users";
import { createUser, validateUser } from "../collections/usersVideoGames";
import { signToken } from "../auth";

const nameCollection = "VideoGames";

export const resolvers: IResolvers = {
  Query: {
    videoGames: async () => {
      const db = getDB();
      return db.collection(nameCollection).find().toArray();
    },

    videoGame: async (_, { id }) => {
      const db = getDB();
      return db.collection(nameCollection).findOne({ _id: new ObjectId(id) });
    },
    me: async (_, __, { user }) => {
      if (!user) return null;
      return {
        _id: user._id.toString(),
        email: user.email,
      };
    },
  },

  Mutation: {
    addVideoGame: async (_, { name, platform, date }) => {
      const db = getDB();
      const result = await db.collection(nameCollection).insertOne({
        name,
        platform,
        date,
      });
      return {
        _id: result.insertedId,
        name,
        platform,
        date,
      };
    },
    register: async (
      _,
      { email, password }: { email: string; password: string }
    ) => {
      const userId = await createUser(email, password);
      return signToken(userId);
    },
    login: async (
      _,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await validateUser(email, password);
      if (!user) throw new Error("Invalid credentials");
      return signToken(user._id.toString());
    },
  },
};