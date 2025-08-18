import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { verifyEmail } from '../controllers/email.controller';

const router = express.Router();

// Verify Email - Make sure verifyEmail has proper typing
router.get('/verify-email/:token', verifyEmail);

// Signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      isVerified: false
    });
    
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1d' }
    );
    
    return res.status(201).json({ token });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Signup failed';
    return res.status(400).json({ error: errorMessage });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '1d' }
    );
    
    return res.json({ token });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    return res.status(500).json({ error: errorMessage });
  }
});

export default router;