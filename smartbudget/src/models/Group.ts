import mongoose, { Model } from 'mongoose';
import type { Group as IGroup } from '@/types/group';

// Define the model type
type GroupModel = Model<IGroup>;

const groupMemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  avatar: String,
  paid: { type: Boolean, default: false },
  amount: { type: Number, required: true }
});

const groupSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  totalAmount: { type: Number, required: true },
  date: { type: String, required: true },
  members: [groupMemberSchema],
  status: {
    type: String,
    enum: ['settled', 'pending', 'overdue'],
    default: 'pending'
  },
  category: String,
  created_at: { type: Date, default: Date.now }
});

// Create or retrieve the model
const Group = (mongoose.models?.Group as mongoose.Model<IGroup>) || 
  mongoose.model<IGroup>('Group', groupSchema);

export { Group }; 