import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, UserPlus, Plus, X, Users } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const mockAvailableUsers: User[] = [
  { id: "u1", name: "Priya Sharma", email: "priya@example.com", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "u2", name: "Rahul Patel", email: "rahul@example.com", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: "u3", name: "Ananya Singh", email: "ananya@example.com", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "u4", name: "Vikram Mehta", email: "vikram@example.com", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "u5", name: "Neha Kapoor", email: "neha@example.com", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "u6", name: "Arjun Kumar", email: "arjun@example.com", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "u7", name: "Divya Gupta", email: "divya@example.com", avatar: "https://i.pravatar.cc/150?img=6" }
];

interface CreateGroupModalProps {
  onCreateGroup: (group: {
    name: string;
    description: string;
    category: string;
    totalAmount: number;
    date: Date;
    members: { id: string; name: string; email: string }[];
  }) => void;
  availableUsers?: User[];
}

const CreateGroupModal = ({ onCreateGroup, availableUsers = mockAvailableUsers }: CreateGroupModalProps) => {
  const [name, setName] = useState("Weekend Trip to Goa");
  const [description, setDescription] = useState("Hotel booking and activities");
  const [amount, setAmount] = useState("12000");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Trip");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([mockAvailableUsers[0], mockAvailableUsers[1]]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !amount || !date) {
      return;
    }
    
    onCreateGroup({
      name,
      description,
      category,
      totalAmount: parseFloat(amount),
      date: date as Date,
      members: selectedUsers
    });
    
    setName("Weekend Trip to Goa");
    setDescription("Hotel booking and activities");
    setAmount("12000");
    setDate(new Date());
    setCategory("Trip");
    setSelectedUsers([mockAvailableUsers[0], mockAvailableUsers[1]]);
    setOpen(false);
  };
  
  const toggleUserSelection = (user: User) => {
    if (selectedUsers.some(selected => selected.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(selected => selected.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  
  const suggestedExpenses = [
    { category: "Trip", description: "Weekend Trip to Goa", amount: "12000" },
    { category: "Dinner", description: "Dinner at Taj Restaurant", amount: "4500" },
    { category: "Shopping", description: "Group Shopping for Festival", amount: "8000" },
    { category: "Rent", description: "Monthly Apartment Rent", amount: "25000" },
    { category: "Utilities", description: "Monthly Bills Split", amount: "3000" }
  ];
  
  const selectExpenseTemplate = (categoryName: string) => {
    const template = suggestedExpenses.find(exp => exp.category === categoryName);
    if (template) {
      setCategory(template.category);
      setName(template.description);
      setAmount(template.amount);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Group Expense</DialogTitle>
          <DialogDescription>
            Create a new group expense and split it among members.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={category} 
                onValueChange={(value) => {
                  setCategory(value);
                  selectExpenseTemplate(value);
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trip">Trip</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹)
              </Label>
              <div className="relative col-span-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
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
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Group Members Selection */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Members
              </Label>
              <div className="col-span-3 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <div 
                      key={user.id}
                      className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 flex items-center gap-1 text-sm"
                    >
                      <span>{user.name}</span>
                      <button 
                        type="button" 
                        onClick={() => toggleUserSelection(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border rounded-md">
                  <div className="p-2 bg-muted flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Available Users</span>
                  </div>
                  <ScrollArea className="h-[150px]">
                    <div className="p-2">
                      {availableUsers.length > 0 ? (
                        availableUsers.map((user) => (
                          <div 
                            key={user.id} 
                            className="flex items-center space-x-2 py-2 px-1 hover:bg-muted/50 rounded cursor-pointer"
                            onClick={() => toggleUserSelection(user)}
                          >
                            <Checkbox 
                              checked={selectedUsers.some(selected => selected.id === user.id)} 
                              onCheckedChange={() => toggleUserSelection(user)} 
                              id={`user-${user.id}`}
                            />
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <Label 
                                  htmlFor={`user-${user.id}`}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {user.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4 text-sm">No available users</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={!name || !amount || !date || selectedUsers.length === 0}
            >
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
