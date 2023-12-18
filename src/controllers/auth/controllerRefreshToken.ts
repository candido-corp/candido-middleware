import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestRefreshToken } from "../../models/requests/RequestRefreshToken";
import { StatusCodes } from "http-status-codes";

export const controllerRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken }: RequestRefreshToken = req.body;

    if (!refreshToken) {
      throw createError(StatusCodes.BAD_REQUEST, "Missing refresh token");
    }
    // Qui puoi aggiungere la logica per inviare i dati al server o per autenticare l'utente
    console.log("Refresh Token:", refreshToken);

    // Esempio di risposta
    res.status(StatusCodes.OK).send({});
  } catch (error) {
    next(error);
  }
};
