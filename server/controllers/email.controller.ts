// controllers/email.controller.ts
import { Request, Response } from 'express';
import Token from '../models/token';  // Import Token model
import User from '../models/user';    // Import User model

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    // Find and delete verification token
    const token = await Token.findOneAndDelete({
      token: req.params.token,
      type: 'email-verification'
    });

    if (!token) {
      return res.status(404).json({ 
        success: false,
        error: 'Invalid or expired token' 
      });
    }

    // Update user's verification status
    const user = await User.findByIdAndUpdate(
      token.userId,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    return res.json({ 
      success: true,
      message: 'Email verified successfully',
      user: {
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Verification failed';
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};