
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, CreditCard } from "lucide-react";
import { GroupMember } from "./GroupCard";

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: GroupMember[];
  groupName: string;
  onSettlePayment?: (memberId: string, paymentMethod: string) => void;
}

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Cash",
  "PayPal",
  "Venmo",
  "Zelle",
];

const SettlementModal = ({ 
  isOpen, 
  onClose, 
  members,
  groupName,
  onSettlePayment 
}: SettlementModalProps) => {
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMember || !paymentMethod) {
      toast.error("Please select a member and payment method");
      return;
    }
    
    onSettlePayment?.(selectedMember, paymentMethod);
    toast.success("Payment marked as settled");
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setSelectedMember("");
    setPaymentMethod("");
  };

  const unpaidMembers = members.filter(member => !member.paid);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settle Payment for {groupName}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {unpaidMembers.length === 0 ? (
            <div className="text-center p-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">All Settled!</h3>
              <p className="text-muted-foreground">
                Everyone has paid their share for this group expense.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Member</label>
                <div className="space-y-2">
                  {unpaidMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMember === member.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedMember(member.id)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        {member.amount && (
                          <p className="text-sm text-muted-foreground">
                            Owes: {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR',
                            }).format(member.amount)}
                          </p>
                        )}
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center">
                        {selectedMember === member.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="paymentMethod" className="w-full">
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
              
              <div className="pt-2">
                <Input placeholder="Add a note (optional)" />
              </div>
            </>
          )}
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
            {unpaidMembers.length > 0 && (
              <Button type="submit" disabled={!selectedMember || !paymentMethod}>
                <CreditCard className="mr-2 h-4 w-4" />
                Mark as Paid
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SettlementModal;
