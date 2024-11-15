import { Response } from 'express';
import { sendSuccessResponse, sendErrorResponse } from 'src/utils/apiResponse';

describe('API Response Utils', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('sendSuccessResponse', () => {
    it('should send success response with message only', () => {
      const message = 'Success message';
      
      sendSuccessResponse(mockResponse as Response, message);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message
      });
    });

    it('should send success response with data', () => {
      const message = 'Success with data';
      const data = { id: 1, name: 'Test' };
      
      sendSuccessResponse(mockResponse as Response, message, data);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message,
        data
      });
    });

    it('should send success response with custom status code', () => {
      const message = 'Created successfully';
      const data = { id: 1 };
      const statusCode = 201;
      
      sendSuccessResponse(mockResponse as Response, message, data, statusCode);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message,
        data
      });
    });
  });

  describe('sendErrorResponse', () => {
    it('should send error response with message only', () => {
      const message = 'Error message';
      
      sendErrorResponse(mockResponse as Response, message);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message
      });
    });

    it('should send error response with error details', () => {
      const message = 'Error occurred';
      const error = 'Detailed error message';
      
      sendErrorResponse(mockResponse as Response, message, 500, error);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message,
        error
      });
    });

    it('should send error response with custom status code', () => {
      const message = 'Bad request';
      const statusCode = 400;
      
      sendErrorResponse(mockResponse as Response, message, statusCode);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message
      });
    });
  });
});
