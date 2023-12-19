// src/app.js
import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes/routes";
import { errorHandler } from "./utils/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());

app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
