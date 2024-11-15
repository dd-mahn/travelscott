import jwt from 'jsonwebtoken';
import config from 'src/config/config';

export interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const generateTokenPair = (payload: TokenPayload): TokenPair => {
  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
  
  const refreshToken = jwt.sign(payload, config.jwt.refreshToken.secret, {
    expiresIn: config.jwt.refreshToken.expiresIn
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwt.secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwt.refreshToken.secret) as TokenPayload;
}; 