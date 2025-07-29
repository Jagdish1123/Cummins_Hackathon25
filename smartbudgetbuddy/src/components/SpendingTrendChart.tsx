
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataPoint {
  date: string;
  amount: number;
  budget?: number;
}

interface SpendingTrendChartProps {
  data: DataPoint[];
  className?: string;
  title?: string;
  showBudget?: boolean;
  timeRange?: "week" | "month" | "year";
  onTimeRangeChange?: (range: "week" | "month" | "year") => void;
}

const customTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border shadow-md rounded-md">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-primary font-semibold">
          Spent: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(payload[0].value)}
        </p>
        {payload.length > 1 && payload[1].value && (
          <p className="text-gray-500 font-semibold">
            Budget: {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(payload[1].value)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const SpendingTrendChart = ({
  data,
  className,
  title = "Spending Trend",
  showBudget = true,
  timeRange = "month",
  onTimeRangeChange,
}: SpendingTrendChartProps) => {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [localTimeRange, setLocalTimeRange] = useState(timeRange);

  useEffect(() => {
    setIsClient(true);
    
    // Animate the data loading
    const timer = setTimeout(() => {
      setChartData(data);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [data]);

  const handleTimeRangeChange = (value: string) => {
    const newRange = value as "week" | "month" | "year";
    setLocalTimeRange(newRange);
    if (onTimeRangeChange) {
      onTimeRangeChange(newRange);
    }
  };

  const formatYAxis = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-4 animate-fade-in",
        className
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <Select
          value={localTimeRange}
          onValueChange={handleTimeRangeChange}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Weekly</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[300px] mt-4 chart-appear">
        {isClient && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={formatYAxis} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dx={-10}
              />
              <Tooltip content={customTooltip} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorSpending)"
                animationDuration={1500}
              />
              {showBudget && (
                <Area
                  type="monotone"
                  dataKey="budget"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorBudget)"
                  animationDuration={1500}
                  animationBegin={300}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SpendingTrendChart;
