import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestRegisterData } from "../../models/requests/RequestRegisterData";
import { StatusCodes } from "http-status-codes";

export const controllerRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, confirm_password }: RequestRegisterData =
      req.body;

    if (!username || !password || !confirm_password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing username or password or confirm_password"
      );
    }

    // Qui puoi aggiungere la logica per inviare i dati al server o per autenticare l'utente
    console.log("Register Data:", username, password, confirm_password);

    // Esempio di risposta
    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};
