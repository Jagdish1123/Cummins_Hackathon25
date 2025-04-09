
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ExpenseCard, { Expense, ExpenseCategory } from "@/components/ExpenseCard";
import TransactionList from "@/components/TransactionList";
import AddExpenseModal from "@/components/AddExpenseModal";
import CategoriesPieChart from "@/components/CategoriesPieChart";
import { Button } from "@/components/ui/button";
import { 
  Input 
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  CreditCard, 
  ChevronDown, 
  Clock, 
  CalendarRange 
} from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockExpenses: Expense[] = [
  {
    id: "1",
    amount: 45.99,
    category: "food",
    date: "2023-06-15",
    description: "Grocery Shopping",
    isRecurring: false,
    paymentMethod: "Credit Card"
  },
  {
    id: "2",
    amount: 120.00,
    category: "bills",
    date: "2023-06-10",
    description: "Electricity Bill",
    isRecurring: true,
    paymentMethod: "Bank Transfer"
  },
  {
    id: "3",
    amount: 35.50,
    category: "transport",
    date: "2023-06-08",
    description: "Gas Station",
    isRecurring: false,
    paymentMethod: "Debit Card"
  },
  {
    id: "4",
    amount: 89.99,
    category: "shopping",
    date: "2023-06-05",
    description: "New Shoes",
    isRecurring: false,
    paymentMethod: "Credit Card"
  },
  {
    id: "5",
    amount: 12.99,
    category: "entertainment",
    date: "2023-06-02",
    description: "Movie Tickets",
    isRecurring: false,
    paymentMethod: "Cash"
  },
  {
    id: "6",
    amount: 65.00,
    category: "health",
    date: "2023-05-28",
    description: "Doctor's Appointment",
    isRecurring: false,
    paymentMethod: "Health Insurance"
  },
  {
    id: "7",
    amount: 150.00,
    category: "education",
    date: "2023-05-25",
    description: "Online Course",
    isRecurring: false,
    paymentMethod: "Credit Card"
  },
  {
    id: "8",
    amount: 28.99,
    category: "food",
    date: "2023-05-20",
    description: "Pizza Delivery",
    isRecurring: false,
    paymentMethod: "Cash"
  },
  {
    id: "9",
    amount: 200.00,
    category: "bills",
    date: "2023-05-15",
    description: "Internet & Cable",
    isRecurring: true,
    paymentMethod: "Bank Transfer"
  },
  {
    id: "10",
    amount: 55.75,
    category: "transport",
    date: "2023-05-12",
    description: "Uber Rides",
    isRecurring: false,
    paymentMethod: "Credit Card"
  }
];

const mockCategoryData = [
  { name: "Food", value: 350, color: "#FF6B6B" },
  { name: "Transport", value: 220, color: "#4ECDC4" },
  { name: "Shopping", value: 420, color: "#FFD166" },
  { name: "Entertainment", value: 180, color: "#6A0572" },
  { name: "Bills", value: 450, color: "#1A535C" },
  { name: "Health", value: 120, color: "#F25F5C" },
  { name: "Education", value: 200, color: "#247BA0" }
];

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(mockExpenses);
  const [categoryData, setCategoryData] = useState(mockCategoryData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Handle adding a new expense
  const handleAddExpense = (expense: {
    amount: number;
    category: ExpenseCategory;
    date: Date;
    description: string;
    isRecurring: boolean;
    paymentMethod: string;
  }) => {
    const newExpense: Expense = {
      id: uuidv4(),
      ...expense,
      date: expense.date.toISOString().split("T")[0],
    };
    
    setExpenses([newExpense, ...expenses]);
    
    // Update category data
    const categoryIndex = categoryData.findIndex(
      (cat) => cat.name.toLowerCase() === expense.category
    );
    
    if (categoryIndex >= 0) {
      const newCategoryData = [...categoryData];
      newCategoryData[categoryIndex].value += expense.amount;
      setCategoryData(newCategoryData);
    }
    
    toast.success("Expense added successfully!");
  };

  // Apply filters to expenses
  useEffect(() => {
    let result = expenses;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(expense => 
        expense.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(expense => expense.category === categoryFilter);
    }
    
    // Apply date filter
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    if (dateFilter === "week") {
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= oneWeekAgo;
      });
    } else if (dateFilter === "month") {
      result = result.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= oneMonthAgo;
      });
    } else if (dateFilter === "recurring") {
      result = result.filter(expense => expense.isRecurring);
    }
    
    setFilteredExpenses(result);
  }, [expenses, searchQuery, categoryFilter, dateFilter]);

  // Calculate total amount of filtered expenses
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalAmount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Expense Management</h1>
                <p className="text-muted-foreground">Track, filter, and analyze your expenses</p>
              </div>
              <AddExpenseModal onAddExpense={handleAddExpense} />
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersVisible ? 'rotate-180' : ''}`} />
                </Button>
                
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[150px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="recurring">Recurring Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Expanded Filters */}
            {isFiltersVisible && (
              <div className="mt-4 p-4 border rounded-lg bg-white animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="bills">Bills</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Payment Method</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="creditCard">Credit Card</SelectItem>
                        <SelectItem value="debitCard">Debit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Amount Range</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="Min" className="w-full" />
                      <span>-</span>
                      <Input type="number" placeholder="Max" className="w-full" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Reset Filters
                  </Button>
                  <Button size="sm">
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Stats & Overview */}
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border shadow-subtle p-6 h-full">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Expense Summary</h2>
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {dateFilter === "all" 
                        ? "All Time" 
                        : dateFilter === "week"
                          ? "Last 7 days"
                          : dateFilter === "month"
                            ? "Last 30 days"
                            : "Recurring Only"
                      }
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-muted-foreground">Total Expenses</span>
                    <h3 className="text-3xl font-bold mt-1">{formattedTotal}</h3>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Payment Methods</span>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                              <span>Credit Card</span>
                            </div>
                            <span className="font-medium">$520.75</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                              <span>Bank Transfer</span>
                            </div>
                            <span className="font-medium">$320.00</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                              <span>Cash</span>
                            </div>
                            <span className="font-medium">$41.98</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time Distribution</span>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CalendarRange className="h-4 w-4 mr-2 text-indigo-500" />
                              <span>Last 7 days</span>
                            </div>
                            <span className="font-medium">$254.48</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CalendarRange className="h-4 w-4 mr-2 text-pink-500" />
                              <span>8-30 days ago</span>
                            </div>
                            <span className="font-medium">$628.25</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CategoriesPieChart 
                    data={categoryData} 
                    title="Category Breakdown"
                    className="border-0 p-0 shadow-none"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl border shadow-subtle p-6 h-full">
                <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
                <div className="space-y-4">
                  {filteredExpenses.slice(0, 5).map((expense) => (
                    <ExpenseCard 
                      key={expense.id} 
                      expense={expense} 
                      isCompact={true}
                    />
                  ))}
                  
                  {filteredExpenses.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No expenses found matching your filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* All Expenses */}
          <div>
            <h2 className="text-xl font-semibold mb-4">All Expenses</h2>
            <div className="bg-white rounded-xl border shadow-subtle">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-muted-foreground mb-4">No expenses found</p>
                    <p className="text-muted-foreground mb-6">Try changing your filters or add a new expense</p>
                    <AddExpenseModal onAddExpense={handleAddExpense} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expenses;
