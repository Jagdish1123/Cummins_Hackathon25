
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Expense } from "@/components/ExpenseCard";
import { format } from "date-fns";
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
  MoreHorizontal 
} from "lucide-react";

interface TransactionListProps {
  expenses: Expense[];
  currency?: string;
}

const TransactionList = ({ expenses, currency = "₹" }: TransactionListProps) => {
  // Category icon mapping
  const getCategoryIcon = (category: string) => {
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
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {expense.description}
                    {expense.isRecurring && (
                      <Badge variant="outline" className="text-xs h-5 px-1 font-normal">
                        <Repeat className="h-2.5 w-2.5 mr-1" />
                        Recurring
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className="capitalize flex items-center gap-1 w-fit"
                  >
                    {getCategoryIcon(expense.category)}
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(expense.date), "dd MMM yyyy")}</TableCell>
                <TableCell className="font-medium">{formatAmount(expense.amount)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    {expense.paymentMethod || "—"}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionList;
