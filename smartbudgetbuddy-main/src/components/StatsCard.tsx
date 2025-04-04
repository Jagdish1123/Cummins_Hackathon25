
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  valuePrefix?: string;
  className?: string;
}

const StatsCard = ({ 
  title, 
  value,
  icon,
  change,
  valuePrefix = "",
  className 
}: StatsCardProps) => {
  const formattedValue = typeof value === 'number'
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    : value;

  return (
    <div className={cn(
      "p-4 rounded-xl border bg-white shadow-subtle animate-fade-in flex",
      className
    )}>
      <div className="flex-1 mr-4">
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">
            {valuePrefix}{formattedValue}
          </span>
        </div>
        
        {change && (
          <div className="flex items-center mt-2">
            {change.type === "increase" ? (
              <ChevronUp className="w-4 h-4 text-green-500 mr-1" />
            ) : change.type === "decrease" ? (
              <ChevronDown className="w-4 h-4 text-red-500 mr-1" />
            ) : (
              <Minus className="w-4 h-4 text-gray-500 mr-1" />
            )}
            <span 
              className={cn(
                "text-sm font-medium",
                change.type === "increase" ? "text-green-500" : 
                change.type === "decrease" ? "text-red-500" : 
                "text-gray-500"
              )}
            >
              {Math.abs(change.value)}% from last period
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
