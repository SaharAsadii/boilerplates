import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import connectDB from "./db";
import typeDefs from "./schema";
import resolvers from "./resolvers";

dotenv.config();
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });
  console.log(`Server running at ${url}`);
};

startServer();
