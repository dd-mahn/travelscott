import { Request, Response } from 'express';
import request from 'supertest';
import { refreshAccessToken } from 'src/controllers/AuthControllers/AuthController';
import { generateTokenPair, TokenPayload } from 'src/utils/auth/jwt';
import { createTestApp } from 'src/utils/test/testUtils';

jest.mock('src/utils/logger', () => ({
  logControllerError: jest.fn()
}));

const app = createTestApp();

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

  describe('generateSubscriptionTokens', () => {
    it('should generate tokens for existing subscription', async () => {
      const subscriptionData = {
        email: 'test@example.com'
      };

      const res = await request(app)
        .post('/api/auth/tokens')
        .send(subscriptionData);
      
      expect(res.status).toBe(200);
      expect(res.body.auth).toBeDefined();
      expect(res.body.auth.accessToken).toBeDefined();
      expect(res.body.auth.refreshToken).toBeDefined();
    });

    it('should return 404 for non-existent subscription', async () => {
      const res = await request(app)
        .post('/api/auth/tokens')
        .send({ email: 'nonexistent@example.com' });
      
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Subscription not found');
    });
  });
});