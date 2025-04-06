import { GroupMember, SharedExpense, Settlement } from '@/types/expense';

export class ExpenseSplitService {
  // Calculate weighted split based on credit scores and payment history
  private calculateWeightedSplit(
    expense: SharedExpense,
    members: GroupMember[]
  ): { [userId: string]: number } {
    const splits: { [userId: string]: number } = {};
    const participants = members.filter(m => expense.participants.includes(m.id));
    
    // Calculate total weights
    const totalWeight = participants.reduce((sum, member) => {
      return sum + (member.creditScore * member.paymentHistory / 100);
    }, 0);
    
    // Calculate individual splits
    participants.forEach(member => {
      const weight = member.creditScore * member.paymentHistory / 100;
      const share = (expense.amount * weight) / totalWeight;
      splits[member.id] = Number(share.toFixed(2));
    });
    
    // Adjust for rounding errors
    const totalSplit = Object.values(splits).reduce((a, b) => a + b, 0);
    const difference = expense.amount - totalSplit;
    
    if (difference !== 0) {
      // Add the difference to the highest contributor
      const highestContributor = Object.entries(splits)
        .sort(([, a], [, b]) => b - a)[0][0];
      splits[highestContributor] += Number(difference.toFixed(2));
    }
    
    return splits;
  }

  // Generate settlement transactions
  generateSettlements(
    expense: SharedExpense,
    members: GroupMember[]
  ): Settlement[] {
    const splits = this.calculateWeightedSplit(expense, members);
    const settlements: Settlement[] = [];
    
    // Calculate who owes what
    Object.entries(splits).forEach(([userId, amount]) => {
      if (userId !== expense.paidBy && amount > 0) {
        settlements.push({
          from: userId,
          to: expense.paidBy,
          amount,
          expenseId: expense.id,
          status: 'pending',
          date: new Date().toISOString()
        });
      }
    });
    
    return settlements;
  }

  // Update payment history based on settlement
  updatePaymentHistory(
    settlement: Settlement,
    members: GroupMember[]
  ): GroupMember[] {
    return members.map(member => {
      if (member.id === settlement.from) {
        // Increase reliability score for timely payments
        const newScore = Math.min(100, member.paymentHistory + 5);
        return { ...member, paymentHistory: newScore };
      }
      return member;
    });
  }
} 