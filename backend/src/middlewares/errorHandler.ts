import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from 'src/utils/apiResponse';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  sendErrorResponse(res, 'An unexpected error occurred', 500, err.message);
};

