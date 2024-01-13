import {AxiosResponse} from "axios";
import {Request, Response} from "express";

export interface AuthServiceInterface {
    register(req: Request, res: Response) : Promise<AxiosResponse>;
    registerVerify(req: Request, res: Response) : Promise<AxiosResponse>;
    login(req: Request, res: Response) : Promise<AxiosResponse>;
    refresh(req: Request, res: Response) : Promise<AxiosResponse>;
    logout(req: Request, res: Response) : Promise<AxiosResponse>;
}