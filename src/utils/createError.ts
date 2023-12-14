import { CustomError } from "../models/utils/CustomError";

export const createError = (status: number, message: string): CustomError => {
  const error = new Error(message) as CustomError;
  error.status = status;
  return error;
};
