
import { cn } from "@/lib/utils";
import { 
  ArrowDown, 
  ArrowUp, 
  DollarSign,
  AlertTriangle, 
  CheckCircle2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: "weekly" | "monthly" | "yearly";
}

interface BudgetCardProps {
  budget: Budget;
  onClick?: () => void;
  className?: string;
}

const BudgetCard = ({ budget, onClick, className }: BudgetCardProps) => {
  // Calculate percentage spent
  const percentSpent = (budget.spent / budget.amount) * 100;
  const isOverBudget = budget.spent > budget.amount;
  const isNearLimit = percentSpent >= 80 && percentSpent < 100;
  
  // Format currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget.amount);
  
  const formattedSpent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget.spent);
  
  const remaining = budget.amount - budget.spent;
  const formattedRemaining = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(remaining));

  return (
    <div 
      className={cn(
        "p-4 rounded-xl border bg-white shadow-subtle card-transition animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{budget.category}</h3>
        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize">
          {budget.period}
        </span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>Total: <span className="font-medium text-foreground">{formattedAmount}</span></span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Spent: <span className="font-medium text-foreground">{formattedSpent}</span></span>
        </div>
      </div>
      
      <Progress 
        value={percentSpent > 100 ? 100 : percentSpent} 
        className={cn("h-2 mb-2", 
          percentSpent > 90 ? 'bg-red-100' : 
          percentSpent > 75 ? 'bg-amber-100' : 
          'bg-green-100'
        )}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isOverBudget ? (
            <div className="flex items-center text-red-500">
              <ArrowUp className="h-3.5 w-3.5 mr-1" />
              <span className="text-sm font-medium">Over by {formattedRemaining}</span>
            </div>
          ) : (
            <div className="flex items-center text-green-500">
              <ArrowDown className="h-3.5 w-3.5 mr-1" />
              <span className="text-sm font-medium">{formattedRemaining} left</span>
            </div>
          )}
        </div>
        
        {isOverBudget ? (
          <AlertTriangle className="h-4 w-4 text-red-500" />
        ) : isNearLimit ? (
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
