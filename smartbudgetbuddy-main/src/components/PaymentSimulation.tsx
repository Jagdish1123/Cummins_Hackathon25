
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { 
  CreditCard, 
  Smartphone, 
  Landmark, 
  Wallet, 
  ArrowRight, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const PaymentSimulation = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Payment Simulation",
      description: "Simulate payments to individuals or groups",
      amount: "Amount (₹)",
      paymentMethod: "Payment Method",
      creditCard: "Credit Card",
      debitCard: "Debit Card",
      upi: "UPI",
      bankTransfer: "Bank Transfer",
      wallet: "Wallet",
      recipient: "Recipient",
      recipientPlaceholder: "Enter name or group",
      makePayment: "Make Payment",
      processing: "Processing...",
      paymentSuccess: "Payment Successful!",
      transactionID: "Transaction ID",
      newPayment: "New Payment",
      amountValidation: "Please enter a valid amount",
      methodValidation: "Please select a payment method",
      recipientValidation: "Please enter a recipient",
    },
    mr: {
      title: "पेमेंट सिम्युलेशन",
      description: "व्यक्ती किंवा गटांना पेमेंट सिम्युलेट करा",
      amount: "रक्कम (₹)",
      paymentMethod: "पेमेंट पद्धत",
      creditCard: "क्रेडिट कार्ड",
      debitCard: "डेबिट कार्ड",
      upi: "यूपीआय",
      bankTransfer: "बँक ट्रान्सफर",
      wallet: "वॉलेट",
      recipient: "प्राप्तकर्ता",
      recipientPlaceholder: "नाव किंवा गट प्रविष्ट करा",
      makePayment: "पेमेंट करा",
      processing: "प्रक्रिया करत आहे...",
      paymentSuccess: "पेमेंट यशस्वी!",
      transactionID: "व्यवहार आयडी",
      newPayment: "नवीन पेमेंट",
      amountValidation: "कृपया वैध रक्कम प्रविष्ट करा",
      methodValidation: "कृपया पेमेंट पद्धती निवडा",
      recipientValidation: "कृपया प्राप्तकर्ता प्रविष्ट करा",
    }
  };

  const t = translations[language];

  const handlePayment = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error(t.amountValidation);
      return;
    }
    
    if (!paymentMethod) {
      toast.error(t.methodValidation);
      return;
    }
    
    if (!recipient) {
      toast.error(t.recipientValidation);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      toast.success(language === 'en' ? `₹${amount} paid successfully to ${recipient}` : `₹${amount} यशस्वीरित्या ${recipient} ला दिले`);
    }, 2000);
  };

  const resetForm = () => {
    setAmount('');
    setPaymentMethod('');
    setRecipient('');
    setIsCompleted(false);
  };

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'credit_card':
      case 'debit_card':
        return <CreditCard className="h-5 w-5" />;
      case 'upi':
        return <Smartphone className="h-5 w-5" />;
      case 'bank_transfer':
        return <Landmark className="h-5 w-5" />;
      case 'wallet':
        return <Wallet className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">{t.amount}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">{t.paymentMethod}</Label>
              <Select
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                disabled={isProcessing}
              >
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder={language === 'en' ? "Select payment method" : "पेमेंट पद्धती निवडा"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      {t.creditCard}
                    </div>
                  </SelectItem>
                  <SelectItem value="debit_card">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      {t.debitCard}
                    </div>
                  </SelectItem>
                  <SelectItem value="upi">
                    <div className="flex items-center">
                      <Smartphone className="mr-2 h-4 w-4" />
                      {t.upi}
                    </div>
                  </SelectItem>
                  <SelectItem value="bank_transfer">
                    <div className="flex items-center">
                      <Landmark className="mr-2 h-4 w-4" />
                      {t.bankTransfer}
                    </div>
                  </SelectItem>
                  <SelectItem value="wallet">
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      {t.wallet}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">{t.recipient}</Label>
              <Input
                id="recipient"
                placeholder={t.recipientPlaceholder}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isProcessing}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t.paymentSuccess}</h3>
            <p className="text-muted-foreground mb-4">
              ₹{amount} {language === 'en' ? 'paid to' : 'यांना दिले'} {recipient}
            </p>
            
            <div className="bg-muted/30 rounded-lg p-4 w-full mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{t.amount}</span>
                <span>₹{amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{t.paymentMethod}</span>
                <div className="flex items-center">
                  {getPaymentIcon()}
                  <span className="ml-1">
                    {paymentMethod === 'credit_card' ? t.creditCard :
                     paymentMethod === 'debit_card' ? t.debitCard :
                     paymentMethod === 'upi' ? t.upi :
                     paymentMethod === 'bank_transfer' ? t.bankTransfer :
                     t.wallet}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">{t.recipient}</span>
                <span>{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.transactionID}</span>
                <span className="font-mono">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isCompleted ? (
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.processing}
              </>
            ) : (
              <>
                {t.makePayment}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button onClick={resetForm}>
            {t.newPayment}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PaymentSimulation;
