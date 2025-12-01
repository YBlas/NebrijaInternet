import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { UserVideoGame } from "../types/Users";
import { createUser, validateUser } from "../collections/usersVideoGames";
import { signToken } from "../auth";
import { VideoGame } from "../types/VideoGame";

const nameCollection = "VideoGames";
const COLLECTION_USERS = "usersVideoGames";

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
        videoGameLibrary: user.videoGameLibrary || [],
      };
    },
  },

  User: {
    videoGameLibrary: async (parent: UserVideoGame) => {
      const db = getDB();
      const listaDeIdsDeVideojuegos = parent.videoGameLibrary;
      const objectIds = listaDeIdsDeVideojuegos.map((id) => new ObjectId(id));
      return db
        .collection(nameCollection)
        .find({ _id: { $in: objectIds } })
        .toArray();
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
    addVideoGameToMyLibrary: async (
      _,
      { videoGameId }: { videoGameId: string },
      { user }
    ) => {
      if (!user) throw new Error("No eres nadie Juan de las Nieves");
      const db = getDB();
      const userId = new ObjectId(user._id);
      const videoGameIdObjetitoMongo = new ObjectId(videoGameId);

      const videoGame = await db
        .collection(nameCollection)
        .findOne({ _id: videoGameIdObjetitoMongo });
      if (!videoGame) throw new Error("El videojuego no existe");

      await db.collection(COLLECTION_USERS).updateOne(
        { _id: userId },
        {
          $addToSet: { videoGameLibrary: videoGameId },
        }
      );

      const updateUser = await db.collection(COLLECTION_USERS).findOne({
        _id: userId,
      });

      return updateUser;
    },
  },
};