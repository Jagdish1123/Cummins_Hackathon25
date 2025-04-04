
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface CreateGroupModalProps {
  onCreateGroup?: (group: {
    name: string;
    description: string;
    category: string;
    totalAmount: number;
    date: Date;
    members: { name: string; email: string }[];
  }) => void;
}

const groupCategories = [
  "Trip",
  "Dinner",
  "Event",
  "Roommates",
  "Projects",
  "Other",
];

const CreateGroupModal = ({ onCreateGroup }: CreateGroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  
  const [members, setMembers] = useState<{ name: string; email: string }[]>([
    { name: "", email: "" }
  ]);
  
  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };
  
  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };
  
  const updateMember = (index: number, field: "name" | "email", value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !totalAmount || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isNaN(parseFloat(totalAmount)) || parseFloat(totalAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Validate that all members have at least a name
    const validMembers = members.filter(m => m.name.trim());
    if (validMembers.length === 0) {
      toast.error("Please add at least one group member");
      return;
    }
    
    onCreateGroup?.({
      name,
      description,
      category,
      totalAmount: parseFloat(totalAmount),
      date,
      members: validMembers,
    });
    
    toast.success("Group created successfully");
    resetForm();
    setIsOpen(false);
  };
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setTotalAmount("");
    setDate(new Date());
    setMembers([{ name: "", email: "" }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Expense Group</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Weekend Trip, Dinner Night"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the group expense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {groupCategories.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-8"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
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
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Group Members *</Label>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addMember}
              >
                <Plus className="w-3 h-3 mr-1" /> Add Member
              </Button>
            </div>
            
            {members.map((member, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Email (optional)"
                  value={member.email}
                  onChange={(e) => updateMember(index, "email", e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMember(index)}
                  disabled={members.length === 1}
                  className="h-8 w-8 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Group</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
