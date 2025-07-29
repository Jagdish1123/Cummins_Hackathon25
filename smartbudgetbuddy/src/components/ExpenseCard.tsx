
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Coffee, 
  CreditCard, 
  Receipt, 
  Truck, 
  ShoppingBag, 
  Film, 
  Home, 
  Repeat, 
  Lightbulb, 
  MoreVertical 
} from "lucide-react";
import { format } from "date-fns";

export type ExpenseCategory = "food" | "bills" | "transport" | "shopping" | "entertainment" | "housing" | "health" | "education" | "other";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  isRecurring?: boolean;
  paymentMethod?: string;
}

interface ExpenseCardProps {
  expense: Expense;
  currency?: string;
  isCompact?: boolean;
}

const ExpenseCard = ({ expense, currency = "₹", isCompact = false }: ExpenseCardProps) => {
  // Category icon mapping
  const getCategoryIcon = (category: ExpenseCategory) => {
    switch (category) {
      case "food":
        return <Coffee className="h-4 w-4" />;
      case "bills":
        return <Receipt className="h-4 w-4" />;
      case "transport":
        return <Truck className="h-4 w-4" />;
      case "shopping":
        return <ShoppingBag className="h-4 w-4" />;
      case "entertainment":
        return <Film className="h-4 w-4" />;
      case "housing":
        return <Home className="h-4 w-4" />;
      case "health":
        return <Lightbulb className="h-4 w-4" />;
      case "education":
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };
  
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
  
  // Format date
  const formattedDate = format(new Date(expense.date), "dd MMM yyyy");
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className={`${isCompact ? 'p-3' : 'p-5'}`}>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {getCategoryIcon(expense.category)}
            </div>
            <div>
              <h3 className="font-medium">{expense.description}</h3>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-muted-foreground">{formattedDate}</span>
                {expense.isRecurring && (
                  <Badge variant="outline" className="text-xs h-5 px-1 font-normal">
                    <Repeat className="h-2.5 w-2.5 mr-1" />
                    Recurring
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-semibold">{formatAmount(expense.amount)}</span>
            {expense.paymentMethod && (
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <CreditCard className="h-3 w-3 mr-1" />
                {expense.paymentMethod}
              </div>
            )}
          </div>
        </div>
        
        {!isCompact && (
          <div className="flex justify-between items-center mt-4">
            <Badge 
              variant="secondary" 
              className="capitalize text-xs font-normal"
            >
              {expense.category}
            </Badge>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
