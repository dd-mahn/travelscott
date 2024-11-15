import { generateTokenPair, verifyToken, verifyRefreshToken, TokenPayload } from 'src/utils/auth/jwt';
import jwt from 'jsonwebtoken';

describe('JWT Utils', () => {
  const mockPayload: TokenPayload = {
    userId: '123',
    email: 'test@example.com',
    role: 'user'
  };

  it('should generate a valid JWT token', () => {
    const tokenPair = generateTokenPair (mockPayload);
    expect(tokenPair).toBeDefined();
    expect(typeof tokenPair.accessToken).toBe('string');
    expect(typeof tokenPair.refreshToken).toBe('string');
  });

  it('should verify and decode a valid token', () => {
    const tokenPair = generateTokenPair(mockPayload);
    const decoded = verifyToken(tokenPair.accessToken);
    
    expect(decoded.userId).toBe(mockPayload.userId);
    expect(decoded.email).toBe(mockPayload.email);
    expect(decoded.role).toBe(mockPayload.role);
  });

  it('should throw on invalid token', () => {
    expect(() => verifyToken('invalid-token')).toThrow();
  });
}); 