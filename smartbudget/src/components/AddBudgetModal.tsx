
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
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface AddBudgetModalProps {
  onAddBudget?: (budget: {
    category: string;
    amount: number;
    period: "weekly" | "monthly" | "yearly";
  }) => void;
}

const categoryOptions = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health & Fitness",
  "Education",
  "Travel",
  "Personal Care",
  "Gifts & Donations",
  "Investments",
  "Miscellaneous",
];

const AddBudgetModal = ({ onAddBudget }: AddBudgetModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    onAddBudget?.({
      category,
      amount: parseFloat(amount),
      period,
    });
    
    toast.success("Budget added successfully");
    resetForm();
    setIsOpen(false);
  };
  
  const resetForm = () => {
    setCategory("");
    setAmount("");
    setPeriod("monthly");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="w-4 h-4" />
          Add Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount *</Label>
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
              <Label htmlFor="period">Time Period *</Label>
              <Select 
                value={period} 
                onValueChange={(val) => setPeriod(val as "weekly" | "monthly" | "yearly")}
              >
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Budget</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetModal;
