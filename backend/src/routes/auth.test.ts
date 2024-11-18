import request from 'supertest';
import { createTestApp } from 'src/utils/test/testUtils';
import Subscribe from 'src/models/Subscribe';

const app = createTestApp();

describe('Auth Routes', () => {
  beforeEach(async () => {
    await Subscribe.deleteMany({});
  });

  describe('POST /api/auth/tokens', () => {
    it('should generate tokens for existing subscription', async () => {
      // First create a subscription
      const subscription = await Subscribe.create({
        email: 'test@example.com'
      });

      const res = await request(app)
        .post('/api/auth/tokens')
        .send({ email: subscription.email });

      expect(res.status).toBe(200);
      expect(res.body.auth).toBeDefined();
      expect(res.body.auth.accessToken).toBeDefined();
      expect(res.body.auth.refreshToken).toBeDefined();
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh tokens with valid refresh token', async () => {
      // First get initial tokens
      const subscription = await Subscribe.create({
        email: 'test@example.com'
      });
      
      const tokensRes = await request(app)
        .post('/api/auth/tokens')
        .send({ email: subscription.email });

      const refreshRes = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: tokensRes.body.auth.refreshToken });

      expect(refreshRes.status).toBe(200);
      expect(refreshRes.body.auth).toBeDefined();
      expect(refreshRes.body.auth.accessToken).toBeDefined();
      expect(refreshRes.body.auth.refreshToken).toBeDefined();
    });
  });
});