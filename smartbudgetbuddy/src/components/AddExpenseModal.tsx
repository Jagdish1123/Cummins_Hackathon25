
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { ExpenseCategory } from "./ExpenseCard";

interface AddExpenseModalProps {
  onAddExpense?: (expense: {
    amount: number;
    category: ExpenseCategory;
    date: Date;
    description: string;
    isRecurring: boolean;
    paymentMethod: string;
  }) => void;
}

const categoryOptions: { value: ExpenseCategory; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "shopping", label: "Shopping" },
  { value: "entertainment", label: "Entertainment" },
  { value: "bills", label: "Bills" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Bank Transfer",
  "PayPal",
  "Mobile Payment",
];

const AddExpenseModal = ({ onAddExpense }: AddExpenseModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [date, setDate] = useState<Date>(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    onAddExpense?.({
      amount: parseFloat(amount),
      category,
      date,
      description,
      isRecurring,
      paymentMethod,
    });
    
    toast.success("Expense added successfully");
    resetForm();
    setIsOpen(false);
  };
  
  const resetForm = () => {
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date());
    setIsRecurring(false);
    setPaymentMethod("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="w-4 h-4" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as ExpenseCategory)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isRecurring"
              checked={isRecurring}
              onCheckedChange={(checked) => 
                setIsRecurring(checked as boolean)
              }
            />
            <Label htmlFor="isRecurring" className="cursor-pointer">
              This is a recurring expense
            </Label>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
