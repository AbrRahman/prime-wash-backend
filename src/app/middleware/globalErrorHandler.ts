import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import config from "../config";
import { TErrorSource } from "../interface/interface.error";
import formateValidatorError from "../errors/formateValidatorError";
import formateDuplicateError from "../errors/formateDuplicateError";
import { ZodError } from "zod";
import { formateZodError } from "../errors/formateZodError";
import formateCastError from "../errors/formateCastrError";
import AppError from "../errors/appError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = "Something went wrong";
  let statusCode = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // formatting error
  if (error instanceof ZodError) {
    const formateError = formateZodError(error);
    statusCode = formateError.statusCode;
    message = formateError.message;
    errorSource = formateError.errorSource;
  } else if (error.name === "ValidationError") {
    const formateError = formateValidatorError(error);
    statusCode = formateError.statusCode;
    message = formateError.message;
    errorSource = formateError.errorSource;
  } else if (error?.name === "CastError") {
    // for castError
    const formateError = formateCastError(error);
    statusCode = formateError.statusCode;
    message = formateError.message;
    errorSource = formateError.errorSource;
  } else if (error?.errorResponse?.code === 11000) {
    // formate duplicate
    const formateError = formateDuplicateError(error);
    statusCode = formateError.statusCode;
    message = formateError.message;
    errorSource = formateError.errorSource;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSource = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSource = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === "development" ? error?.stack : "",
    error,
  });
};

export default globalErrorHandler;
