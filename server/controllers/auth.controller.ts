import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/user';
import Token from '../models/token';
import { sendVerificationEmail } from '../services/email.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    
    // 1. Create user (inactive)
    const user = await User.create({
      email,
      password,
      isVerified: false
    });

    // 2. Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    await Token.create({
      userId: user._id,
      token,
      type: 'email-verification'
    });

    // 3. Send verification email
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Verification email sent' });
  } catch (err) {
    // Proper error handling
    let errorMessage = 'An error occurred during signup';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }

    res.status(400).json({ error: errorMessage });
  }
};