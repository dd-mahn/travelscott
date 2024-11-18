import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload, verifyRefreshToken } from 'src/utils/auth/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authenticateRefreshToken = async (req: Request, res: Response, next: Function) => {
  try {
    const refreshToken = req.headers.authorization?.split(' ')[1];
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}; 