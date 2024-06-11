import { AxiosResponse } from "axios";
import { Request, Response } from "express";

export interface AuthServiceInterface {
	registerEmailVerification(req: Request, res: Response): Promise<AxiosResponse>;
	registerCodeVerification(req: Request, res: Response): Promise<AxiosResponse>;
	registerVerifyByEmail(req: Request, res: Response): Promise<AxiosResponse>;
	registerVerifyByCode(req: Request, res: Response): Promise<AxiosResponse>;
	login(req: Request, res: Response): Promise<AxiosResponse>;
	refresh(req: Request, res: Response): Promise<AxiosResponse>;
	logout(req: Request, res: Response): Promise<AxiosResponse>;
}
