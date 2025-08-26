import { RequestHandler } from "express";
import HttpStatus from "http-status";
const notFoundHandler: RequestHandler = (req, res, next) => {
  const message = "Api not Found";
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message,
    error: "",
  });
};

export default notFoundHandler;
