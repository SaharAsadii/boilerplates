import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import fileUpload from "express-fileupload";
import express, { Express } from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { root } from "./resolvers";
import { createStream } from "rotating-file-stream";
import path from "path";
import { connectionDB } from "./config/db";
import { redisInitializer } from "./config/redis-db";
import { errorHandler } from "./middleware";
import authRoutes from "./routes/user/auth.routes";
import userRoutes from "./routes/user/user.routes";
import { config } from "./utils/constants";
import { morganLog } from "./utils/utility";
import { events } from "./events";

// creating log file -----------------------------------------------
const accessLogStream = createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log-sell")
});

// creating error log file -----------------------------------------
const errorLogFile = createStream("error.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log-sell")
});

// creating custom token for morgan ---------------------------------
morgan.token("custom-token", morganLog);

export const app: Express = express();

// load env file ---------------------------------------------------
dotenv.config();
const PORT = config.NODE.PORT ?? 8000;



app.use(
  morgan(":custom-token", {
    stream: accessLogStream,
    skip: function (req, res) {
      return res.statusCode > 400;
    }
  })
);

app.use(
  morgan(":custom-token", {
    stream: errorLogFile,
    skip: function (req, res) {
      return res.statusCode < 400;
    }
  })
);

//adding events
events(app);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Adding fileUpload functionality

app.use(fileUpload({ createParentPath: true }));

// Adding the upload folder ---------------------------------
app.use(express.static(path.join(__dirname, "..", "public")));

// Adding the bodyParser to be able to read the body of the request

app.use(express.json());

// Connecting to MongoDB Mongo must be already running in the port specified
connectionDB();

// connect to Redis -----------------------------------------
const redisClient = redisInitializer();
global.redis = redisClient;

// Adding the cookieParser middleware so in our req we can access to req.cookie
app.use(cookieParser());

// Removing the characters that can hack into database ------
app.use(mongoSanitize({ allowDots: true }));

// Adding security to res header ----------------------------
app.use(helmet());

// Setting up the rateLimiter -------------------------------
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000 // limit each IP to 10000 requests per windowMs
});

app.use(limiter);

// setting up the hpp security -------------------------------
app.use(hpp());
app.use(compression());



// USER ROUTES ---------------------------------------------------
app.use("/api/v2/user/auth", authRoutes);
app.use("/api/v2/user/user", userRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(errorHandler);

// setup graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

//Handling errors
process.on("unhandledRejection", async (err: Error) => {
  console.error(err);
  console.error(`Error is ${err.message}`);
});
