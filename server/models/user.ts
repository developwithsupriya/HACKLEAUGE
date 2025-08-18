// models/user.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false } // Add this line
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Add TypeScript interface
interface IUser extends mongoose.Document {
  email: string;
  password: string;
  isVerified: boolean;
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;