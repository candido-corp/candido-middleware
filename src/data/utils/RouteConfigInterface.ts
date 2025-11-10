import {Router} from "express";
import {EnumControllerType} from "../enums/EnumControllerType";
import {EnumControllerName} from "../enums/EnumControllerName";

type HttpMethod = keyof Router;

export interface RouteConfigInterface {
	access: EnumControllerType;
	method: HttpMethod;
	path: string;
	controller: EnumControllerName;
}
