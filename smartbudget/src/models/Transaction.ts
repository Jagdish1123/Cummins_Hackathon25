import mongoose, { Model } from 'mongoose';
import type { Transaction as ITransaction } from '@/types/payment';

// Define the model type
type TransactionModel = Model<ITransaction>;

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  merchant: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  user_id: { type: String },
});

// Create or retrieve the model
const Transaction = (mongoose.models?.Transaction as mongoose.Model<ITransaction>) || 
  mongoose.model<ITransaction>('Transaction', transactionSchema);

export { Transaction }; 