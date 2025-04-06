// Define transaction status
export type TransactionStatus = 'pending' | 'completed' | 'failed';

// Define the transaction type
export interface Transaction {
  id?: string;
  amount: number;
  merchant: string;
  category: string;
  description?: string;
  created_at?: Date;
  user_id?: string;
  status?: TransactionStatus;
}

export interface GroupExpense {
  id: string;
  amount: number;
  description: string;
  paidBy: string;
  splitBetween: string[];
  date: string;
  settled: boolean;
}

export interface Settlement {
  id: string;
  amount: number;
  from: string;
  to: string;
  status: TransactionStatus;
  date: string;
}

// Export all types
export type { Transaction, GroupExpense, Settlement, TransactionStatus };

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp?: Date;
} 