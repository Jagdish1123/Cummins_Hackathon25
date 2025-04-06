
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Filter, SortAsc, SortDesc } from "lucide-react";
import ExpenseCard, { Expense } from "./ExpenseCard";

interface TransactionListProps {
  expenses: Expense[];
  title?: string;
  showFilters?: boolean;
  className?: string;
  onExpenseClick?: (expense: Expense) => void;
}

const TransactionList = ({
  expenses,
  title = "Recent Transactions",
  showFilters = true,
  className,
  onExpenseClick,
}: TransactionListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [filter, setFilter] = useState<string>("all");

  const itemsPerPage = 5;
  const filteredExpenses = expenses.filter(expense => 
    filter === "all" || expense.category === filter
  );
  
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const paginatedExpenses = sortedExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const uniqueCategories = Array.from(
    new Set(expenses.map(expense => expense.category))
  );

  return (
    <div className={cn("rounded-xl border bg-white animate-fade-in", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          
          {showFilters && (
            <div className="flex items-center space-x-2">
              <Select
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={toggleSortOrder}
              >
                {sortOrder === "desc" ? (
                  <SortDesc className="h-4 w-4" />
                ) : (
                  <SortAsc className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="divide-y">
        {paginatedExpenses.length > 0 ? (
          paginatedExpenses.map((expense) => (
            <div key={expense.id} className="p-4">
              <ExpenseCard 
                expense={expense} 
                isCompact={true}
                onClick={() => onExpenseClick?.(expense)}
              />
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No transactions found.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
