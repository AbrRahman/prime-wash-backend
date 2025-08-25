import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodObject } from "zod";

const validationRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req?.body,
        cookies: req?.cookies,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationRequest;
