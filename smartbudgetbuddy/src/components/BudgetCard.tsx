
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: "weekly" | "monthly" | "yearly";
}

interface BudgetCardProps {
  budget: Budget;
  currency?: string;
}

const BudgetCard: FC<BudgetCardProps> = ({ budget, currency = "₹" }) => {
  const percentage = (budget.spent / budget.amount) * 100;
  const isOverBudget = budget.spent > budget.amount;
  
  // Format currency with Indian numbering system if INR
  const formatAmount = (amount: number): string => {
    if (currency === "₹") {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return `${currency}${amount.toLocaleString()}`;
  };
  
  return (
    <Card className={`overflow-hidden ${isOverBudget ? 'border-red-200' : ''}`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-sm">{budget.category}</h3>
            <p className="text-muted-foreground text-xs">{budget.period.charAt(0).toUpperCase() + budget.period.slice(1)}</p>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="flex flex-col text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-semibold text-base">{formatAmount(budget.spent)}</span>
            </div>
            <div className="text-right text-sm">
              <span className={`${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                {isOverBudget 
                  ? `${formatAmount(budget.spent - budget.amount)} over` 
                  : `${formatAmount(budget.amount - budget.spent)} left`}
              </span>
              <div className="text-muted-foreground">
                of {formatAmount(budget.amount)}
              </div>
            </div>
          </div>
          
          <Progress 
            value={Math.min(100, percentage)} 
            className="h-2" 
            indicatorClassName={isOverBudget ? "bg-red-500" : undefined} 
          />
          
          <div className="text-xs text-right">
            <span className={`${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
              {Math.round(percentage)}% used
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
