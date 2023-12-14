import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestRegisterData } from "../../models/requests/RequestRegisterData";

export const controllerRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password }: RequestRegisterData = req.body;

    if (!username || !password) {
      throw createError(400, "Missing username or password");
    }

    // Qui puoi aggiungere la logica per inviare i dati al server o per autenticare l'utente
    console.log("Register Data:", username, password);

    // Esempio di risposta
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
};
