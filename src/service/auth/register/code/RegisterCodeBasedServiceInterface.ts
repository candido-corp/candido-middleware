import {Request, Response} from "express";
import {AxiosResponse} from "axios";

export interface RegisterCodeBasedServiceInterface {
	register(req: Request, res: Response): Promise<AxiosResponse>;
	registerVerify(req: Request, res: Response): Promise<AxiosResponse>;
	registerResendCode(req: Request, res: Response): Promise<AxiosResponse>;
}
