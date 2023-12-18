import { NextFunction, Request, Response } from "express";
import { createError } from "../../utils/createError";
import { RequestLoginData } from "../../models/requests/RequestLoginData";
import { StatusCodes } from "http-status-codes";

export const controllerLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password }: RequestLoginData = req.body;

    if (!username || !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        "Missing username or password"
      );
    }

    // Qui puoi aggiungere la logica per inviare i dati al server o per autenticare l'utente
    console.log("Login Data:", username, password);

    // Esempio di risposta
    res.status(StatusCodes.OK).send({
      "access_token":
        "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHSHVBOFR6c3VBMENUemRsSm4zdnFnazdvNHhHSENNY2xhaTJyak1YR1dZIn0.eyJleHAiOjE3MDE4MTM1OTEsImlhdCI6MTcwMTgxMzUzMSwianRpIjoiOGIyZjE2MzctZGNjMC00MDE0LTk5ZDEtZGVlYjUxNDk4YTVjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiI4YTg0Njk0Yy01YjE5LTRjYzctYWI2Mi1mNzI3OWMyYzI0ZjAiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiNjhlY2Y1MzYtNTNjZC00MDI0LTgxMWItZDIwMDUyMzA4ZmMwIiwiYWNyIjoiMSIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6IjY4ZWNmNTM2LTUzY2QtNDAyNC04MTFiLWQyMDA1MjMwOGZjMCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4ifQ.E_nk6VVsynU1MQC-tzb4S8MHbfs2MTsCNohVpy7MT99iN-JJFGTHPWvaRHjacoNWU9imDgQVkBQARZJbWU0eq38h6u0M1JkTcUMf2B6D7MvODNILdVAVQh5379TdO6XkOB215rTCjbpZFuv2MN6BNDJZMSoBVExRm6g7rRgKW4oYqSC3GWi2bbB5siQpDf-uLZRHGxij4fRPo_Aay1bLnA6b6GR6V5-2ohr6n5vN0-gLOrkYtBp7fYGJi0RKcI3_mhyc-t0m9TBBu-q3XUxvRtLC_wpvQND6P_aaU38TaVZ9XLbYm7YkdRJdj5VzQf4OrO_w1FrEvHRUG1Bic8iuBg",
      "expires_in": 60,
      "refresh_expires_in": 1800,
      "refresh_token":
        "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmNzYyYTkyOS01ODJkLTRiMTMtOTM1MS1iZjE4ZWJjYTJlNTIifQ.eyJleHAiOjE3MDE4MTUzMzEsImlhdCI6MTcwMTgxMzUzMSwianRpIjoiNDY0YTk1ZTItZWViNi00YjhjLTkzYWUtMDdjOWMxZGE3MGFjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL21hc3RlciIsInN1YiI6IjhhODQ2OTRjLTViMTktNGNjNy1hYjYyLWY3Mjc5YzJjMjRmMCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiNjhlY2Y1MzYtNTNjZC00MDI0LTgxMWItZDIwMDUyMzA4ZmMwIiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNjhlY2Y1MzYtNTNjZC00MDI0LTgxMWItZDIwMDUyMzA4ZmMwIn0.7NhZsTZcqJNR8BjHD1RteSo1XxLxcrvodyvPNqM8zWk",
      "token_type": "Bearer",
    });
  } catch (error) {
    next(error);
  }
};
