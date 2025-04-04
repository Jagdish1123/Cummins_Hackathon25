
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useNotifications } from "@/contexts/NotificationContext";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  recipient: string;
  groupName?: string;
}

export function PaymentDialog({
  isOpen,
  onClose,
  amount,
  recipient,
  groupName,
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const handlePayment = () => {
    setIsProcessing(true);
    setIsError(false);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // 90% chance of success
      if (Math.random() < 0.9) {
        setIsSuccess(true);
        
        // Add notification
        addNotification({
          title: "Payment Successful",
          message: `You've successfully paid ${recipient} $${amount.toFixed(2)}${groupName ? ` for "${groupName}"` : ''}.`,
          type: "success",
        });
        
        // Reset after showing success
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        setIsError(true);
        toast.error("Payment failed. Please try again or use a different payment method.");
      }
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && !isSuccess && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
          <DialogDescription>
            {groupName 
              ? `Pay ${recipient} for "${groupName}"`
              : `Send money to ${recipient}`}
          </DialogDescription>
        </DialogHeader>
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-center">Processing your payment...</p>
            <p className="text-sm text-muted-foreground text-center mt-2">Please don't close this window.</p>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-center font-medium">Payment Successful!</p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              You've successfully paid {recipient} ${amount.toFixed(2)}.
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-6">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-center font-medium">Payment Failed</p>
            <p className="text-sm text-muted-foreground text-center mt-2 mb-6">
              There was an issue processing your payment. Please try again.
            </p>
            <Button onClick={() => setIsError(false)} variant="outline">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="p-4 border rounded-md bg-muted/50 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-xl font-bold">${amount.toFixed(2)}</span>
              </div>
              {groupName && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-muted-foreground">Group</span>
                  <span>{groupName}</span>
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted-foreground">To</span>
                <span>{recipient}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted-foreground">From</span>
                <span>{user?.name || "You"}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-2 gap-4 mt-2"
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-2 h-6 w-6" />
                      Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="bank"
                      id="bank"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="bank"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <DollarSign className="mb-2 h-6 w-6" />
                      Bank
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {paymentMethod === "card" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" defaultValue="12/25" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" defaultValue="123" />
                    </div>
                  </div>
                </>
              )}
              
              {paymentMethod === "bank" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Name</Label>
                    <Input
                      id="account-name"
                      placeholder="John Doe"
                      defaultValue={user?.name || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      placeholder="000123456789"
                      defaultValue="000123456789"
                    />
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handlePayment}>
                Pay ${amount.toFixed(2)}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PaymentIntegrationProps {
  paymentType?: "personal" | "group";
}

export function PaymentIntegration({ paymentType = "personal" }: PaymentIntegrationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [paymentMethodsVisible, setPaymentMethodsVisible] = useState(false);

  const handleOpenPaymentDialog = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!recipient) {
      toast.error("Please enter a recipient name");
      return;
    }
    
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Payment</CardTitle>
          <CardDescription>
            {paymentType === "personal" 
              ? "Send money to friends or family" 
              : "Pay your share in group expenses"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="amount"
                className="pl-9"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  // Only allow numbers and a single decimal point
                  const value = e.target.value;
                  if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                    setAmount(value);
                  }
                }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipient">To</Label>
            <Input
              id="recipient"
              placeholder="Enter name or email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => setPaymentMethodsVisible(!paymentMethodsVisible)}
          >
            {paymentMethodsVisible ? "Hide Payment Methods" : "View Available Payment Methods"}
          </Button>
          
          {paymentMethodsVisible && (
            <div className="mt-2 p-4 border rounded-md">
              <h4 className="text-sm font-medium mb-2">Available Payment Methods:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                  Credit/Debit Cards
                </li>
                <li className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                  Bank Transfer
                </li>
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleOpenPaymentDialog}>
            Send Payment
          </Button>
        </CardFooter>
      </Card>
      
      <PaymentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        amount={parseFloat(amount) || 0}
        recipient={recipient}
      />
    </>
  );
}
