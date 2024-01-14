import { Request as ExpressRequest } from "express";
import {CustomAxiosConfig} from "./src/models/interfaces/CustomAxiosConfig";

declare module "express" {
  interface Request extends ExpressRequest {
    axiosConfig?: CustomAxiosConfig;
  }
}
