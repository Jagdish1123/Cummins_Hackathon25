
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  CreditCard, 
  DollarSign, 
  ShoppingCart, 
  Coffee, 
  Car, 
  Film, 
  Home, 
  HeartPulse, 
  GraduationCap, 
  Package
} from "lucide-react";

export type ExpenseCategory = 
  | "food" 
  | "transport" 
  | "shopping" 
  | "entertainment" 
  | "bills" 
  | "health" 
  | "education" 
  | "other";

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
  onClick?: () => void;
  className?: string;
  isCompact?: boolean;
}

const categoryIcons: Record<ExpenseCategory, React.ReactNode> = {
  food: <Coffee className="w-full h-full" />,
  transport: <Car className="w-full h-full" />,
  shopping: <ShoppingCart className="w-full h-full" />,
  entertainment: <Film className="w-full h-full" />,
  bills: <Home className="w-full h-full" />,
  health: <HeartPulse className="w-full h-full" />,
  education: <GraduationCap className="w-full h-full" />,
  other: <Package className="w-full h-full" />,
};

const categoryColors: Record<ExpenseCategory, string> = {
  food: "bg-expense-food text-white",
  transport: "bg-expense-transport text-white",
  shopping: "bg-expense-shopping text-white",
  entertainment: "bg-expense-entertainment text-white",
  bills: "bg-expense-bills text-white",
  health: "bg-expense-health text-white",
  education: "bg-expense-education text-white",
  other: "bg-expense-other text-white",
};

const ExpenseCard = ({ expense, onClick, className, isCompact = false }: ExpenseCardProps) => {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(expense.amount);

  if (isCompact) {
    return (
      <div 
        className={cn(
          "flex items-center p-3 rounded-lg border transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer animate-fade-in",
          className
        )}
        onClick={onClick}
      >
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mr-3", categoryColors[expense.category])}>
          {categoryIcons[expense.category]}
        </div>
        <div className="flex-1 truncate">
          <p className="font-medium truncate">{expense.description}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formattedAmount}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "p-4 rounded-xl border bg-white shadow-subtle card-transition animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", categoryColors[expense.category])}>
          {categoryIcons[expense.category]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold">{expense.description}</h3>
            <span className="font-bold">{formattedAmount}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span className="mr-3">{formattedDate}</span>
            {expense.paymentMethod && (
              <>
                <CreditCard className="w-3.5 h-3.5 mr-1" />
                <span>{expense.paymentMethod}</span>
              </>
            )}
          </div>
          {expense.isRecurring && (
            <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Recurring
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
