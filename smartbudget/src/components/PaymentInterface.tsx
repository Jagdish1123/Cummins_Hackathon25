import { useState, lazy, Suspense } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { QrCode, Send, Loader2 } from "lucide-react";

interface PaymentInfo {
  upiId: string;
  mobileNumber: string;
  amount: string;
  description: string;
}

interface PaymentInterfaceProps {
  onPaymentComplete?: (amount: number) => void;
  defaultAmount?: number;
  recipientName?: string;
}

// Lazy load the QR code component
const QRCodeSVG = lazy(() =>
  import("qrcode.react").then((module) => ({
    default: module.QRCodeSVG,
  }))
);

export function PaymentInterface({
  onPaymentComplete,
  defaultAmount = 0,
  recipientName = "",
}: PaymentInterfaceProps) {
  const [paymentInfo, setPaymentInfo] = useState({
    upiId: "",
    mobileNumber: "",
    amount: defaultAmount.toString(),
    description: recipientName ? `Payment to ${recipientName}` : "",
  });
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.success("Payment processed successfully!");
      onPaymentComplete?.(parseFloat(paymentInfo.amount));

      // Reset form
      setPaymentInfo((prev) => ({
        ...prev,
        upiId: "",
        mobileNumber: "",
        amount: defaultAmount.toString(),
      }));
      setShowQR(false);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  const qrValue = paymentInfo.upiId
    ? `upi://pay?pa=${paymentInfo.upiId}&am=${
        paymentInfo.amount
      }&pn=${encodeURIComponent(recipientName || "")}`
    : `upi://pay?pn=${paymentInfo.mobileNumber}&am=${paymentInfo.amount}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make Payment</CardTitle>
        <CardDescription>Pay using UPI ID or mobile number</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              name="upiId"
              value={paymentInfo.upiId}
              onChange={handleInputChange}
              placeholder="username@bank"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              value={paymentInfo.mobileNumber}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={paymentInfo.amount}
              onChange={handleInputChange}
              min="1"
              step="0.01"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowQR(!showQR)}
              disabled={
                !paymentInfo.amount ||
                (!paymentInfo.upiId && !paymentInfo.mobileNumber)
              }
            >
              <QrCode className="mr-2 h-4 w-4" />
              {showQR ? "Hide QR" : "Show QR"}
            </Button>

            <Button
              type="submit"
              disabled={
                loading ||
                !paymentInfo.amount ||
                (!paymentInfo.upiId && !paymentInfo.mobileNumber)
              }
              className="flex-1"
            >
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>

          {showQR &&
            (paymentInfo.upiId || paymentInfo.mobileNumber) &&
            paymentInfo.amount && (
              <div className="flex justify-center py-4">
                <Suspense fallback={<div>Loading QR Code...</div>}>
                  <QRCodeSVG value={qrValue} size={200} />
                </Suspense>
              </div>
            )}
        </form>
      </CardContent>
    </Card>
  );
}
