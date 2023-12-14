import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestLogoutData } from "../../models/requests/RequestLogoutData";

export const controllerLogout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username }: RequestLogoutData = req.body;

    if (!username) {
      throw createError(400, "Missing username ");
    }

    // Qui puoi aggiungere la logica per inviare i dati al server o per autenticare l'utente
    console.log("Register Data:", username);

    // Esempio di risposta
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
