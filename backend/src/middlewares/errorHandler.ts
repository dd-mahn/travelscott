import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from 'src/utils/apiResponse';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ 
      message: 'Invalid token',
      error: err.message 
    });
  }
  
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ 
      message: 'Token expired',
      error: err.message 
    });
  }
  
  console.error(err.stack);
  sendErrorResponse(res, 'An unexpected error occurred', 500, err.message);
};

