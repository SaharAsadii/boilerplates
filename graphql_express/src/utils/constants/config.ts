import * as dotenv from "dotenv";
dotenv.config();



const NODE = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
};

const MONGO = {
  MONGO_URI: process.env.MONGO_URI
};

const REDIS = {
  REDIS_URI: process.env.REDIS_URI,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT
};


const JWT = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_REDIS_EXPIRE: process.env.JWT_REDIS_EXPIRE,
  JWT_SECRET_CUSTOMER: process.env.JWT_SECRET_CUSTOMER
};


export const config = {
  NODE,
  MONGO,
  REDIS,
  JWT,
};
