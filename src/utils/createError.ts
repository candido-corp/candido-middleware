import { CustomError } from "../models/utils/CustomError";
import { EnumError } from "../models/enums/EnumError";

export const createError = (status: number, message: string): CustomError => {
  const error = new Error(message) as CustomError;
  error.status = status;
  error.name = EnumError.KEY_CUSTOM_ERROR;
  return error;
};
