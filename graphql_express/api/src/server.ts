import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { authenticateUser, authMiddleware } from "./middlewares/auth";
// import schema from "./graphql/schema";
// Removed createHandler as it's not compatible with Express

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

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  // Start Apollo Server and apply middleware
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        try {
          const user = authenticateUser(req); // Use the reusable function
          return { user };
        } catch (error) {
          return { user: null }; // Handle unauthenticated users
        }
      },
    }) as unknown as express.RequestHandler
  );
};
// Start the server at port
app.listen(5000);
console.log("Running a GraphQL API server at http://localhost:5000/graphql");

startServer();
