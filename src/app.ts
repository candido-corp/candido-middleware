// src/app.js
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes/routes";
import { errorHandler } from "./controllers/_utils/errorHandler";
import { controllerRefreshToken } from "./controllers/controllerRefreshToken";
import { controllerEntrypoint } from "./controllers/controllerEntrypoint";
import {printerEnv, printerInfo} from "./utils/customPrinter";
import { ConfigApp } from "./config/ConfigApp";

dotenv.config();

const app: Express = express();
const port = 3001;

printerEnv("Data -> {}", ConfigApp);

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(cookieParser());

app.use(express.json());

app.use(controllerEntrypoint);

app.use("/", routes);

app.use(controllerRefreshToken);

app.use(errorHandler);

app.listen(port, () => {
  printerInfo(`Server is running at http://localhost:${port}`);
});
