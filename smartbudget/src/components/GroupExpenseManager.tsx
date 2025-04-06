import { useState } from 'react';
import { ExpenseSplitService } from '@/services/ExpenseSplitService';
import { SharedExpense, GroupMember, Settlement } from '@/types/expense';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatIndianCurrency } from '@/utils/currency';

interface GroupExpenseManagerProps {
  groupMembers: GroupMember[];
  expense: SharedExpense;
  onSettlementComplete: (settlements: Settlement[]) => void;
}

export function GroupExpenseManager({ 
  groupMembers, 
  expense,
  onSettlementComplete 
}: GroupExpenseManagerProps) {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const splitService = new ExpenseSplitService();

  const handleCalculateSplit = () => {
    const newSettlements = splitService.generateSettlements(expense, groupMembers);
    setSettlements(newSettlements);
  };

  const handleSettlePayment = async (settlement: Settlement) => {
    try {
      // Here you would integrate with your payment provider
      // For demo purposes, we'll just mark it as completed
      const updatedSettlement = { ...settlement, status: 'completed' as const };
      const updatedSettlements = settlements.map(s => 
        s === settlement ? updatedSettlement : s
      );
      
      // Update payment history
      const updatedMembers = splitService.updatePaymentHistory(updatedSettlement, groupMembers);
      
      setSettlements(updatedSettlements);
      onSettlementComplete(updatedSettlements);
      toast.success('Payment settled successfully!');
    } catch (error) {
      toast.error('Failed to process payment');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Split Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {settlements.map((settlement) => (
            <div key={`${settlement.from}-${settlement.to}`} 
                 className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">
                  {groupMembers.find(m => m.id === settlement.from)?.name} owes{' '}
                  {groupMembers.find(m => m.id === settlement.to)?.name}
                </p>
                <p className="text-2xl font-bold">{formatIndianCurrency(settlement.amount)}</p>
              </div>
              {settlement.status === 'pending' && (
                <Button onClick={() => handleSettlePayment(settlement)}>
                  Settle Payment
                </Button>
              )}
            </div>
          ))}
          
          {!settlements.length && (
            <Button onClick={handleCalculateSplit} className="w-full">
              Calculate Split
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 