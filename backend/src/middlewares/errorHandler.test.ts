import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './errorHandler';
import { sendErrorResponse } from 'src/utils/apiResponse';

jest.mock('src/utils/apiResponse');

describe('Error Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    nextFunction = jest.fn();
    (sendErrorResponse as jest.Mock).mockClear();
  });

  it('should handle errors and call sendErrorResponse with correct parameters', () => {
    const testError = new Error('Test error message');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    errorHandler(testError, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(consoleSpy).toHaveBeenCalledWith(testError.stack);
    expect(sendErrorResponse).toHaveBeenCalledWith(
      mockResponse,
      'An unexpected error occurred',
      500,
      testError.message
    );

    consoleSpy.mockRestore();
  });

  it('should not call next function after handling error', () => {
    const testError = new Error('Test error message');
    jest.spyOn(console, 'error').mockImplementation();

    errorHandler(testError, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).not.toHaveBeenCalled();
  });
});
