import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";





const server = new ApolloServer({typeDefs, resolvers});

server.listen({ port: 4000 }).then(()=>{
    console.log("gql rulando en el puerto 4000");
})