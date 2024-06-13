// src/app.js
import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes";
import {errorHandler} from "./controllers/_utils/errorHandler";
import {controllerRefreshToken} from "./controllers/_utils/controllerRefreshToken";
import {controllerEntrypoint} from "./controllers/_utils/controllerEntrypoint";
import printer from "./utils/customPrinter";
import {ConfigApp} from "./config/ConfigApp";

dotenv.config();

const app: Express = express();
const port = ConfigApp.port;

printer.env("Data -> {}", ConfigApp);

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json());

app.use(controllerEntrypoint);
app.use("/", routes);
app.use(controllerRefreshToken);
app.use(errorHandler);

app.listen(port, () => {
	printer.info(`Server is running at http://localhost:${port}`);
});
