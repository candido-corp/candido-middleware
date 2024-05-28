import {Request, Response} from "express";
import {AxiosResponse} from "axios";

export interface RegisterEmailBasedServiceInterface {
	register(req: Request, res: Response): Promise<AxiosResponse>;
	registerVerify(req: Request, res: Response): Promise<AxiosResponse>;
}
