
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Check, FileText, Image, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface BillUploaderProps {
  onBillProcessed?: (expenseData: any) => void;
}

export const BillUploader = ({ onBillProcessed }: BillUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Upload Receipt",
      description: "Upload a receipt to automatically add expenses",
      dragText: "Drag and drop your receipt here",
      orText: "or",
      browseText: "Browse files",
      processingText: "Processing your receipt...",
      uploadAgainText: "Upload another",
      processText: "Process Receipt",
      supportedText: "Supports JPG, PNG and PDF up to 5MB",
    },
    mr: {
      title: "पावती अपलोड करा",
      description: "स्वयंचलितपणे खर्च जोडण्यासाठी पावती अपलोड करा",
      dragText: "आपली पावती येथे ड्रॅग आणि ड्रॉप करा",
      orText: "किंवा",
      browseText: "फाइल्स ब्राउझ करा",
      processingText: "आपली पावती प्रक्रिया करत आहे...",
      uploadAgainText: "आणखी एक अपलोड करा",
      processText: "पावती प्रक्रिया करा",
      supportedText: "5MB पर्यंत JPG, PNG आणि PDF समर्थित",
    }
  };

  const t = translations[language];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(language === 'en' ? "File size exceeds 5MB limit" : "फाइल आकार 5MB मर्यादेपेक्षा जास्त आहे");
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error(language === 'en' ? "Invalid file type. Please upload JPG, PNG or PDF" : "अवैध फाइल प्रकार. कृपया JPG, PNG किंवा PDF अपलोड करा");
      return;
    }

    setFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, just show an icon
      setPreview(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const processReceipt = () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock extracted data
      const extractedData = {
        amount: Math.floor(Math.random() * 2000) + 100, // Random amount between 100-2100
        category: "food",
        description: language === 'en' ? "Restaurant Bill" : "रेस्टॉरंट बिल",
        date: new Date(),
        isRecurring: false,
        paymentMethod: "Credit Card"
      };
      
      setIsProcessing(false);
      
      // Call the callback with the extracted data
      if (onBillProcessed) {
        onBillProcessed(extractedData);
      }
      
      toast.success(language === 'en' ? "Receipt processed successfully!" : "पावती यशस्वीरित्या प्रक्रिया केली!");
      clearFile();
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mx-auto flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">{t.dragText}</p>
                <p className="text-xs text-muted-foreground">{t.orText}</p>
                <label htmlFor="bill-upload" className="cursor-pointer">
                  <span className="rounded bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {t.browseText}
                  </span>
                  <input
                    id="bill-upload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">{t.supportedText}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {preview ? (
                    <div className="relative h-16 w-16 overflow-hidden rounded border">
                      <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded border bg-muted">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearFile} disabled={isProcessing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={processReceipt} disabled={isProcessing} className="flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.processingText}
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {t.processText}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillUploader;
