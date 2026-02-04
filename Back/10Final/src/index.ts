import { ApolloServer } from "apollo-server";
import { connectToMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { getTrainerFromToken } from "./auth";

const start = async () => {
  await connectToMongoDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const trainer = token ? await getTrainerFromToken(token as string) : null;
      return { trainer };
    },
  });

  await server.listen({ port: 4000 });
  console.log("GQL sirviendo y de to");
};



start().catch(err=>console.error(err));