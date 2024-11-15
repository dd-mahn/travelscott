import { Request, Response } from 'express';
import { refreshAccessToken } from 'src/controllers/AuthControllers/AuthController';
import { generateTokenPair, TokenPayload } from 'src/utils/auth/jwt';

jest.mock('src/utils/logger', () => ({
  logControllerError: jest.fn()
}));

describe('AuthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  
  beforeEach(() => {
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('refreshAccessToken', () => {
    it('should refresh tokens successfully', async () => {
      const mockPayload: TokenPayload = {
        userId: '123',
        email: 'test@example.com',
        role: 'user'
      };
      
      const initialTokens = generateTokenPair(mockPayload);
      mockRequest.body = { refreshToken: initialTokens.refreshToken };

      await refreshAccessToken(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Token refreshed successfully',
          accessToken: expect.any(String),
          refreshToken: expect.any(String)
        })
      );
    });

    it('should return 400 when refresh token is missing', async () => {
      mockRequest.body = {};

      await refreshAccessToken(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Refresh token is required'
      });
    });

    it('should return 403 for invalid refresh token', async () => {
      mockRequest.body = { refreshToken: 'invalid-token' };

      await refreshAccessToken(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid refresh token'
        })
      );
    });
  });
});