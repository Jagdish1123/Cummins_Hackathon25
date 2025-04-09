import { formatIndianCurrency } from '@/utils/currency';

interface AnalyticsCardProps {
  revenue: number;
  profit: number;
}

export function AnalyticsCard({ revenue, profit }: AnalyticsCardProps) {
  const formattedRevenue = formatIndianCurrency(revenue);
  const formattedProfit = formatIndianCurrency(profit);
  // ... rest of the component
} 