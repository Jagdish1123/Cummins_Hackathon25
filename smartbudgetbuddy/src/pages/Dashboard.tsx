import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import ExpenseCard, { Expense, ExpenseCategory } from "@/components/ExpenseCard";
import BudgetCard, { Budget } from "@/components/BudgetCard";
import GroupCard, { Group } from "@/components/GroupCard";
import CategoriesPieChart from "@/components/CategoriesPieChart";
import SpendingTrendChart from "@/components/SpendingTrendChart";
import TransactionList from "@/components/TransactionList";
import AddExpenseModal from "@/components/AddExpenseModal";
import AddBudgetModal from "@/components/AddBudgetModal";
import CreateGroupModal from "@/components/CreateGroupModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialAdvisor from "@/components/FinancialAdvisor";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Bell,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Exchange rate from USD to INR
const USD_TO_INR_RATE = 83;

// Convert USD to INR
const convertToINR = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_INR_RATE);
};

// Format currency with Indian numbering system
const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Mock data for demonstrations (converted to INR)
const mockExpenses: Expense[] = [
  {
    id: "1",
    amount: convertToINR(45.99),
    category: "food",
    date: "2023-06-15",
    description: "Grocery Shopping",
    isRecurring: false,
    paymentMethod: "Credit Card"
  },
  {
    id: "2",
    amount: convertToINR(120.00),
    category: "bills",
    date: "2023-06-10",
    description: "Electricity Bill",
    isRecurring: true,
    paymentMethod: "Bank Transfer"
  },
  {
    id: "3",
    amount: convertToINR(35.50),
    category: "transport",
    date: "2023-06-08",
    description: "Gas Station",
    isRecurring: false,
    paymentMethod: "Debit Card"
  },
  {
    id: "4",
    amount: convertToINR(89.99),
    category: "shopping",
    date: "2023-06-05",
    description: "New Shoes",
    isRecurring: false,
    paymentMethod: "Credit Card"
  },
  {
    id: "5",
    amount: convertToINR(12.99),
    category: "entertainment",
    date: "2023-06-02",
    description: "Movie Tickets",
    isRecurring: false,
    paymentMethod: "Cash"
  }
];

const mockBudgets: Budget[] = [
  {
    id: "1",
    category: "Food & Dining",
    amount: convertToINR(500),
    spent: convertToINR(350),
    period: "monthly"
  },
  {
    id: "2",
    category: "Transportation",
    amount: convertToINR(300),
    spent: convertToINR(220),
    period: "monthly"
  },
  {
    id: "3",
    category: "Entertainment",
    amount: convertToINR(200),
    spent: convertToINR(180),
    period: "monthly"
  },
  {
    id: "4",
    category: "Shopping",
    amount: convertToINR(400),
    spent: convertToINR(420),
    period: "monthly"
  }
];

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Weekend Trip to Mountains",
    description: "Cabin rental and activities",
    totalAmount: convertToINR(750),
    date: "2023-05-25",
    members: [
      { id: "m1", name: "Rudrani", paid: true },
      { id: "m2", name: "Jordan", paid: true },
      { id: "m3", name: "Taylor", paid: false },
      { id: "m4", name: "Morgan", paid: false }
    ],
    status: "pending",
    category: "Trip"
  },
  {
    id: "2",
    name: "Dinner at Italian Restaurant",
    totalAmount: convertToINR(240),
    date: "2023-06-12",
    members: [
      { id: "m1", name: "Rudrani", paid: true },
      { id: "m2", name: "Riley", paid: false },
      { id: "m5", name: "Casey", paid: true }
    ],
    status: "pending",
    category: "Dinner"
  }
];

const mockTrendData = [
  { date: "Jan", amount: convertToINR(1200), budget: convertToINR(1500) },
  { date: "Feb", amount: convertToINR(1400), budget: convertToINR(1500) },
  { date: "Mar", amount: convertToINR(1300), budget: convertToINR(1500) },
  { date: "Apr", amount: convertToINR(1500), budget: convertToINR(1500) },
  { date: "May", amount: convertToINR(1800), budget: convertToINR(1500) },
  { date: "Jun", amount: convertToINR(1600), budget: convertToINR(1500) }
];

