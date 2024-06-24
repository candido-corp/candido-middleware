// src/app.js
import express, {Express, NextFunction} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes";
import {errorHandler} from "./controllers/_utils/errorHandler";
import {controllerRefreshToken} from "./controllers/_utils/controllerRefreshToken";
import {controllerEntrypoint} from "./controllers/_utils/controllerEntrypoint";
import printer from "./utils/customPrinter";
import {ConfigApp} from "./config/ConfigApp";
import {RouteConfigInterface} from "./data/utils/RouteConfigInterface";
import {Controller} from "./controllers/v1/Controller";

dotenv.config();

const app: Express = express();
const port = ConfigApp.port;
const router = express.Router();

printer.env("Data -> {}", ConfigApp);

function mapRoutes(routes: RouteConfigInterface[], router: express.Router) {
	routes.forEach(route => {
		if (route.method in router) {
			(router[route.method] as Function).call(router, route.path,
				(req: any, res: any, next: NextFunction) =>
					Controller(req, res, next, route.controller, route.access)
			);
		}
	});
}
mapRoutes(routes, router);

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json());

app.use(controllerEntrypoint);
app.use("/", router);
app.use(controllerRefreshToken);
app.use(errorHandler);
app.use('*', function(req, res){
	res.status(404).send();
});

app.listen(port, () => {
	printer.info(`Server is running at http://localhost:${port}`);
});
