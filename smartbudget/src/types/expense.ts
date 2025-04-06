export interface GroupMember {
  id: string;
  name: string;
  creditScore: number;
  paymentHistory: number; // 0-100 reliability score
}

export interface SharedExpense {
  id: string;
  amount: number;
  description: string;
  date: string;
  paidBy: string; // user ID
  category: string;
  participants: string[]; // array of user IDs
  splits?: { [userId: string]: number }; // calculated split amounts
  settled: boolean;
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
  expenseId: string;
  status: 'pending' | 'completed';
  date: string;
}

interface Transaction {
  amount: number; // Amount in INR
  // ...
} 