const mockCategoryData = [
  { name: "Food", value: convertToINR(350), color: "#FF6B6B" },
  { name: "Transport", value: convertToINR(220), color: "#4ECDC4" },
  { name: "Shopping", value: convertToINR(420), color: "#FFD166" },
  { name: "Entertainment", value: convertToINR(180), color: "#6A0572" },
  { name: "Bills", value: convertToINR(450), color: "#1A535C" }
];

interface FinancialAdvice {
  id: string;
  type: "tip" | "alert" | "insight" | "trend";
  content: string;
}

const mockFinancialAdvice: FinancialAdvice[] = [
  {
    id: "1",
    type: "tip",
    content: "Invest 20% of your savings in low-risk mutual funds for steady growth."
  },
  {
    id: "2",
    type: "alert",
    content: "You spent ₹5,000 on shopping—30% above your monthly budget."
  },
  {
    id: "3",
    type: "insight",
    content: "Consider reducing dining-out expenses this week to meet your saving goals."
  },
  {
    id: "4",
    type: "trend",
    content: "NIFTY 50 gained 1.2% today. A good time to review your investment portfolio."
  }
];

const availableUsers = [
  { id: "u1", name: "Rudrani", email: "rudrani@example.com" },
  { id: "u2", name: "Jordan", email: "jordan@example.com" },
  { id: "u3", name: "Taylor", email: "taylor@example.com" },
  { id: "u4", name: "Morgan", email: "morgan@example.com" },
  { id: "u5", name: "Riley", email: "riley@example.com" },
  { id: "u6", name: "Casey", email: "casey@example.com" }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [trendData, setTrendData] = useState(mockTrendData);
  const [categoryData, setCategoryData] = useState(mockCategoryData);
  const [financialAdvice, setFinancialAdvice] = useState(mockFinancialAdvice);
  const [reportType, setReportType] = useState("weekly");
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);

  useEffect(() => {
    const checkBudgetAlerts = () => {
      const overBudgetCategories = budgets.filter(budget => budget.spent > budget.amount);
      if (overBudgetCategories.length > 0) {
        setShowBudgetAlert(true);
        const category = overBudgetCategories[0];
        const overspent = category.spent - category.amount;
        toast.warning(
          `Budget Alert: Overspent ${formatINR(overspent)} on ${category.category}!`,
          { duration: 5000 }
        );
      }
    };
    
    checkBudgetAlerts();
  }, [budgets]);

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
    
    const categoryIndex = categoryData.findIndex(
      (cat) => cat.name.toLowerCase() === expense.category
    );
    
    if (categoryIndex >= 0) {
      const newCategoryData = [...categoryData];
      newCategoryData[categoryIndex].value += expense.amount;
      setCategoryData(newCategoryData);
    }

    toast.success("New expense added successfully!");
  };
  
  const handleAddBudget = (budget: {
    category: string;
    amount: number;
    period: "weekly" | "monthly" | "yearly";
  }) => {
    const newBudget: Budget = {
      id: uuidv4(),
      ...budget,
      spent: 0,
    };
    
    setBudgets([...budgets, newBudget]);
    toast.success("New budget created successfully!");
  };
  
  const handleCreateGroup = (group: {
    name: string;
    description: string;
    category: string;
    totalAmount: number;
    date: Date;
    members: { id: string; name: string; email: string }[];
  }) => {
    const groupMembers = group.members.map((member) => ({
      id: member.id || uuidv4(),
      name: member.name,
      paid: false,
    }));
    
    const newGroup: Group = {
      id: uuidv4(),
      name: group.name,
      description: group.description,
      category: group.category,
      totalAmount: group.totalAmount,
      date: group.date.toISOString().split("T")[0],
      members: groupMembers,
      status: "pending",
    };
    
    setGroups([newGroup, ...groups]);
    toast.success("New group expense created successfully!");
  };

  const handleReportDownload = () => {
    toast.success(`${reportType === 'weekly' ? 'Weekly' : 'Monthly'} report downloaded successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Rudrani"}</h1>
                <p className="text-muted-foreground">Here's an overview of your finances</p>
              </div>
              <div className="flex space-x-4">
                <AddExpenseModal onAddExpense={handleAddExpense} />
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Balance"
              value={convertToINR(5840)}
              icon={<Wallet className="h-5 w-5" />}
              change={{ value: 12, type: "increase" }}
              currency="₹"
            />
            <StatsCard
              title="Monthly Spending"
              value={convertToINR(1620)}
              icon={<ArrowUpRight className="h-5 w-5" />}
              change={{ value: 8, type: "increase" }}
              currency="₹"
            />
            <StatsCard
              title="Income"
              value={convertToINR(3200)}
              icon={<TrendingUp className="h-5 w-5" />}
              change={{ value: 0, type: "neutral" }}
              currency="₹"
            />
            <StatsCard
              title="Savings"
              value={convertToINR(1580)}
              icon={<TrendingDown className="h-5 w-5" />}
              change={{ value: 4, type: "decrease" }}
              currency="₹"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SpendingTrendChart data={trendData} />
            <CategoriesPieChart data={categoryData} />
          </div>
          
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Budget Performance Report</h2>
              <div className="flex items-center space-x-3">
                <Select
                  value={reportType}
                  onValueChange={setReportType}
                >
                  <SelectTrigger className="w-32 h-9">
                    <SelectValue placeholder="Select Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" onClick={handleReportDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleReportDownload}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {budgets.map((budget) => (
                <div 
                  key={budget.id} 
                  className={`p-4 rounded-lg ${budget.spent > budget.amount ? 'bg-red-50 border border-red-200' : 'bg-gray-50 border border-gray-200'}`}
                >
                  <p className="text-sm text-gray-500 mb-1">{budget.category}</p>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xl font-semibold">{formatINR(budget.spent)}</p>
                    <p className={`text-sm ${budget.spent > budget.amount ? 'text-red-500' : 'text-green-500'}`}>
                      {budget.spent > budget.amount ? `+${formatINR(budget.spent - budget.amount)}` : `${formatINR(budget.amount - budget.spent)} left`}
                    </p>
                  </div>
                  <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${budget.spent > budget.amount ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{width: `${Math.min(100, (budget.spent / budget.amount) * 100)}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs defaultValue="expenses">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
                  <TabsTrigger value="budgets">Budgets</TabsTrigger>
                  <TabsTrigger value="groups">Group Expenses</TabsTrigger>
                  <TabsTrigger value="advisor">Financial Advisor</TabsTrigger>
                </TabsList>
                
                <div className="hidden md:block">
                  <TabsContent value="expenses" className="mt-0">
                    <Link to="/expenses">
                      <Button variant="ghost" size="sm">
                        View All
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </TabsContent>
                  <TabsContent value="budgets" className="mt-0">
                    <AddBudgetModal onAddBudget={handleAddBudget} />
                  </TabsContent>
                  <TabsContent value="groups" className="mt-0">
                    <CreateGroupModal 
                      onCreateGroup={handleCreateGroup} 
                      availableUsers={availableUsers}
                    />
                  </TabsContent>
                  <TabsContent value="advisor" className="mt-0">
                    <Button variant="ghost" size="sm">
                      View Full Analysis
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </TabsContent>
                </div>
              </div>
              
              <TabsContent value="expenses">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expenses.slice(0, 3).map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} currency="₹" />
                  ))}
                  <Link to="/expenses" className="flex md:hidden">
                    <Button variant="outline" className="w-full justify-center">
                      View All Expenses
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="budgets">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {budgets.map((budget) => (
                    <BudgetCard key={budget.id} budget={budget} currency="₹" />
                  ))}
                  <div className="flex md:hidden mt-4">
                    <AddBudgetModal onAddBudget={handleAddBudget} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="groups">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groups.map((group) => (
                    <GroupCard key={group.id} group={group} currency="₹" />
                  ))}
                  <div className="flex md:hidden mt-4">
                    <CreateGroupModal 
                      onCreateGroup={handleCreateGroup} 
                      availableUsers={availableUsers}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advisor">
                <FinancialAdvisor advice={financialAdvice} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <TransactionList expenses={expenses} currency="₹" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
