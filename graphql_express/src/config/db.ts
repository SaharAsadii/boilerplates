import mongoose from "mongoose";
import { config } from "src/utils/constants";

export const connectionDB = async () => {
  const mongoUrl = config.MONGO.MONGO_URI;
  mongoUrl && (await mongoose.connect(mongoUrl));
  console.info(`mongoDB connected `);
  return;
};
