import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import server from "./server";
import authRouter from "./routes/auth";
import { facebookPassportConfig, googlePassportConfig } from "./utils/passport";
//Env Setting
dotenv.config();
const { MOGODB_NAME, MOGODB_PASSWORD, MOGODB_USER, PORT, HOST } = process.env;

facebookPassportConfig();
googlePassportConfig();
//Create Server
const createServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MOGODB_USER}:${MOGODB_PASSWORD}@my-graphql-basic.drpst.mongodb.net/${MOGODB_NAME}?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );

    const app = express();

    app.use("/auth", authRouter);

    server.applyMiddleware({ app });

    app.listen({ port: PORT, host: HOST }, () =>
      console.log(`Server ready at http://${HOST}:${PORT}${server.graphqlPath}`)
    );
  } catch (error) {
    console.error(error);
  }
};

createServer();
