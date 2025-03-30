import jwt from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import connectDB from "./db";
import typeDefs from "./schema";
import resolvers from "./resolvers";

dotenv.config();
connectDB();

const getUserFromToken = (token: string) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, "SECRET_KEY");
    if (typeof decoded === "object" && "userId" in decoded) {
      return decoded.userId;
    }
    return null;
  } catch {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const userId = getUserFromToken(token);
      return Promise.resolve({ userId });
    },
  });
  console.log(`Server running at ${url}`);
};

startServer();
