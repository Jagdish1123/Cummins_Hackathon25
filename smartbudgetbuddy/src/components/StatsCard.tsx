
import { FC, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  currency?: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, change, currency = "₹" }) => {
  // Format currency with Indian numbering system if INR
  const formatValue = (value: number): string => {
    if (currency === "₹") {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(value);
    }
    return `${currency}${value.toLocaleString()}`;
  };
  
  return (
    <Card>
      <CardContent className="py-6">
        <div className="flex items-center justify-between">
          <div className="bg-primary/10 p-2 rounded-md">{icon}</div>
          {change && (
            <div className={`flex items-center space-x-1 text-xs ${
              change.type === "increase" ? "text-green-500" :
              change.type === "decrease" ? "text-red-500" : "text-gray-500"
            }`}>
              {change.type === "increase" ? (
                <TrendingUp className="h-3 w-3" />
              ) : change.type === "decrease" ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              <span>{change.value}%</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{formatValue(value)}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
