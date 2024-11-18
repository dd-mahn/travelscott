import { Request, Response, NextFunction } from 'express';
import { authenticateToken, authenticateRefreshToken } from './authMiddleware';
import { verifyToken, verifyRefreshToken } from 'src/utils/auth/jwt';

jest.mock('src/utils/auth/jwt');

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should return 401 if no token is provided', () => {
      authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Authentication token required'
      });
    });

    it('should return 403 if token is invalid', () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid_token'
      };
      (verifyToken as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid or expired token'
      });
    });

    it('should call next() if token is valid', () => {
      mockRequest.headers = {
        authorization: 'Bearer valid_token'
      };
      const mockUser = { id: '123', email: 'test@test.com' };
      (verifyToken as jest.Mock).mockReturnValue(mockUser);

      authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockRequest.user).toEqual(mockUser);
    });
  });

  describe('authenticateRefreshToken', () => {
    it('should return 401 if no refresh token is provided', async () => {
      await authenticateRefreshToken(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Refresh token is required'
      });
    });

    it('should return 401 if refresh token is invalid', async () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid_refresh_token'
      };
      (verifyRefreshToken as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      await authenticateRefreshToken(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid refresh token'
      });
    });

    it('should call next() if refresh token is valid', async () => {
      mockRequest.headers = {
        authorization: 'Bearer valid_refresh_token'
      };
      const mockUser = { id: '123', email: 'test@test.com' };
      (verifyRefreshToken as jest.Mock).mockReturnValue(mockUser);

      await authenticateRefreshToken(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockRequest.user).toEqual(mockUser);
    });
  });
});
