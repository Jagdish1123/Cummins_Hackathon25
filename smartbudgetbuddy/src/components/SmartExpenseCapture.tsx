
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/contexts/NotificationContext";
import { Loader2, Upload, Mic, CameraIcon, X, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock AI categorization functionality
const categorizeExpense = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes("grocery") || desc.includes("restaurant") || desc.includes("cafe") || desc.includes("food")) {
    return "food";
  }
  if (desc.includes("uber") || desc.includes("taxi") || desc.includes("gas") || desc.includes("fuel") || desc.includes("bus")) {
    return "transport";
  }
  if (desc.includes("movie") || desc.includes("netflix") || desc.includes("spotify") || desc.includes("concert")) {
    return "entertainment";
  }
  if (desc.includes("rent") || desc.includes("electricity") || desc.includes("water") || desc.includes("internet")) {
    return "bills";
  }
  if (desc.includes("medicine") || desc.includes("doctor") || desc.includes("hospital")) {
    return "health";
  }
  if (desc.includes("book") || desc.includes("course") || desc.includes("tuition")) {
    return "education";
  }
  if (desc.includes("clothes") || desc.includes("shoes") || desc.includes("mall")) {
    return "shopping";
  }
  return "other";
};

export function SmartExpenseCapture({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const { addNotification } = useNotifications();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isAutoCategory, setIsAutoCategory] = useState(true);
  const [autoCategory, setAutoCategory] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  // Simulate voice recording for expense input
  const handleVoiceCapture = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Voice recording processed!");
      setDescription("Dinner at Italian restaurant with colleagues");
      setAmount("85.50");
      const category = categorizeExpense("Dinner at Italian restaurant with colleagues");
      setAutoCategory(category);
      
      addNotification({
        title: "Voice Input Processed",
        message: "Your expense has been captured from voice input",
        type: "success",
      });
      return;
    }
    
    setIsRecording(true);
    toast("Recording... Describe your expense");
    
    // Simulate voice recording completion after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      toast.success("Voice recording processed!");
      setDescription("Dinner at Italian restaurant with colleagues");
      setAmount("85.50");
      const category = categorizeExpense("Dinner at Italian restaurant with colleagues");
      setAutoCategory(category);
      
      addNotification({
        title: "Voice Input Processed",
        message: "Your expense has been captured from voice input",
        type: "success",
      });
    }, 3000);
  };

  // Simulate image upload for expense capture
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file reading and processing
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
        setShowReceipt(true);
        
        // Simulate AI processing of receipt
        setTimeout(() => {
          setIsUploading(false);
          setDescription("Grocery shopping at Whole Foods");
          setAmount("65.99");
          const category = categorizeExpense("Grocery shopping at Whole Foods");
          setAutoCategory(category);
          
          addNotification({
            title: "Receipt Processed",
            message: "Your receipt has been automatically processed",
            type: "success",
          });
        }, 2000);
      }
    };
    
    reader.readAsDataURL(file);
  };

  // Simulate camera capture for expense
  const handleCameraCapture = () => {
    setIsCameraActive(!isCameraActive);
    
    if (!isCameraActive) {
      // Simulate camera activation
      toast("Camera activated. Take a picture of your receipt.");
    } else {
      // Simulate photo taken
      setIsCameraActive(false);
      setIsUploading(true);
      
      // Use a placeholder image
      setPreviewImage("https://placehold.co/300x400/e6e6e6/666666?text=Receipt+Image");
      setShowReceipt(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsUploading(false);
        setDescription("Coffee shop meeting");
        setAmount("12.50");
        const category = categorizeExpense("Coffee shop meeting");
        setAutoCategory(category);
        
        addNotification({
          title: "Receipt Captured",
          message: "Your receipt has been captured and processed",
          type: "success",
        });
      }, 2000);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (isAutoCategory && e.target.value) {
      const category = categorizeExpense(e.target.value);
      setAutoCategory(category);
    }
  };

  const handleSubmitExpense = () => {
    if (!description || !amount) {
      toast.error("Please provide both description and amount");
      return;
    }
    
    const data = {
      description,
      amount: parseFloat(amount),
      category: autoCategory || "other",
      date: new Date(),
      isRecurring: false,
      paymentMethod: "Credit Card", // Default
      receiptImage: previewImage
    };
    
    if (onSubmit) {
      onSubmit(data);
    }
    
    // Reset the form
    setDescription("");
    setAmount("");
    setAutoCategory("");
    setPreviewImage(null);
    setShowReceipt(false);
    
    toast.success("Expense added successfully!");
  };

  const removeImage = () => {
    setPreviewImage(null);
    setShowReceipt(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Expense Capture</CardTitle>
        <CardDescription>
          Quickly add expenses with AI categorization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={handleVoiceCapture}
            >
              {isRecording ? (
                <>
                  <span className="animate-pulse h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                  <span>Recording...</span>
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  <span>Voice</span>
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 relative"
              onClick={() => document.getElementById('receipt-upload')?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </>
              )}
              <input 
                type="file" 
                id="receipt-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className={`flex items-center gap-1 ${isCameraActive ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={handleCameraCapture}
              disabled={isUploading}
            >
              <CameraIcon className="h-4 w-4" />
              <span>{isCameraActive ? "Capture" : "Camera"}</span>
            </Button>
          </div>
          
          {showReceipt && previewImage && (
            <div className="relative">
              <div className="border rounded-md overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Receipt" 
                  className="w-full max-h-40 object-contain" 
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                      <span className="text-sm">Processing receipt...</span>
                    </div>
                  </div>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter expense description..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
              <Input
                id="amount"
                className="pl-7"
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
          
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-category"
              checked={isAutoCategory}
              onCheckedChange={setIsAutoCategory}
            />
            <Label htmlFor="auto-category">Auto-categorize expense</Label>
          </div>
          
          {isAutoCategory && autoCategory && description && (
            <div className="flex items-start p-3 rounded-md bg-muted">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">AI Categorization</p>
                <p className="text-sm text-muted-foreground">
                  This expense has been categorized as{" "}
                  <span className="font-medium capitalize">{autoCategory}</span>
                </p>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full" 
            onClick={handleSubmitExpense}
            disabled={isUploading || isRecording || !description || !amount}
          >
            Add Expense
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
