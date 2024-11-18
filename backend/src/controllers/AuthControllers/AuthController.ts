import { Request, Response } from 'express';
import { generateTokenPair, verifyRefreshToken } from 'src/utils/auth/jwt';
import { logControllerError } from "src/utils/logger";
import Subscribe from 'src/models/Subscribe';

export const generateSubscriptionTokens = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Check if subscription exists
    const subscription = await Subscribe.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Generate tokens
    const tokenPair = generateTokenPair({
      userId: subscription._id.toString(),
      email: subscription.email
    });

    res.status(200).json({
      message: 'Tokens generated successfully',
      auth: tokenPair
    });
  } catch (error) {
    logControllerError("generateSubscriptionTokens", error);
    res.status(500).json({ 
      message: 'Failed to generate tokens',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const payload = verifyRefreshToken(refreshToken);
    const tokenPair = generateTokenPair({
      userId: payload.userId,
      email: payload.email
    });

    res.status(200).json({
      message: 'Token refreshed successfully',
      auth: tokenPair
    });
  } catch (error) {
    logControllerError("refreshAccessToken", error);
    res.status(403).json({ 
      message: 'Invalid refresh token',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};