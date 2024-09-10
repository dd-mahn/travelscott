import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendErrorResponse } from './apiResponse';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, 'Validation error', 400, error.details[0].message);
    }
    next();
  };
};
