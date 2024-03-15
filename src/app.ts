// src/app.js
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes/routes";
import { errorHandler } from "./controllers/_utils/errorHandler";
import { controllerRefreshToken } from "./controllers/auth/controllerRefreshToken";
import { controllerEntrypoint } from "./controllers/controllerEntrypoint";
import {printer} from "./utils/printer";

dotenv.config();

const app: Express = express();
const port = 3001;

printer("App::env -> NODE_ENV [{}] | SERVER_BASE_URL [{}]", process.env.NODE_ENV, process.env.SERVER_BASE_URL);

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(cookieParser());

app.use(express.json());

app.use(controllerEntrypoint);

app.use("/", routes);

app.use(controllerRefreshToken);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
