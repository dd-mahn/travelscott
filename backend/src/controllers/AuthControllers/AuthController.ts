import { Request, Response } from 'express';
import { generateTokenPair, verifyRefreshToken } from 'src/utils/auth/jwt';
import { logControllerError } from "src/utils/logger";

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    // Verify the refresh token
    const payload = verifyRefreshToken(refreshToken);

    // Generate new token pair
    const newTokenPair = generateTokenPair({
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    });

    res.status(200).json({
      message: 'Token refreshed successfully',
      ...newTokenPair
    });
  } catch (error) {
    logControllerError("refreshAccessToken", error);
    res.status(403).json({ 
      message: 'Invalid refresh token',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};