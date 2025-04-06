import mongoose, { Model } from 'mongoose';
import type { User as IUser } from '@/types/user';

// Define the model type
type UserModel = Model<IUser>;


// Create the schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: {
    type: String,
    enum: ['professional', 'student'],
    required: true
  },
  avatar: String,
  creditScore: { type: Number, default: 70 },
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'INR' },
    theme: { type: String, default: 'light' }
  },
  created_at: { type: Date, default: Date.now }
});

// Create or retrieve the model
export const User = (mongoose.models?.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', userSchema);

