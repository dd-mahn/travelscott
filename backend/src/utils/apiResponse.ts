import { Response } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export function sendSuccessResponse<T>(res: Response, message: string, data?: T, statusCode = 200) {
  const response: ApiResponse<T> = { success: true, message };
  if (data) response.data = data;
  res.status(statusCode).json(response);
}

export function sendErrorResponse(res: Response, message: string, statusCode = 500, error?: string) {
  const response: ApiResponse<null> = { success: false, message };
  if (error) response.error = error;
  res.status(statusCode).json(response);
}