import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";

export const controllerLogout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Qui puoi aggiungere la logica per inviare i dati al server o per autenticare l'utente
    console.log("Logout");

    // Esempio di risposta
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
