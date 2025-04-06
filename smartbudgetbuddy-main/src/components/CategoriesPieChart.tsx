
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoriesPieChartProps {
  data: CategoryData[];
  className?: string;
  title?: string;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const customTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md">
        <p className="font-medium">{data.name}</p>
        <p className="font-semibold">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(data.value)}
        </p>
      </div>
    );
  }
  return null;
};

const CategoriesPieChart = ({ data, className, title = "Spending by Category" }: CategoriesPieChartProps) => {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<CategoryData[]>([]);

  useEffect(() => {
    setIsClient(true);
    
    // Animate the data loading
    const timer = setTimeout(() => {
      setChartData(data);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [data]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total);

  return (
    <div 
      className={cn(
        "rounded-xl border bg-white p-4 animate-fade-in",
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p className="text-2xl font-bold mb-6">{formattedTotal}</p>
      
      <div className="h-[300px] chart-appear">
        {isClient && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
              <Legend 
                formatter={(value) => <span className="text-sm">{value}</span>}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CategoriesPieChart;
