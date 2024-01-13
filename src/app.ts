// src/app.js
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes/routes";
import { errorHandler } from "./controllers/_utils/errorHandler";
import { controllerRefreshToken } from "./controllers/auth/controllerRefreshToken";
import { controllerEntrypoint } from "./controllers/controllerEntrypoint";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(controllerEntrypoint);

app.use("/", routes);

app.use(controllerRefreshToken);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
