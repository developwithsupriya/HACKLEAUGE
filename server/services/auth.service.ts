// services/auth.service.ts
import User from '../models/user';
import Token from '../models/token';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
  user?: {
    email: string;
    isVerified: boolean;
  };
}

export const signupService = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const user = await User.create({
      email,
      password,
      isVerified: false
    });

    const token = jwt.sign(
      { userId: user._id.toString() }, // Explicitly convert to string
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return {
      success: true,
      token,
      user: {
        email: user.email,
        isVerified: user.isVerified
      }
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Signup failed'
    };
  }
};

export const loginService = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { userId: user._id.toString() }, // Explicitly convert to string
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return {
      success: true,
      token,
      user: {
        email: user.email,
        isVerified: user.isVerified
      }
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    };
  }
};