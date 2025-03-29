import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { authMiddleware } from "./middlewares/auth";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => authMiddleware(req, res),
    }) as unknown as express.RequestHandler
  );
};

app.listen(5000);
console.log("Running a GraphQL API server at http://localhost:5000/graphql");

startServer();
