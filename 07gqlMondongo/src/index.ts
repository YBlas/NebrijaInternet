import { ApolloServer } from "apollo-server";
import { connectToMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";







const start = async () => {
    await connectToMongoDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req})=>{
            return req;
        }
    });

    await server.listen({port: 4000});
    console.log("GQL sirviendo y de to");
};



start().catch(err=>console.error(err));